'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '../../../lib/api';
import { getAuthToken } from '../../../lib/auth';

interface GuestGroup {
    id: string;
    name: string;
    guestCount?: number;
}

export default function AdminGuestGroupsPage() {
    const [groups, setGroups] = useState<GuestGroup[]>([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Check token expiration and warn user
    useEffect(() => {
        const token = getAuthToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);
                const timeUntilExpiry = payload.exp - currentTime;

                // Warn user 5 minutes before expiry
                if (timeUntilExpiry <= 300 && timeUntilExpiry > 0) {
                    const minutes = Math.ceil(timeUntilExpiry / 60);
                    alert(`⚠️ Your session will expire in ${minutes} minute(s). Please save your work.`);
                }
            } catch (error) {
                console.error('Error checking token expiration:', error);
            }
        }
    }, []);

    const fetchGroups = async () => {
        setIsLoading(true);
        try {
            const groupsData = await api.get('/api/guest-groups');
            
            // Get guest counts for each group
            const groupsWithCounts = await Promise.all(groupsData.map(async (group: GuestGroup) => {
                try {
                    const guestsInGroup = await api.get(`/api/admin/guests?groupId=${group.id}`);
                    return {
                        ...group,
                        guestCount: guestsInGroup.guests?.length || 0
                    };
                } catch (error) {
                    console.error(`Error fetching guests for group ${group.id}:`, error);
                    return {
                        ...group,
                        guestCount: 0
                    };
                }
            }));
            
            setGroups(groupsWithCounts);
            setError('');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroupName.trim()) return;
        
        setIsCreating(true);
        try {
            await api.post('/api/guest-groups', { name: newGroupName.trim() });
            setNewGroupName('');
            fetchGroups(); // Refresh the list
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteGroup = async (groupId: string) => {
        if (window.confirm('Are you sure you want to delete this group? This will NOT delete the guests in this group.')) {
            try {
                await api.delete(`/api/guest-groups/${groupId}`);
                fetchGroups(); // Refresh the list
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dusty-blue-600"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Guest Groups</h1>
                                <p className="text-gray-600">Organize your guests into groups for easier management</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Link
                                    href="/admin"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-dusty-blue-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Dashboard
                                </Link>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Create Group Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Group</h2>
                            <form onSubmit={handleCreateGroup} className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    placeholder="Enter group name"
                                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent"
                                    disabled={isCreating}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-dusty-blue-600 text-white font-medium rounded-lg shadow hover:bg-dusty-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isCreating || !newGroupName.trim()}
                                >
                                    {isCreating ? 'Creating...' : 'Create Group'}
                                </button>
                            </form>
                        </div>

                        {/* Groups List */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h2 className="text-xl font-bold text-gray-800">Guest Groups</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Guests</th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {groups.length > 0 ? groups.map(group => (
                                            <tr key={group.id} className="hover:bg-dusty-blue-50/50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.guestCount || 0}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button 
                                                        onClick={() => handleDeleteGroup(group.id)} 
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">No guest groups found. Create one above.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}