import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Components.css';
import { Stack, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faBars, faCheck, faGamepad } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ title, roomCode}) => {

    const [copied, setCopied] = useState(false)

    const handleRoomCodeClick = () => {
        navigator.clipboard.writeText(roomCode)

        setCopied(true)

        setTimeout(() => {
        setCopied(false)
        }, 1500)
    }

  return (
    <nav className="navbar py-3">
      <div className="navbar-title ps-3"><FontAwesomeIcon icon={faGamepad} /></div>
      {roomCode && (
        <Stack direction='horizontal'>
            <span className="room-display">Codigo de Sala:</span>
            <div className='pe-3' onClick={handleRoomCodeClick} style={{cursor: 'pointer'}}>
                {!copied && (
                    <span className='room-code'>
                      {roomCode}
                      <FontAwesomeIcon style={{marginLeft: 5}} icon={faClipboard} />
                    </span>
                  )}
                  {copied && (
                    <span className='room-code-copied'>
                      {roomCode}
                      <FontAwesomeIcon style={{marginLeft: 5}} icon={faCheck}/>
                    </span>
                  )}
            </div>
        </Stack>
      )}
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" direction='start'>
          <FontAwesomeIcon className='pe-3' icon={faBars}/>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item> Como Jugar</Dropdown.Item>
          <Dropdown.Divider/>
          <Dropdown.Item> Creditos </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string, // Título del Navbar
  roomCode: PropTypes.string, // Código de la sala (opcional)
};

export default Navbar;
