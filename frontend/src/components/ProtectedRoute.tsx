// components/ProtectedRoute.tsx
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Make sure to use export keyword here
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return authUser ? <>{children}</> : <Navigate to="/login" replace />;
};

interface UnauthenticatedRouteProps {
  children: React.ReactNode;
}

// And here for the second export
export const UnauthenticatedRoute: FC<UnauthenticatedRouteProps> = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return !authUser ? <>{children}</> : <Navigate to="/" replace />;
};