import React from 'react';
import PropTypes from 'prop-types';
import './Components.css';
import { Stack } from 'react-bootstrap';

const Button = ({description, value, onChange, maxLength, placeholder, inputType}) => {
  // Clases CSS basadas en las propiedades
  const inputClasses = `input ${inputType}`;

  return (
    <Stack className="input-stack">
        <input 
            className={inputClasses} 
            value={value} 
            maxLength={maxLength} 
            onChange={onChange}
            placeholder={placeholder}
            >
        </input>
        <p>
            <small>{description}</small>
        </p>
    </Stack>
  );
};

Button.propTypes = {
  variant: PropTypes.string, // Variante de color
  outline: PropTypes.bool, // Indicador de borde
  children: PropTypes.node, // Contenido del botón
  onClick: PropTypes.func, // Función de clic
};

export default Button;