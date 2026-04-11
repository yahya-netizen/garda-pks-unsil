import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const Protected = ({ children }: { children: React.ReactNode}) => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [user, token, navigate]);

    if (!token) {
        return null;
    }

    return <>{children}</>;
}