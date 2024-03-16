
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import DefaultLayout from "../layout/DefaultLayout";
import Modal from "../components/ModalMessage";


export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [titleModal, setTitleModal] = useState(null);
    const [messageModal, setMessageModal] = useState(null);
    const [routeModal, setRouteModal] = useState("");

    const auth = useAuth();

    //Fetch al API
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/usuario/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, email }),
            });
            if (response.ok) {
                console.log("Se creo el usuario");
                setTitleModal("Cuenta creada");
                setMessageModal("Cuenta creada con exito, inicie sesion");
                setRouteModal("/");

                setUsername("");
                setPassword("");
                setEmail("");

            } else {
                setTitleModal("Hubo un error");
                setMessageModal("Verifique los campos");

            }
        } catch (error) {
            console.log(error);
        }
    }

    //Verificar si ya inicio sesion
    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit} className="form">
                <h1>Registrarse</h1>

                {titleModal && <Modal title={titleModal} message={messageModal} route={routeModal} />}

                <label>Correo Electronico</label>
                <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>Usuario</label>
                <input
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />

                <label>Contrasena</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button>Crear cuenta</button>
            </form>
        </DefaultLayout>

    );
}
