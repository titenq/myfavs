import { Button, Modal } from 'react-bootstrap';

import styles from '@/components/ModalError/ModalError.module.css';
import { IPropsModalError } from '@/interfaces/errorInterface';

const ModalError = (props: IPropsModalError) => {
  return (
    <Modal show={props.showModalError} onHide={props.handleModalErrorClose} size='sm' centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modal_title}>
          erro
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        {props.errorMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-secondary' className={styles.btn} onClick={props.handleModalErrorClose}>
          fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
