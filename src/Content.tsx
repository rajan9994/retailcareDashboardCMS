import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { appInfo } from './app-info';
import { appRoutes } from './app-routes';
import { SideNavOuterToolbar as SideNavBarLayout } from './layouts';
import { checkAuth } from './api/auth';
export const Content = () => {
  const isAuthenticatedUser = checkAuth(); // Check if user is authenticated

  return (
    <SideNavBarLayout title={appInfo.title}>
      <Routes>
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {/* Conditionally render login page if user is not authenticated */}
        {!isAuthenticatedUser && <Route path='*' element={<Navigate to='/login' />} />}
        {/* Redirect to CRM contact list if user is authenticated */}
        {isAuthenticatedUser && <Route path='*' element={<Navigate to='/crm-contact-list' />} />}
      </Routes>
    </SideNavBarLayout>
  );
};

