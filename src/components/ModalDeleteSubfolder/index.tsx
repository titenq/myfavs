import { Button, Form, Modal } from 'react-bootstrap';

import styles from '@/components/ModalDeleteSubfolder/ModalDeleteSubfolder.module.css';
import { IModalDeleteSubfolder } from '@/interfaces/modalInterface';

const ModalDeleteSubfolder = (props: IModalDeleteSubfolder) => {
  
  return (
    <Modal show={props.showModal} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.modal_title}>
          deletar subpasta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <p>
          tem certeza que deseja deletar a subpasta:<br />
          <b>{props.deleteSubfolderName}</b>
        </p>
        <p>
          <b>atenção:</b> essa ação não pode ser desfeita e vai deletar todos os links da subpasta
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

export default ModalDeleteSubfolder;
