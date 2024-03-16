
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import Modal from "../components/Modal";
import "../assets/QuotationStyle.css";

export default function Quotation() {
    //Datos del auto
    const [marca, setMarca] = useState("");
    const [costo, setCosto] = useState("");
    const [modelo, setModelo] = useState("");
    const [seguro, setSeguro] = useState("Terceros");
    const [cobertura, setCobertura] = useState("Responsabilidad Civil");
    const [fabricacion, setFabricacion] = useState("");
    //Datos del usuario
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cedula, setCedula] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [id, setId] = useState("");
    //Datos de la cotizacion
    const [cotizacion, setCotizacion] = useState("");
    const [precio, setPrecio] = useState("");

    const [titleModal, setTitleModal] = useState(null);
    const [messageModal, setMessageModal] = useState(null);
    const [routeModal, setRouteModal] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();


    useEffect(() => {

        setId(auth.userData.idString);

    }, []);

    useEffect(() => {
        if (cotizacion !== "" && precio !== "") {

            const htmlString = `
                <h4>Datos del auto:</h4>
                <p>Modelo: ${modelo}</p>
                <p>Fabricacion: ${fabricacion}</p>
                <h4>Datos del usuario:</h4>
                <p>Nombre: ${nombre} ${apellido}</p>
                <p>Numero de cotizacion: ${cotizacion}</p>
                <p>Precio: ${precio}$</p>
            `;

            setTitleModal("Cotizacion");
            setMessageModal(htmlString);
        }
    }, [cotizacion, precio]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/cotizacion/last`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const ultimaCotizacion = await response.json();
            setCotizacion(ultimaCotizacion + 1);

            const currentYear = new Date().getFullYear();
            const precioSeguro = costo / (currentYear - fabricacion) * 0.35;
            setPrecio(parseFloat(precioSeguro.toFixed(2)));

        }
        catch (error) {
            console.log(error);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchData();
    }

    const handleOkButtonClick = async () => {
        try {
            const cotizacionBody = {
                "datos_auto": {
                    "marca": marca,
                    "costo": costo,
                    "modelo": modelo,
                    "seguro": seguro,
                    "cobertura": cobertura,
                    "fabricacion": fabricacion
                },
                "datos_usuario": {
                    "nombre": nombre,
                    "apellido": apellido,
                    "cedula": cedula,
                    "nacimiento": nacimiento,
                    "telefono": telefono,
                    "_id": {
                        "$oid": id
                    }
                },
                "cotizacion": cotizacion,
                "precio": precio
            };

            const response = await fetch(`${API_URL}/cotizacion/guardar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cotizacionBody),
            });
            if (response.ok) {
                console.log("Se guardo la cotizacion");

                goTo("/dashboard");

            } else {
                console.log("ERROR EN LA CREACION");
                setTitleModal("Hubo un error");
                setMessageModal("No se pudo crear la cuenta");

            }
        }
        catch (error) {
            console.log(error);
        }
    };

    function handleClick() {
        goTo("/dashboard");
    }


    return (
        <div>
            <button onClick={handleClick}> Atras</button>
                
            <div className="formulario">

                {titleModal && <Modal title={titleModal} message={messageModal} route={routeModal} onOkButtonClick={handleOkButtonClick} />}

                <form onSubmit={handleSubmit} className="form">
                    <h1>Cotizacion</h1>

                    <div className="datos-auto">
                        <h2>Datos del auto</h2>

                        <label>Marca</label>
                        <input
                            name="marca"
                            type="text"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                        />

                        <label>Costo</label>
                        <input
                            name="costo"
                            type="number"
                            value={costo}
                            onChange={(e) => setCosto(e.target.value)}
                        />

                        <label>Modelo</label>
                        <input
                            name="modelo"
                            type="text"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                        />

                        <label>Seguro</label>
                        <select id="seguro" value={seguro} onChange={(e) => setSeguro(e.target.value)}>
                            <option value="terceros">Terceros</option>
                            <option value="completo">Completo</option>
                        </select>

                        <label>Cobertura</label>
                        <select id="cobertura" value={cobertura} onChange={(e) => setCobertura(e.target.value)}>
                            <option value="responsabilidadCivil">Responsabilidad Civil</option>
                            <option value="limitada">Limitada</option>
                            <option value="amplia">Amplia</option>
                        </select>

                        <label>Fabricacion</label>
                        <input
                            name="fabricacion"
                            type="number"
                            value={fabricacion}
                            onChange={(e) => setFabricacion(e.target.value)}
                        />
                    </div>

                    <div className="datos-usuario">
                        <h2>Datos del usuario</h2>

                        <label>Nombre</label>
                        <input
                            name="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <label>Apellido</label>
                        <input
                            name="apellido"
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />

                        <label>Cedula</label>
                        <input
                            name="cedula"
                            type="text"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                        />

                        <label>Fecha de nacimiento</label>
                        <input
                            name="nacimiento"
                            type="text"
                            value={nacimiento}
                            onChange={(e) => setNacimiento(e.target.value)}
                        />

                        <label>Telefono</label>
                        <input
                            name="telfono"
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </div>

                    <button>Generar Cotizacion</button>
                </form>
            </div>
        </div>


    );
}
