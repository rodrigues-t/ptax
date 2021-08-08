import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Error from '../../models/Error';

interface IModalError {
  error: Error,
  onHide: any,
  modalParams?: any,
}

const ModalError = (props: IModalError) => {
  const { error, onHide, modalParams } = props;
  return (
    <Modal
      show={error.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...modalParams}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {error.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="text-danger">
          {error.text}
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
