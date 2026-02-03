import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    // Scroll to top on page refresh/load
    useEffect(() => {
        // Handle browser refresh - scroll to top immediately
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Also handle the beforeunload to ensure scroll position is reset
        const handleBeforeUnload = () => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return null;
};

export default ScrollToTop;
