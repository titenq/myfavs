import { Button, Form, Modal } from 'react-bootstrap';

import styles from '@/components/ModalAddSubfolder/ModalAddSubfolder.module.css';
import { IModalAddSubfolder } from '@/interfaces/modalInterface';

const ModalAddSubfolder = (props: IModalAddSubfolder) => {
  return (
    <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modal_title}>adicionar subpasta</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <Form onSubmit={props.onSubmit} noValidate>
          <Form.Group controlId="subfolderName">
            <Form.Label>*nome da subpasta:</Form.Label>
            <Form.Control
              className={styles.input}
              type="text"
              name="subfolderName"
              onChange={props.onChange}
              value={props.subfolderName}
            />
          </Form.Group>
          <Modal.Footer className={styles.modal_footer}>
            <Button
              variant="flat"
              className={styles.button_cancel}
              onClick={props.closeModal}
            >
              cancelar
            </Button>
            <Button
              variant="flat"
              className={styles.button_save}
              type='submit'
              disabled={props.isLoading}
            >
              {props.isLoading ? 'salvando...' : 'salvar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddSubfolder;
