// src/components/Layout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  // List of exact paths where the footer should be hidden
  const hideFooterExactPaths = ['/cart', '/paymentsuccess'];

  // Regex pattern for dynamic paths where the footer should be hidden
  const hideFooterDynamicPatterns = [
    /^\/movie\/[^/]+\/seat$/, // Matches /movie/:movieId/seat
  ];

   // Check if the current path is in the exact path list
   const isExactPathHidden = hideFooterExactPaths.includes(location.pathname);

   // Check if the current path matches any of the dynamic patterns
   const isDynamicPathHidden = hideFooterDynamicPatterns.some(pattern => pattern.test(location.pathname));
 
   // Determine if the footer should be shown
   const shouldShowFooter = !isExactPathHidden && !isDynamicPathHidden;
   
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
     {shouldShowFooter && <Footer /> }
    </div>
  );
};

export default Layout;
