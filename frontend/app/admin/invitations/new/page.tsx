"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SmartImage from '@/components/SmartImage';

interface TemplateItem {
    id?: string;
    name?: string;
    imageUrl?: string;
    displayName?: string;
    templateName?: string;
    isUploaded?: boolean;
    uploadedAt?: string;
    // Add common backend property names
    template_id?: string;
    template_name?: string;
    image_url?: string;
    file?: string;
    // Add index signature to allow dynamic property access
    [key: string]: any;
}

// Helper function to get template properties safely
const getTemplateProperty = (template: TemplateItem, property: string): string => {
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
const getTemplateId = (template: TemplateItem): string => {
    return getTemplateProperty(template, 'file') ||
        getTemplateProperty(template, 'id') ||
        getTemplateProperty(template, 'template_id') ||
        '';
};

// Get template name safely - use templateName from backend
const getTemplateName = (template: TemplateItem): string => {
    return getTemplateProperty(template, 'templateName') ||
        getTemplateProperty(template, 'name') ||
        getTemplateProperty(template, 'template_name') ||
        '';
};

// Get template image URL safely - use frontend API route
const getTemplateImageUrl = (template: TemplateItem): string => {
    // Get the filename from the template
    const file = getTemplateProperty(template, 'file') || '';
    if (file) {
        // Use the frontend API route to serve images (which proxies to backend)
        return `/api/invitations/image/${file}`;
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
    const [templatesLoading, setTemplatesLoading] = useState(true);
    const [templatesError, setTemplatesError] = useState<string | null>(null);
    const [templateSearch, setTemplateSearch] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

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
                const res = await fetch("/api/invitations/templates");
                if (res.ok) {
                    const data = await res.json();
                    setTemplates(data);
                } else {
                    setTemplatesError(`Failed to load templates: ${res.status} ${res.statusText}`);
                }
            } catch (error) {
                setTemplatesError('Failed to load templates. Please try refreshing the page.');
            } finally {
                setTemplatesLoading(false);
            }
        })();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadError(null);
        setUploadSuccess(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/invitations/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const result = await response.json();
            setUploadSuccess(`File uploaded successfully: ${result.originalName}`);

            // Refresh templates to include the new upload
            const templatesRes = await fetch("/api/invitations/templates");
            if (templatesRes.ok) {
                const templatesData = await templatesRes.json();
                setTemplates(templatesData);
            }

            // Clear the file input
            e.target.value = '';
        } catch (error) {
            setUploadError(error instanceof Error ? error.message : 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteTemplate = async (filename: string) => {
        if (!confirm(`Are you sure you want to delete "${filename}"? This action cannot be undone.`)) {
            return;
        }

        setDeleting(filename);
        setDeleteError(null);

        try {
            const response = await fetch(`/api/invitations/template/${encodeURIComponent(filename)}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Delete failed');
            }

            // const result = await response.json();

            // Refresh templates list
            const templatesRes = await fetch("/api/invitations/templates");
            if (templatesRes.ok) {
                const templatesData = await templatesRes.json();
                setTemplates(templatesData);
            }

        } catch (error) {
            setDeleteError(error instanceof Error ? error.message : 'Delete failed');
        } finally {
            setDeleting(null);
        }
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('admin_token='))
                ?.split('=')[1];

            if (!token) {
                router.push('/admin/login');
                return;
            }

            const formData = new FormData(e.currentTarget);
            // Get the filename from the selected template
            const selectedTemplate = templates.find(t => getTemplateName(t) === templateName);
            const imageFilename = selectedTemplate ? getTemplateProperty(selectedTemplate, 'file') : null;

            const invitationData = {
                title: formData.get('title') as string,
                message: formData.get('message') as string,
                templateName: formData.get('templateName') as string,
                buttonText: formData.get('buttonText') as string,
                formUrl: formData.get('formUrl') as string,
                imageUrl: imageFilename ? `/api/invitations/image/${imageFilename}` : null, // Store the API URL
                isActive: true
            };


            const res = await fetch("/api/invitations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify(invitationData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || errorData.message || "Failed to create invitation");
            }

            // const result = await res.json();
            setSuccess("Invitation created successfully! You can now view and share it from the admin area.");

            // Redirect to invitations page after a short delay
            setTimeout(() => {
                router.push('/admin/invitations');
            }, 2000);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Something went wrong";
            // Since the error state isn't displayed, we can just log it for debugging.
            console.error("Failed to create invitation:", errorMessage);
            alert(`Error: ${errorMessage}`); // Alert the user directly as a fallback
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Invitation</h1>
                        <p className="text-gray-600">Design a beautiful invitation for your guests</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link
                            href="/admin/invitations"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-dusty-blue-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Invitations
                        </Link>
                    </div>
                </div>

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

                {/* File Upload Section */}
                <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Your Own Image</h2>

                    {/* Upload Messages */}
                    {uploadSuccess && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-green-800">{uploadSuccess}</p>
                            </div>
                        </div>
                    )}

                    {uploadError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-red-800">{uploadError}</p>
                            </div>
                        </div>
                    )}

                    {deleteError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-red-800">{deleteError}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploading}
                                className="hidden"
                            />
                            <div className={`w-full px-6 py-4 border-2 border-dashed rounded-xl text-center transition-all duration-200 ${uploading
                                ? 'border-dusty-blue-300 bg-dusty-blue-50 cursor-not-allowed'
                                : 'border-dusty-blue-300 hover:border-dusty-blue-500 hover:bg-dusty-blue-50'
                                }`}>
                                {uploading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dusty-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Uploading...
                                    </div>
                                ) : (
                                    <div>
                                        <svg className="mx-auto h-12 w-12 text-dusty-blue-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-600">
                                            <span className="font-medium text-dusty-blue-600 hover:text-dusty-blue-500">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                )}
                            </div>
                        </label>
                    </div>
                </div>

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
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dusty-blue-500 mx-auto mb-4"></div>
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
                                className="px-4 py-2 bg-dusty-blue-500 text-white rounded-lg hover:bg-dusty-blue-600 transition-colors"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredTemplates.map((t, index) => (
                                    <div key={getTemplateKey(t, index)} className="relative group">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setTemplateName(getTemplateName(t));
                                                setImageUrl(getTemplateProperty(t, 'imageUrl') || '');
                                            }}
                                            className={`w-full relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${templateName === getTemplateName(t)
                                                ? 'border-dusty-blue-500 ring-4 ring-dusty-blue-200'
                                                : 'border-gray-200 hover:border-dusty-blue-300'
                                                }`}
                                            title={getTemplateName(t)}
                                        >
                                            <SmartImage
                                                src={getTemplateImageUrl(t)}
                                                alt={getTemplateName(t)}
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/placeholder-image.png';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Upload indicator */}
                                            {t.isUploaded && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Uploaded
                                                    </div>
                                                </div>
                                            )}

                                        </button>

                                        {/* Delete button */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (t.file) {
                                                    handleDeleteTemplate(t.file);
                                                }
                                            }}
                                            disabled={deleting === t.file || !t.file}
                                            className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-50"
                                            title={`Delete ${t.file || 'template'}`}
                                        >
                                            {deleting === t.file ? (
                                                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                    value={buttonText}
                                    onChange={e => setButtonText(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {imageUrl && (
                            <div className="bg-white/80 rounded-xl p-4 border border-white/40">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={getTemplateImageUrl(templates.find(t => getTemplateName(t) === templateName)!)} alt="Template" className="w-full rounded-lg shadow-sm" />
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Using template: {templateName.split('/').pop()?.replace('.png', '').replace(/_/g, ' ')}
                                </p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                name="title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
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
                                className="w-full px-6 py-4 bg-gradient-to-r from-dusty-blue-500 to-blue-500 hover:from-dusty-blue-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
