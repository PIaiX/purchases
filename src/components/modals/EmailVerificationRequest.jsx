import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const EmailVerificationRequest = () => {
  const [showAdvice, setShowAdvice] = useState(false);
  const handleCloseAdvice = () => setShowAdvice(false);
  const handleShowAdvice = () => setShowAdvice(true);

  return (
    <Modal show={showAdvice} onHide={handleCloseAdvice} size={'lg'} centered>
      <Modal.Header closeButton>
        <img src="imgs/icons/warning.png" alt="warning" className='warning'/>
      </Modal.Header>
      <Modal.Body>
        <h2 className='mb-0'>Пожалуйста, войдите или зарегистрируйтесь</h2>
        <p>Добавлять игры в избранное могут только авторизованные пользователи.</p>
      </Modal.Body>
    </Modal>
  );
};

export default EmailVerificationRequest;