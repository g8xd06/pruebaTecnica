import { useAuth } from "../auth/AuthProvider";
import Option from "../components/Option";
import "../assets/DashboardStyle.css";

export default function Dashboard() {

    const auth = useAuth();

    function handleClick() {
        auth.logout();
    }

    return (
        <div className="container">
            <button className="logout-button" onClick={handleClick}>Cerrar sesion</button>

            <div className="options-container">
                <Option buttonText="Cotizacion" route="/quotation" />
                <Option buttonText="Historial" route="/history" />
            </div>
        </div>
    );

}
