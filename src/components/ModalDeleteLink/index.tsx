import { Button, Form, Modal } from 'react-bootstrap';

import styles from '@/components/ModalDeleteLink/ModalDeleteLink.module.css';
import { IModalDeleteLink } from '@/interfaces/modalInterface';

const ModalDeleteLink = (props: IModalDeleteLink) => {
  
  return (
    <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modal_title}>
          deletar link
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <p>
          tem certeza que deseja deletar o link:<br />{props.deleteLinkUrl}
        </p>

        <Form onSubmit={props.onSubmit} noValidate>
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
              deletar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteLink;
