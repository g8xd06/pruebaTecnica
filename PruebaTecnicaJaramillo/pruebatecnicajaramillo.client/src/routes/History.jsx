import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import Cotizacion from "../components/Cotizacion";
import "../assets/HistoryStyle.css";

export default function History() {
    const auth = useAuth();
    const userData = auth.userData;
    const goTo = useNavigate();
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/usuario/${userData.idString}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                const role = jsonData.role;

                let request;
                if (role === 0) {
                    request = `${API_URL}/cotizacion/get/${userData.idString}`;
                } else if (role === 1) {
                    request = `${API_URL}/cotizacion/all`;
                }

                const finalresponse = await fetch(request);
                if (!finalresponse.ok) {
                    console.log("Error en la obtencion del historial");
                }
                const historialData = await finalresponse.json();
                setHistorial(historialData);
                console.log(historialData);
            } catch (error) {
                console.log("error");
            }
        };

        if (historial.length === 0) {
            fetchData();
        }
    }, [historial.length, userData.idString]);

    function handleClick() {
        goTo("/dashboard");
    }

    return (
        <div>
            <button onClick={handleClick}> Atras</button>

            <div className="data">
                {historial.map((cotizacion, index) => (
                    <Cotizacion key={index} cotizacionData={cotizacion} />
                ))}
            </div>
        </div>
    );
}
