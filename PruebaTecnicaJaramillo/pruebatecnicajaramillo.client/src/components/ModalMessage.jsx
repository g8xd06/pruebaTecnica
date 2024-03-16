import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../assets/ModalStyle.css";

export default function ModalMessage(props) {

    const [showModal, setShowModal] = useState(true);

    const goTo = useNavigate();


    const toggleModal = () => {
        setShowModal(!showModal);
        goTo(props.route);
    }

    return (
        <div className={`modal ${showModal ? 'show' : ''}`}>
            <div className="modal-content">

                <h2>{props.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: props.message }} />
                <span className="close" onClick={toggleModal}>&times;</span>
            </div>
        </div>
    );
}

ModalMessage.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    onOkButtonClick: PropTypes.func
};