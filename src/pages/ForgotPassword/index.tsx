import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, FloatingLabel, Form, Image } from 'react-bootstrap';

import styles from '@/pages/ForgotPassword/ForgotPassword.module.css';
import { emailValidator } from '@/helpers/validators';
import ModalError from '@/components/ModalError';
import logo from '@/assets/img/myfavs.png';
import { IResendLinkResponse } from '@/interfaces/authInterface';
import { IGenericError } from '@/interfaces/errorInterface';
import forgotPassword from '@/api/auth/forgotPassword';
import Loader from '@/components/Loader';
import ReCAPTCHA from 'react-google-recaptcha';

const VITE_RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const handleRecaptcha = () => {
    if (captchaRef.current) {
      setRecaptchaToken(captchaRef.current.getValue());
    }
  };

  const handleModalErrorClose = () => setShowModalError(false);

  const [email, setEmail] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    if (!email) {
      setErrorMessage('e-mail não informado');
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    if (!emailValidator(email)) {
      setErrorMessage('e-mail com formato inválido');
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    const response: IResendLinkResponse | IGenericError = await forgotPassword({
      email,
      recaptchaToken
    });

    if ('error' in response) {
      setErrorMessage(response.message);
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    setIsLoading(false);

    navigate('/esqueci-senha-ok');
  };

  return (
    <Container className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.logo_container}>
          <Image src={logo} width={88.95} height={80.75} fluid className={styles.logo} />
          <h1 className={styles.title}>esqueci a senha</h1>
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

          <ReCAPTCHA
            sitekey={VITE_RECAPTCHA_SITE_KEY}
            ref={captchaRef}
            onChange={handleRecaptcha}
            onExpired={() => setRecaptchaToken(null)}
          />
          
          <button
            type='submit'
            className={styles.button}
            disabled={!recaptchaToken ? true : false}
          >
            {isLoading && <Loader />} enviar
          </button>
          
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

export default ForgotPassword;
