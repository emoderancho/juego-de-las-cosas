import React from 'react';
import PropTypes from 'prop-types';
import './Components.css';

const Button = ({ size, variant, outline, children, onClick }) => {
  // Clases CSS basadas en las propiedades
  const buttonClasses = `button ${variant} ${size} ${outline ? 'outline' : ''}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string, // Variante de color
  outline: PropTypes.bool, // Indicador de borde
  children: PropTypes.node, // Contenido del botón
  onClick: PropTypes.func, // Función de clic
};

export default Button;
