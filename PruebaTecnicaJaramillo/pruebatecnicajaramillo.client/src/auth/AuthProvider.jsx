import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

//Contexto para el hook
const AuthContext = createContext({
    isAuthenticated: false,
    userData: null,
    logged: () => { },
    logout: () => { }
});

//Manejo de cookies para mantener la sesion iniciada
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


export default function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState("");

    useEffect(() => {
        const isAuthenticatedCookie = getCookie("isAuthenticated");
        if (isAuthenticatedCookie) {
            setIsAuthenticated(isAuthenticatedCookie === "true");
        }

        const userDataCookie = getCookie("userData");
        if (userDataCookie) {
            setUserData(JSON.parse(userDataCookie));
        }

    }, []);

    function logged(cookieData) {
        setIsAuthenticated(true);
        setCookie("isAuthenticated", true, 5);

        const cookieDataValue = JSON.stringify(cookieData);
        setCookie("userData", cookieDataValue, 5);
    }

    function logout() {
        setIsAuthenticated(false);
        setCookie("isAuthenticated", false, 5);
        deleteCookie("userData");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, logged, logout, userData }}>
        {children}
    </AuthContext.Provider>)
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

//Acceso en hook para para todos los componentes
export const useAuth = () => useContext(AuthContext);
