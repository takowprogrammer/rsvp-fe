"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function AdminLoginForm() {
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get('from') || '/admin';
    const expired = params.get('expired') === 'true';
    const invalid = params.get('invalid') === 'true';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Set appropriate error messages based on URL parameters
    useEffect(() => {
        if (expired) {
            setError('Your session has expired. Please log in again.');
        } else if (invalid) {
            setError('Invalid authentication token. Please log in again.');
        }
    }, [expired, invalid]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Login failed');
            }

            const data = await res.json();
            document.cookie = `admin_token=${data.access_token}; path=/; max-age=86400`;
            router.replace(from);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
                        <p className="text-gray-600">Sign in to access the admin dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 border border-dusty-blue-200 rounded-xl focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-dusty-blue-200 rounded-xl focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                placeholder="Enter your password"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center px-6 py-3 bg-gradient-to-r from-dusty-blue-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <Link href="/" className="text-dusty-blue-600 hover:text-dusty-blue-800 transition-colors duration-200">
                            ← Back to Wedding Site
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-amber-50 to-dusty-blue-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dusty-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading login form...</p>
                </div>
            </div>
        }>
            <AdminLoginForm />
        </Suspense>
    );
}