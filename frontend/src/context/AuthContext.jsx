import { createContext, useState, useEffect, useContext } from 'react';
import { checkAuth, login as loginService, logout as logoutService, register as registerService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const data = await checkAuth();
                if (data.loggedIn) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Auth verification failed', error);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    const login = async (username, password) => {
        const data = await loginService(username, password);
        setUser(data.user);
    };

    const register = async (username, password) => {
        await registerService(username, password);
    };

    const logout = async () => {
        await logoutService();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
