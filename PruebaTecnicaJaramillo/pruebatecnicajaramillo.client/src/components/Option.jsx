
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import "../assets/OptionStyle.css";

const Option = (props) => {
    const goTo = useNavigate();

    const handleClick = () => {
        goTo( props.route )
    };

    return (
        <button className="opciones" onClick={handleClick} style={{ fontSize: '20px', padding: '10px 20px' }}>
            {props.buttonText }
        </button>
    );
};

Option.propTypes = {
    buttonText: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
};

export default Option;
