import { Button, Form, Modal } from 'react-bootstrap';

import styles from '@/components/ModalEditFolder/ModalEditFolder.module.css';
import { IModalEditFolder } from '@/interfaces/modalInterface';

const ModalEditFolder = (props: IModalEditFolder) => {
  return (
    <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modal_title}>editar nome da pasta {props.oldFolderName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <Form onSubmit={props.onSubmit} noValidate>
          <Form.Group controlId="folderName">
            <Form.Label>*nome da pasta:</Form.Label>
            <Form.Control
              className={styles.input}
              type="text"
              name="folderName"
              onChange={props.onChange}
              value={props.folderName}
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

export default ModalEditFolder;
