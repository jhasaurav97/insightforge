import { createContext, useContext, useEffect, useState } from "react"
import api from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken")
    );
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = Boolean(accessToken);

    useEffect(() => {
        const fetchUser = async () => {
            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get("/users/me");
                setUser(res.data.data);
            } catch {
                logout();
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [accessToken])

    const login = ({ accessToken, refreshToken }) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setAccessToken(accessToken);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);