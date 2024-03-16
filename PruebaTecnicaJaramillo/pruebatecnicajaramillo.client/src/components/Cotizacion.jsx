
import { PropTypes } from "prop-types";
import "../assets/CotizacionStyle.css";

function CotizacionData({ cotizacionData }) {
    return (
        <div className="cotizacion">
            <p className="numero-cotizacion">Cotizacion #: {cotizacionData.cotizacion}</p>

            <div className="auto">
                <h2>Datos del auto</h2>
                <p>Marca: {cotizacionData.datos_auto.marca}</p>
                <p>Costo: {cotizacionData.datos_auto.costo}</p>
                <p>Modelo: {cotizacionData.datos_auto.modelo}</p>
                <p>Seguro: {cotizacionData.datos_auto.seguro}</p>
                <p>Cobertura: {cotizacionData.datos_auto.cobertura}</p>
                <p>Fabricacion: {cotizacionData.datos_auto.fabricacion}</p>
            </div>

            <div className="usuario">
                <h2>Datos del usuario</h2>
                <p>Nombre: {cotizacionData.datos_usuario.nombre}</p>
                <p>Apellido: {cotizacionData.datos_usuario.apellido}</p>
                <p>Cedula: {cotizacionData.datos_usuario.cedula}</p>
                <p>Nacimiento: {cotizacionData.datos_usuario.nacimiento}</p>
                <p>Telefono: {cotizacionData.datos_usuario.telefono}</p>
            </div>

            <p className="precio" >Precio: {cotizacionData.precio}</p>
        </div>
    );
}

CotizacionData.propTypes = {
    cotizacionData: PropTypes.shape({
        datos_auto: PropTypes.shape({
            marca: PropTypes.string.isRequired,
            costo: PropTypes.number.isRequired,
            modelo: PropTypes.string.isRequired,
            seguro: PropTypes.string.isRequired,
            cobertura: PropTypes.string.isRequired,
            fabricacion: PropTypes.number.isRequired,
        }).isRequired,
        datos_usuario: PropTypes.shape({
            nombre: PropTypes.string.isRequired,
            apellido: PropTypes.string.isRequired,
            cedula: PropTypes.string.isRequired,
            nacimiento: PropTypes.string.isRequired,
            telefono: PropTypes.string.isRequired,
        }).isRequired,
        cotizacion: PropTypes.number.isRequired,
        precio: PropTypes.number.isRequired,
    }).isRequired,
};

export default CotizacionData;
