'use client';

import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../lib/api";

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  isAttending: boolean;
  numberOfCompanions?: number;
  dietaryRestrictions?: string;
  qrCode?: { alphanumericCode: string };
  isVerified: boolean;
  verifiedAt?: string;
  createdAt: string;
  group?: { id: string; name: string } | null;
}

interface GuestGroup { id: string; name: string }

interface ExtendedStats {
  attendance: {
    confirmed: number;
    checkedIn: number;
    noShows: number;
    showRate: number;
    checkinTimeline: { hour: string; count: number }[];
    totalExpectedGuests: number;
  };
  qr: {
    codesGenerated: number;
    codesUsed: number;
    scanSuccess: number;
    scanFailures: number;
    scanByMethod: { manual: number; scan: number };
  };
  communication: {
    thankYouSent: number;
    emailFailures: number;
  };
}

export default function AdminDashboard() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [groups, setGroups] = useState<GuestGroup[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string>('');
  const [extended, setExtended] = useState<ExtendedStats | null>(null);
  const defaultEventDate = process.env.NEXT_PUBLIC_WEDDING_DATE as string | undefined;
  const [eventDate, setEventDate] = useState<string>(defaultEventDate || "");

  useEffect(() => {
    (async () => {
      try {
        const [guestsData, groupsData] = await Promise.all([
          api.get("/api/admin/guests?page=1&limit=100"),
          api.get("/api/guest-groups"),
        ]);
        setGuests(guestsData.guests || []);
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!activeGroupId) {
      setFilteredGuests(guests);
    } else {
      setFilteredGuests(guests.filter(g => g.group?.id === activeGroupId));
    }
  }, [guests, activeGroupId]);

  useEffect(() => {
    (async () => {
      try {
        const url = eventDate ? `/api/admin/guests/stats/extended?eventDate=${encodeURIComponent(eventDate)}` : '/api/admin/guests/stats/extended';
        const statsData = await api.get(url);
        setExtended(statsData);
      } catch (error) {
        console.error('Error fetching extended stats:', error);
      }
    })();
  }, [eventDate]);

  const TimelineChart = ({ data }: { data: { hour: string; count: number }[] }) => {
    const max = Math.max(1, ...data.map(d => d.count));
    const barWidth = 14;
    const gap = 6;
    const height = 120;
    const width = data.length * (barWidth + gap);
    return (
      <svg width={width} height={height} className="overflow-visible">
        {data.map((d, i) => {
          const h = Math.round((d.count / max) * (height - 20));
          const x = i * (barWidth + gap);
          const y = height - h;
          return (
            <g key={d.hour}>
              <rect x={x} y={y} width={barWidth} height={h} rx={3} className="fill-amber-400" />
              {i % 3 === 0 && (
                <text x={x + barWidth / 2} y={height + 12} textAnchor="middle" className="fill-gray-500 text-[10px]">{d.hour}</text>
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-dusty-blue-50 via-white to-nude-50 p-3 sm:p-6">
      {/* Admin Menu Bar */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-dusty-blue-700 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between h-14 sm:h-16">
          <div className="text-white font-semibold text-base sm:text-lg">Admin Dashboard</div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-md bg-white/20 text-white font-medium hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30 text-xs sm:text-sm"
            >
              🏠 <span className="hidden sm:inline">Wedding Home</span>
            </button>
            <button
              onClick={() => {
                document.cookie = 'admin_token=; path=/; max-age=0';
                window.location.href = '/admin/login';
              }}
              className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-md bg-dusty-blue-800 text-white font-medium hover:bg-dusty-blue-900 transition-all duration-200 border border-dusty-blue-700 text-xs sm:text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-dusty-blue-500 via-dusty-blue-600 to-dusty-blue-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-20">
          <div className="text-center text-white">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
              Wedding Admin Dashboard
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-dusty-blue-100 max-w-2xl mx-auto px-2">
              Manage Doris & Emmanuel&apos;s special day with elegance and ease
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-dusty-blue-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 -mt-4 sm:-mt-8 relative z-10">
        {/* Quick Actions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-dusty-blue-200/50">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link href="/admin/invitations" className="group flex items-center p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-2xl border border-amber-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="p-2 sm:p-3 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Manage Invitations</h4>
                <p className="text-sm sm:text-base text-gray-600">Create and manage wedding invitations</p>
              </div>
            </Link>

            <Link href="/admin/invitations/new" className="group flex items-center p-4 sm:p-6 bg-gradient-to-br from-dusty-blue-50 to-dusty-blue-100 hover:from-dusty-blue-100 hover:to-dusty-blue-200 rounded-2xl border border-dusty-blue-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="p-2 sm:p-3 bg-dusty-blue-100 rounded-xl group-hover:bg-dusty-blue-200 transition-colors duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-dusty-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Create Invitation</h4>
                <p className="text-sm sm:text-base text-gray-600">Design a new beautiful invitation</p>
              </div>
            </Link>

            <Link href="/admin/guests" className="group flex items-center p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-2xl border border-amber-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl sm:col-span-2 lg:col-span-1">
              <div className="p-2 sm:p-3 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Full Guest List</h4>
                <p className="text-sm sm:text-base text-gray-600">View, search, and manage all guests</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        {extended && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Attendance Card */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-dusty-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-dusty-blue-100 rounded-xl mr-3 sm:mr-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-dusty-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Attendance</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Confirmed:</span>
                  <span className="font-semibold text-dusty-blue-600">{extended.attendance.confirmed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Checked In:</span>
                  <span className="font-semibold text-dusty-blue-600">{extended.attendance.checkedIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">No-shows:</span>
                  <span className="font-semibold text-red-600">{extended.attendance.noShows}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Show Rate:</span>
                  <span className="font-semibold text-dusty-blue-600">{extended.attendance.showRate}%</span>
                </div>
                <div className="pt-3 border-t border-dusty-blue-100">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Guests:</span>
                    <span className="font-bold text-gray-800">{extended.attendance.totalExpectedGuests}</span>
                  </div>
                </div>
              </div>
              {extended.attendance.checkinTimeline?.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Check-in Timeline</h4>
                  <TimelineChart data={extended.attendance.checkinTimeline} />
                </div>
              )}
            </div>

            {/* QR Codes Card */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-dusty-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-dusty-blue-100 rounded-xl mr-3 sm:mr-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-dusty-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">QR Codes</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Generated:</span>
                  <span className="font-semibold text-dusty-blue-600">{extended.qr.codesGenerated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Used:</span>
                  <span className="font-semibold text-dusty-blue-600">{extended.qr.codesUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success:</span>
                  <span className="font-semibold text-green-600">{extended.qr.scanSuccess}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Failures:</span>
                  <span className="font-semibold text-red-600">{extended.qr.scanFailures}</span>
                </div>
                <div className="pt-3 border-t border-dusty-blue-100">
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between mb-1">
                      <span>Manual:</span>
                      <span className="font-semibold">{extended.qr.scanByMethod.manual}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scan:</span>
                      <span className="font-semibold">{extended.qr.scanByMethod.scan}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Card */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-dusty-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-dusty-blue-100 rounded-xl mr-3 sm:mr-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-dusty-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Communication</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Thank-you sent:</span>
                  <span className="font-semibold text-green-600">{extended.communication.thankYouSent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email failures:</span>
                  <span className="font-semibold text-red-600">{extended.communication.emailFailures}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-dusty-blue-200/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <label className="text-sm font-medium text-gray-700">Filter by group:</label>
                <select
                  value={activeGroupId}
                  onChange={(e) => setActiveGroupId(e.target.value)}
                  className="border border-dusty-blue-300 rounded-xl px-3 sm:px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-auto"
                >
                  <option value="">All Groups</option>
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <label className="text-sm font-medium text-gray-700">Event date:</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="text-sm border border-dusty-blue-300 rounded-xl px-3 sm:px-4 py-2 bg-white focus:ring-2 focus:ring-dusty-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-auto"
                />
              </div>
            </div>
            <div className="flex justify-end w-full lg:w-auto">
              <button
                onClick={async () => {
                  try {
                    await api.post('/api/admin/thank-you', {});
                    alert('Thank you emails sent successfully!');
                  } catch (error) {
                    console.error('Error sending thank you emails:', error);
                    alert('Error sending thank you emails');
                  }
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-dusty-blue-500 to-dusty-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                title="Send thank-you emails to all checked-in guests who haven't received it yet"
              >
                📧 Send Thank You
              </button>
            </div>
          </div>
        </div>

        {/* Guest List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-dusty-blue-200/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Guest Overview</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <span className="text-sm text-gray-500 bg-dusty-blue-100 px-3 py-1 rounded-full">{filteredGuests.length} guests</span>
              <Link
                href="/admin/guests"
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-dusty-blue-500 to-dusty-blue-600 rounded-xl hover:from-dusty-blue-600 hover:to-dusty-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Full List
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-dusty-blue-200 rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-dusty-blue-50 to-dusty-blue-100">
                <tr>
                  <th className="border border-dusty-blue-200 px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Name</th>
                  <th className="border border-dusty-blue-200 px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden sm:table-cell">Email</th>
                  <th className="border border-dusty-blue-200 px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700">Group</th>
                  <th className="border border-dusty-blue-200 px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 hidden md:table-cell">QR Code</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.slice(0, 10).map((guest, index) => (
                  <tr
                    key={guest.id}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-dusty-blue-50/50'
                      } hover:bg-dusty-blue-50/50 transition-colors duration-200`}
                  >
                    <td className="border border-dusty-blue-200 px-2 sm:px-4 py-2 sm:py-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 text-sm sm:text-base">{guest.firstName} {guest.lastName}</span>
                        <span className="text-gray-500 text-xs sm:hidden">{guest.email}</span>
                      </div>
                    </td>
                    <td className="border border-dusty-blue-200 px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                      <span className="text-gray-600 text-sm">{guest.email}</span>
                    </td>
                    <td className="border border-dusty-blue-200 px-2 sm:px-4 py-2 sm:py-3">
                      <span className="text-gray-600 text-xs sm:text-sm">{guest.group?.name || '-'}</span>
                    </td>
                    <td className="border border-dusty-blue-200 px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                      <span className="text-gray-600 font-mono text-xs">{guest.qrCode?.alphanumericCode || '-'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredGuests.length > 10 && (
              <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500">
                Showing first 10 guests. <Link href="/admin/guests" className="text-dusty-blue-600 hover:text-dusty-blue-800 font-medium">View all {filteredGuests.length} guests</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}