
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import DefaultLayout from "../layout/DefaultLayout";
import Modal from "../components/ModalMessage";
import "../assets/LoginStyle.css";


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [titleModal, setTitleModal] = useState(null);
    const [messageModal, setMessageModal] = useState(null);
    const [routeModal, setRouteModal] = useState("");

    const goTo = useNavigate();
    const auth  = useAuth();

    //Verificar si ya inicio sesion
    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    //Fetch al API
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/usuario`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, email:"" }),
            });

            if (response.status === 204) {
                setTitleModal("Hubo un error");
                setMessageModal("Usuario o contrasena incorrectos");
            }
            else {
                if (response.ok) {
                    const data = await response.json();

                    const cookieData = {
                        idString: data.idString,
                        id: data.id,
                        username: data.username
                    };


                    setUsername("");
                    setPassword("");
                    auth.logged(cookieData);
                    goTo("/dashboard");

                    window.location.reload();

                } else {
                    console.log(response.status);

                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit}  className="form">
                <h1>Inicio de Sesion</h1>

                {titleModal && <Modal title={titleModal} message={messageModal} route={routeModal} />}

                <label>Usuario</label>
                <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Contrasena</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Iniciar Sesion</button>
            </form>
        </DefaultLayout>
    );
}
