'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { api } from '../../../lib/api';
import { logout, getAuthToken } from '../../../lib/auth';

// Define interfaces for the data structures
interface GuestGroup {
    id: string;
    name: string;
}

interface QrCode {
    alphanumericCode: string;
}

interface Guest {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    numberOfGuests: number;
    status: string;
    checkedIn: boolean;
    createdAt: string;
    group?: GuestGroup;
    qrCode?: QrCode;
}

export default function AdminGuestsPage() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [groups, setGroups] = useState<GuestGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;


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

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Fetch guests with pagination
            const guestsResponse = await api.get(`/api/admin/guests?page=${currentPage}&limit=${pageSize}${selectedGroup ? `&groupId=${selectedGroup}` : ''}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`);

            setGuests(guestsResponse.guests || []);
            // Calculate totalPages from total count
            const total = guestsResponse.total || 0;
            const calculatedTotalPages = Math.ceil(total / pageSize);
            setTotalPages(calculatedTotalPages);

            // Fetch groups for the filter
            const groupsData = await api.get('/api/guest-groups');
            setGroups(groupsData || []);

            setError('');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, pageSize, selectedGroup, searchTerm]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGroup(e.target.value);
        setCurrentPage(1); // Reset to first page when changing filters
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page when searching
        fetchData();
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handleDelete = async (guestId: string) => {
        if (window.confirm('Are you sure you want to delete this guest?')) {
            try {
                await api.delete(`/api/admin/guests/${guestId}`);
                // Refetch guests after deletion
                fetchData();
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 p-6 md:p-10">
                <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dusty-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-dusty-blue-600 to-blue-600 bg-clip-text text-transparent">Wedding Guest List</h1>
                            <p className="text-gray-600 mt-1">View, filter, and search all RSVPs for Doris & Emmanuel's special day.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/admin"
                                className="px-4 py-2 text-sm font-medium text-dusty-blue-700 bg-white border border-dusty-blue-300 rounded-md hover:bg-dusty-blue-50 focus:outline-none focus:ring-2 focus:ring-dusty-blue-500 focus:border-dusty-blue-500 transition-colors"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="p-6 border-b border-dusty-blue-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search guests..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="ml-2 px-4 py-2 bg-dusty-blue-600 text-white font-medium rounded-lg shadow hover:bg-dusty-blue-700 transition-colors"
                                >
                                    Search
                                </button>
                            </form>

                            <div className="w-full md:w-64">
                                <select
                                    value={selectedGroup}
                                    onChange={handleGroupChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent"
                                >
                                    <option value="">All Groups</option>
                                    {groups.map(group => (
                                        <option key={group.id} value={group.id}>{group.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {guests.length === 0 && !isLoading ? (
                            <div className="p-8 text-center">
                                <p className="text-lg text-gray-500">No guests found matching your criteria.</p>
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-dusty-blue-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QR Code</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RSVP Date</th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-dusty-blue-200">
                                    {guests.map(guest => (
                                        <tr key={guest.id} className="hover:bg-dusty-blue-50/50 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{guest.firstName} {guest.lastName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.email}<br />{guest.phone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.group?.name || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{guest.qrCode?.alphanumericCode || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${guest.checkedIn ? 'bg-green-100 text-green-800' : 'bg-dusty-blue-100 text-dusty-blue-800'}`}>
                                                    {guest.checkedIn ? 'Checked-In' : guest.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(guest.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleDelete(guest.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="px-6 py-4 border-t border-dusty-blue-200 flex items-center justify-between bg-gradient-to-r from-dusty-blue-50 to-blue-50">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-dusty-blue-700 bg-white border border-dusty-blue-300 rounded-md hover:bg-dusty-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-4 py-2 text-sm font-medium text-dusty-blue-700 bg-white border border-dusty-blue-300 rounded-md hover:bg-dusty-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
