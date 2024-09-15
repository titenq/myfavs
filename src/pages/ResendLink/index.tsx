import { ChangeEvent, FormEvent, useState } from 'react';

import { Button, Container, FloatingLabel, Form, Image } from 'react-bootstrap';

import styles from '@/pages/ResendLink/ResendLink.module.css';
import { emailValidator } from '@/helpers/validators';
import ModalError from '@/components/ModalError';
import logo from '@/assets/img/myfavs.png';

const ResendLink = () => {
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleModalErrorClose = () => setShowModalError(false);

  const [email, setEmail] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    if (!email) {
      setErrorMessage('e-mail não informado');
      setShowModalError(true);

      return;
    }

    if (!emailValidator(email)) {
      setErrorMessage('e-mail com formato inválido');
      setShowModalError(true);

      return;
    }

    console.log(email);

    setLoading(false);
  };

  return (
    <Container className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.logo_container}>
          <Image src={logo} width={88.95} height={80.75} fluid className={styles.logo} />
          <h1 className={styles.title}>reenviar link</h1>
        </div>

        <Form onSubmit={handleSubmit} noValidate className={styles.input_container}>
          <FloatingLabel
            controlId='email'
            label='e-mail'
            className={styles.input}
          >
            <Form.Control
              type='email'
              name='email'
              placeholder='e-mail'
              className={styles.control}
              onChange={handleChange}
            />
          </FloatingLabel>

          {loading && (
            <Button type='submit' className={styles.button} disabled>enviando...</Button>
          )}

          {!loading && (
            <Button type='submit' className={styles.button}>enviar</Button>
          )}
        </Form>
      </div>

      <ModalError
        showModalError={showModalError}
        handleModalErrorClose={handleModalErrorClose}
        errorMessage={errorMessage}
      />
    </Container>
  );
};

export default ResendLink;
