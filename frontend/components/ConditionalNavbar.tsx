'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
    const pathname = usePathname();

    // Pages where navbar should be hidden
    const hiddenPages = [
        '/rsvp',
        '/invitation'
    ];

    // Check if current path should hide navbar
    const shouldHideNavbar = hiddenPages.some(page =>
        pathname.startsWith(page)
    );

    // Don't render navbar on specified pages
    if (shouldHideNavbar) {
        return null;
    }

    return <Navbar />;
}
