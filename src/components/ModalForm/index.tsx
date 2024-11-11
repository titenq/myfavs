import { Button, Form, Modal } from 'react-bootstrap';

import styles from '@/components/ModalForm/ModalForm.module.css';

const ModalForm = (props: {
  showModal: boolean;
  closeModal: () => void;
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  folderName: string;
  isLoading: boolean;
}) => {
  return (
    <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modal_title}>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Button variant="flat" className={styles.btn} type='submit' disabled={props.isLoading}>
            {props.isLoading ? 'salvando...' : 'salvar'}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className={styles.btn_secondary} onClick={props.closeModal}>
          cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
