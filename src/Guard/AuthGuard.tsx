import React, { JSXElementConstructor, useEffect, useState } from 'react';

import { Navigate, redirect } from 'react-router-dom';
import useAuth from '../hooks/auth/useAuth';
const authRoutePaths = ['signin', 'signup', 'post/:id', 'limit-reached'];
const authRoutePathsRegistred = [
  'feed',
  'likes',
  'profile',
  'search',
  'messenger',
  'post/:id',
  'limit-reached',
];
const AuthGuard: React.FC<AuthGuardProps> = ({ ProtectedRoute, path }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}></div>;

  if (isAuthenticated) {
    if (authRoutePaths.includes(path)) return <Navigate to="/feed" replace />;
    if (authRoutePathsRegistred.includes(path)) return ProtectedRoute;
  } else {
    if (authRoutePathsRegistred.includes(path)) return <Navigate to="/signin" replace />;
    if (authRoutePaths.includes(path)) return ProtectedRoute;
  }
  return <Navigate to="*" replace />;
};

export default AuthGuard;
