import React, { useEffect } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

export function AuthHoc<P extends {}>(Page: React.ComponentType<P>) {
  const AuthProtectedPage = (props: P) => {
    const navigate = useNavigate();

    const { checkIfAlreadyLogged, isCheckingAuthStatus, user } = useUserStore();

    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          await checkIfAlreadyLogged();
        } catch (err) {
          navigate('/signin');
        }
      };
      if (!user) {
        checkAuthStatus();
      }
    }, []);

    if (isCheckingAuthStatus || !user) {
      return <div>Loading...</div>;
    }
    return <Page {...props} />;
  };
  return AuthProtectedPage;
}
