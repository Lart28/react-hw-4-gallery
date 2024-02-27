import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  
  const handleKeyDown = useCallback((e)=> {
    if (e.code === 'Escape') {
      onClose();
    }
  }, [onClose])
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, [handleKeyDown])
  
  useEffect(() => {
    return()=> window.removeEventListener('keydown', handleKeyDown);
  },[handleKeyDown])

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

    return createPortal(
      <div className="Overlay" onClick={handleBackdropClick}>
        <div className="Modal">{children}</div>
      </div>,
      modalRoot)
  }

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}