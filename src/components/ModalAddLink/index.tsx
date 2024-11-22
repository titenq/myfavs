import { Button, Form, Modal } from 'react-bootstrap';

import styles from '@/components/ModalAddLink/ModalAddLink.module.css';
import { IModalAddLink } from '@/interfaces/modalInterface';

const ModalAddLink = (props: IModalAddLink) => {
  return (
    <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modal_title}>adicionar link</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <Form onSubmit={props.onSubmit} noValidate>
          <Form.Group controlId="url">
            <Form.Label>*url:</Form.Label>
            <Form.Control
              className={styles.input}
              type="text"
              name="url"
              onChange={props.onChange}
              value={props.url}
            />
          </Form.Group>

          <Form.Group controlId="description" className='mt-3'>
            <Form.Label>*descrição:</Form.Label>
            <Form.Control
              className={styles.input}
              type="text"
              name="description"
              onChange={props.onChange}
              value={props.description || ''}
            />
          </Form.Group>

          <Form.Group controlId="isPrivate" className='mt-3'>
            <Form.Check
              inline
              type="radio"
              name="isPrivate"
              id="isPrivate-public"
              label="público"
              value="false"
              onChange={props.onChange}
            />

            <Form.Check
              inline
              type="radio"
              name="isPrivate"
              id="isPrivate-private"
              label="privado"
              value="true"
              onChange={props.onChange}
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

export default ModalAddLink;
