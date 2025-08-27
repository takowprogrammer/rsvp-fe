"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TemplateItem {
    id?: string;
    name?: string;
    imageUrl?: string;
    displayName?: string;
    templateName?: string;
    // Add common backend property names
    template_id?: string;
    template_name?: string;
    image_url?: string;
    file?: string;
}

// Helper function to get template properties safely
const getTemplateProperty = (template: any, property: string): string => {
    // Try multiple possible property names
    const possibleNames = [
        property,
        property.replace(/([A-Z])/g, '_$1').toLowerCase(), // camelCase to snake_case
        property.replace(/_([a-z])/g, (g) => g[1].toUpperCase()) // snake_case to camelCase
    ];

    for (const name of possibleNames) {
        if (template[name] !== undefined && template[name] !== null && template[name] !== '') {
            return template[name];
        }
    }

    return '';
};

// Get template ID safely - use file name as ID since backend doesn't provide one
const getTemplateId = (template: any): string => {
    return getTemplateProperty(template, 'file') ||
        getTemplateProperty(template, 'id') ||
        getTemplateProperty(template, 'template_id') ||
        '';
};

// Get template name safely - use templateName from backend
const getTemplateName = (template: any): string => {
    return getTemplateProperty(template, 'templateName') ||
        getTemplateProperty(template, 'name') ||
        getTemplateProperty(template, 'template_name') ||
        '';
};

// Get template image URL safely - use imageUrl from backend
const getTemplateImageUrl = (template: any): string => {
    // The backend returns template names like "dusty_blue_nude_blend" but the actual
    // image files are named like "wedding_invitation_dusty_blue_nude_blend.png"
    // So we need to map the backend names to the correct image file paths
    const templateName = getTemplateName(template);

    // Map backend template names to actual image files
    // This includes ALL available images, not just what the backend returns
    const templateImageMap: { [key: string]: string } = {
        // Backend template names mapped to actual files
        'dusty_blue_nude_blend': '/invitations/wedding_invitation_dusty_blue_nude_blend.png',
        'dusty_blue_serenity': '/invitations/wedding_invitation_dusty_blue_serenity.png',
        'elegant_floral_invitation': '/invitations/invitation-template-1.png',
        'modern_minimalist_invitation': '/invitations/invitation-template-2.png',
        'nude_warmth': '/invitations/invitation-template-3.png',
        'phoenix_sand_radiance': '/invitations/invitation-template-4.png',
        'pure_white_elegance': '/invitations/wedding_invitation_improved_1.png',
        'vintage_romantic_invitation': '/invitations/wedding_invitation_improved_3.png',

        // Additional images that exist but backend might not return
        'wedding_invitation_improved_4': '/invitations/wedding_invitation_improved_4.png',
        'wedding_invitation_template_1': '/invitations/wedding_invitation_template_1.png',
        'wedding_photo': '/invitations/wedding_photo.png',

        // Alternative names for the same images
        'improved_4': '/invitations/wedding_invitation_improved_4.png',
        'template_1': '/invitations/wedding_invitation_template_1.png',
        'photo': '/invitations/wedding_photo.png',
    };

    // If we have a mapping for this template name, use it
    if (templateName && templateImageMap[templateName]) {
        return templateImageMap[templateName];
    }

    // Fallback to the backend's imageUrl if no mapping exists
    const imageUrl = getTemplateProperty(template, 'imageUrl') || '';
    if (imageUrl) {
        return imageUrl;
    }

    // Last fallback: construct from file name
    const file = getTemplateProperty(template, 'file') || '';
    if (file) {
        return `/invitations/${file}`;
    }

    return '';
};

export default function NewInvitationPage() {
    const router = useRouter();
    const [templates, setTemplates] = useState<TemplateItem[]>([]);
    const [templateName, setTemplateName] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [buttonText, setButtonText] = useState("RSVP Now");
    const [formUrl, setFormUrl] = useState("/rsvp");
    const [imageUrl, setImageUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [templatesLoading, setTemplatesLoading] = useState(true);
    const [templatesError, setTemplatesError] = useState<string | null>(null);
    const [templateSearch, setTemplateSearch] = useState("");

    // Filter templates based on search
    const filteredTemplates = templates.filter(t =>
        t.displayName?.toLowerCase().includes(templateSearch.toLowerCase()) ||
        getTemplateName(t).toLowerCase().includes(templateSearch.toLowerCase())
    );

    // Ensure unique keys by adding index fallback
    const getTemplateKey = (template: TemplateItem, index: number): string => {
        // Always include index to ensure uniqueness
        const baseKey = getTemplateId(template) ? `id-${getTemplateId(template)}` :
            getTemplateName(template) ? `name-${getTemplateName(template)}` :
                `unknown-${index}`;

        // Add index to make it absolutely unique
        return `${baseKey}-${index}`;
    };

    useEffect(() => {
        (async () => {
            try {
                setTemplatesLoading(true);
                setTemplatesError(null);
                console.log('Fetching templates...');
                const res = await fetch("/api/invitations/templates");
                if (res.ok) {
                    const data = await res.json();
                    console.log('Templates loaded:', data);
                    console.log('Template structure:', data.map((t: any) => ({
                        file: t.file,
                        templateName: t.templateName,
                        imageUrl: t.imageUrl
                    })));

                    // Create additional templates for missing images
                    const additionalTemplates = [
                        {
                            templateName: "wedding_invitation_improved_4",
                            imageUrl: "/invitations/wedding_invitation_improved_4.png",
                            file: "wedding_invitation_improved_4.png",
                            displayName: "Wedding Invitation Improved 4"
                        },
                        {
                            templateName: "wedding_invitation_template_1",
                            imageUrl: "/invitations/wedding_invitation_template_1.png",
                            file: "wedding_invitation_template_1.png",
                            displayName: "Wedding Invitation Template 1"
                        },
                        {
                            templateName: "wedding_photo",
                            imageUrl: "/invitations/wedding_photo.png",
                            file: "wedding_photo.png",
                            displayName: "Wedding Photo"
                        }
                    ];

                    // Combine backend templates with additional templates
                    const allTemplates = [...data, ...additionalTemplates];
                    console.log('All templates (backend + additional):', allTemplates);

                    // Debug: Log the first template object completely
                    if (allTemplates.length > 0) {
                        console.log('🔍 First template object:', allTemplates[0]);
                        console.log('🔍 All template properties:', Object.keys(allTemplates[0]));
                        console.log('🔍 Template values:', allTemplates[0]);

                        // Debug: Show template mapping for first template
                        const firstTemplate = allTemplates[0];
                        const templateName = getTemplateName(firstTemplate);
                        const mappedUrl = getTemplateImageUrl(firstTemplate);
                        console.log('🔍 Template mapping debug:', {
                            templateName,
                            mappedUrl,
                            originalImageUrl: firstTemplate.imageUrl,
                            file: firstTemplate.file,
                            allProps: firstTemplate
                        });

                        // Debug: Show all templates
                        console.log('🔍 All templates debug:', allTemplates.map((t, i) => ({
                            index: i,
                            file: t.file,
                            templateName: t.templateName,
                            imageUrl: t.imageUrl,
                            finalUrl: getTemplateImageUrl(t),
                            mapped: getTemplateImageUrl(t) !== t.imageUrl ? '✅ MAPPED' : '❌ NOT MAPPED'
                        })));
                    }

                    // Debug: Check for duplicate keys
                    const keys = allTemplates.map((t: any, index: number) => {
                        const key = getTemplateKey(t, index);
                        console.log(`Template ${index}: file="${getTemplateId(t)}", templateName="${getTemplateName(t)}", key="${key}"`);
                        return key;
                    });

                    const uniqueKeys = new Set(keys);
                    if (keys.length !== uniqueKeys.size) {
                        console.warn('⚠️ Duplicate keys detected!', {
                            total: keys.length,
                            unique: uniqueKeys.size,
                            duplicates: keys.filter((key, index) => keys.indexOf(key) !== index)
                        });
                    }

                    setTemplates(allTemplates);
                } else {
                    console.error('Failed to fetch templates:', res.status, res.statusText);
                    setTemplatesError(`Failed to load templates: ${res.status} ${res.statusText}`);
                }
            } catch (error) {
                console.error('Error fetching templates:', error);
                setTemplatesError('Failed to load templates. Please try refreshing the page.');
            } finally {
                setTemplatesLoading(false);
            }
        })();
    }, []);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);
        try {
            const formData = new FormData(e.currentTarget);
            const invitationData = {
                title: formData.get('title') as string,
                message: formData.get('message') as string,
                templateName: formData.get('templateName') as string,
                buttonText: formData.get('buttonText') as string,
                formUrl: formData.get('formUrl') as string,
                imageUrl: imageUrl || null, // Include the selected imageUrl
                isActive: true
            };

            console.log('Submitting invitation data:', invitationData);

            const res = await fetch("/api/invitations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(invitationData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Backend error response:', errorData);
                throw new Error(errorData.error || errorData.message || "Failed to create invitation");
            }

            const result = await res.json();
            console.log('Invitation created successfully:', result);
            setSuccess("Invitation created successfully! You can now view and share it from the admin area.");

            // Redirect to invitations page after a short delay
            setTimeout(() => {
                router.push('/admin/invitations');
            }, 2000);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Something went wrong";
            console.error('Error creating invitation:', err);
            setError(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-nude-50 via-phoenix-sand-50 to-dusty-blue-50">
            {/* Navigation Header */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/admin"
                                className="text-dusty-blue-600 hover:text-dusty-blue-800 font-medium transition-colors"
                            >
                                ← Back to Admin
                            </Link>
                            <span className="text-gray-400">|</span>
                            <button
                                onClick={() => router.push('/')}
                                className="text-dusty-blue-600 hover:text-dusty-blue-800 font-medium transition-colors"
                            >
                                Home
                            </button>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-nude-600 to-phoenix-sand-600 bg-clip-text text-transparent">
                            Create Invitation
                        </h1>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto p-6">
                {/* Success/Error Messages */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{success}</p>
                                <div className="mt-3 flex space-x-3">
                                    <Link
                                        href="/admin/invitations"
                                        className="text-sm text-green-600 hover:text-green-500 font-medium underline"
                                    >
                                        View All Invitations →
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setSuccess(null);
                                            setTemplateName("");
                                            setTitle("");
                                            setMessage("");
                                            setImageUrl("");
                                        }}
                                        className="text-sm text-green-600 hover:text-green-500 font-medium underline"
                                    >
                                        Create Another
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Visual Template Picker */}
                <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Choose Your Template</h2>
                        {!templatesLoading && !templatesError && templates.length > 0 && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {templates.length} templates available
                            </span>
                        )}
                    </div>

                    {templatesLoading && (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-phoenix-sand-500 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading templates...</p>
                        </div>
                    )}

                    {templatesError && (
                        <div className="text-center py-8">
                            <div className="text-red-500 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <p className="text-red-600 mb-4">{templatesError}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-phoenix-sand-500 text-white rounded-lg hover:bg-phoenix-sand-600 transition-colors"
                            >
                                Refresh Page
                            </button>
                        </div>
                    )}

                    {!templatesLoading && !templatesError && templates.length > 0 && (
                        <>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    value={templateSearch}
                                    onChange={(e) => setTemplateSearch(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-phoenix-sand-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredTemplates.map((t, index) => (
                                    <button
                                        key={getTemplateKey(t, index)}
                                        type="button"
                                        onClick={() => {
                                            setTemplateName(getTemplateName(t));
                                            setImageUrl(getTemplateProperty(t, 'imageUrl') || '');
                                        }}
                                        className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${templateName === getTemplateName(t)
                                            ? 'border-phoenix-sand-500 ring-4 ring-phoenix-sand-200'
                                            : 'border-gray-200 hover:border-phoenix-sand-300'
                                            }`}
                                        title={getTemplateName(t)}
                                    >
                                        <img
                                            src={getTemplateImageUrl(t)}
                                            alt={getTemplateName(t)}
                                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                                            <div className="text-xs font-medium text-white bg-black/50 rounded px-2 py-1 truncate">
                                                {t.displayName || getTemplateName(t).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {!templatesLoading && !templatesError && templates.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No templates available.</p>
                        </div>
                    )}
                </div>

                {/* Form */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                                <select
                                    name="templateName"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-phoenix-sand-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    value={templateName}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        setTemplateName(name);
                                        const t = templates.find(t => getTemplateName(t) === name);
                                        setImageUrl(t ? getTemplateProperty(t, 'imageUrl') || "" : "");
                                    }}
                                    required
                                    disabled={templatesLoading}
                                >
                                    <option value="">
                                        {templatesLoading ? 'Loading templates...' : `Select a template (${filteredTemplates.length} available)`}
                                    </option>
                                    {filteredTemplates.map((t, index) => (
                                        <option key={getTemplateKey(t, index)} value={getTemplateName(t) || ""}>
                                            {t.displayName || getTemplateName(t)?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </option>
                                    ))}
                                </select>
                                {templatesLoading && (
                                    <p className="text-xs text-gray-500 mt-1">Please wait while templates load...</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                                <input
                                    name="buttonText"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-phoenix-sand-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                    value={buttonText}
                                    onChange={e => setButtonText(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {imageUrl && (
                            <div className="bg-white/80 rounded-xl p-4 border border-white/40">
                                <img src={getTemplateImageUrl(templates.find(t => getTemplateName(t) === templateName))} alt="Template" className="w-full rounded-lg shadow-sm" />
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Using template: {templateName.split('/').pop()?.replace('.png', '').replace(/_/g, ' ')}
                                </p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                name="title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-phoenix-sand-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Enter your invitation title..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                name="message"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-phoenix-sand-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                                rows={4}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Enter your invitation message..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Form URL (optional)</label>
                            <input
                                name="formUrl"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-phoenix-sand-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                value={formUrl}
                                onChange={e => setFormUrl(e.target.value)}
                                placeholder="/rsvp"
                            />
                            <p className="text-xs text-gray-500 mt-1">Leave empty to use the default RSVP form</p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full px-6 py-4 bg-gradient-to-r from-phoenix-sand-500 to-nude-500 hover:from-phoenix-sand-600 hover:to-nude-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {submitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Invitation...
                                    </div>
                                ) : (
                                    '✨ Create Beautiful Invitation'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
