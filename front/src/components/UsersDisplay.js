import React from 'react';
import { Stack, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCrown, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import './Components.css';
import Button from './Button';

function UsersDisplay({ users, isAdmin }) {
    return (
      <Container className='justify-content-center'>
          <Stack gap={2} direction='vertical' className='justify-content-center'>
            {users.map((user) => (
                <Stack direction='horizontal' gap={3} className='user-card'>
                    <Col xs={2}>
                        {user.isAdmin && (
                            <FontAwesomeIcon icon={faCrown} />
                        )}
                        {!user.isAdmin && (
                            <FontAwesomeIcon icon={faUser} />
                        )}
                    </Col>
                    <Col xs={6}>
                        {user.username}
                    </Col>
                    <Col xs={2}>
                        {user.status === 'waitingForReconnect' && (
                            <FontAwesomeIcon icon={faSpinner} spinPulse />
                        )}  
                        {user.status !== 'waitingForReconnect' && isAdmin && !user.isAdmin &&(
                            <Button size='small' variant='danger'><FontAwesomeIcon icon={faBan}/></Button>
                        )}  
                    </Col>
                </Stack>
            ))}
        </Stack>
      </Container>
    );
  }
  
  export default UsersDisplay;