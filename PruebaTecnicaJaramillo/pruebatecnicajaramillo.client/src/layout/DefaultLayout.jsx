
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../assets/DefaultLayoutStyle.css"

export default function DefaultLayout({ children }) {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to = "/">Iniciar Sesion</Link>
                        </li>
                        <li>
                            <Link to="/register">Registrarse</Link>
                        </li>
                    </ul>
                </nav>   
            </header>

            <main>
                {children}
            </main>
        </>  
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
};