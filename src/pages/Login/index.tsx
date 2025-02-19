import { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container, FloatingLabel, Form, Image, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from '@/pages/Login/Login.module.css';
import { ILoginData } from '@/interfaces/loginInterface';
import { emailValidator, passwordValidator } from '@/helpers/validators';
import ModalError from '@/components/ModalError';
import logo from '@/assets/img/myfavs.png';
import AuthContext from '@/context/AuthContext';
import Loader from '@/components/Loader';

const VITE_RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

const Login = () => {
  const {
    authenticate,
    loading
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const handleRecaptcha = () => {
    if (captchaRef.current) {
      setRecaptchaToken(captchaRef.current.getValue());
    }
  };

  const handleModalErrorClose = () => setShowModalError(false);

  const initialValues: ILoginData = {
    email: '',
    password: ''
  };

  const [values, setValues] = useState<ILoginData>(initialValues);

  const setValue = (key: string, value: string) => {
    setValues({
      ...values,
      [key]: value
    });
  };

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.getAttribute('name')!, event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.email) {
      setErrorMessage('e-mail não informado');
      setShowModalError(true);

      return;
    }

    if (!emailValidator(values.email)) {
      setErrorMessage('e-mail com formato inválido');
      setShowModalError(true);

      return;
    }

    if (!values.password) {
      setErrorMessage('senha não informada');
      setShowModalError(true);

      return;
    }

    const isPasswordValid = passwordValidator(values.password);

    if (isPasswordValid.error) {
      setErrorMessage(isPasswordValid.message);
      setShowModalError(true);

      return;
    }

    const data = {
      email: values.email,
      password: values.password,
      recaptchaToken
    };

    const response = await authenticate(data);
    
    captchaRef?.current?.reset();
    setRecaptchaToken(null);

    if (typeof response === 'object' && 'error' in response) {
      setErrorMessage(response.message);
      setShowModalError(true);

      return;
    }
    
    navigate('/admin');
  };

  return (
    <Container className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.logo_container}>
          <Image src={logo} width={88.95} height={80.75} fluid className={styles.logo} />
          <h1 className={styles.title}>login</h1>
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
              value={values.email}
              className={styles.control}
              onChange={handleChange}
            />
          </FloatingLabel>

          <InputGroup className={styles.input}>
            <FloatingLabel controlId='password' label='senha'>
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                name='password'
                placeholder='senha'
                value={values.password}
                className={styles.control}
                onChange={handleChange}
              />
            </FloatingLabel>
            <InputGroup.Text onClick={handlePasswordVisible} className={styles.eye}>
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </InputGroup.Text>
          </InputGroup>

          <div className={styles.links_container}>
            <Link to={'/esqueci-senha'} className={styles.link}>
              esqueceu a senha?
            </Link>

            <Link to={'/cadastro'} className={styles.link}>
              não tem uma conta? cadastre-se
            </Link>
          </div>

          <ReCAPTCHA
            sitekey={VITE_RECAPTCHA_SITE_KEY}
            ref={captchaRef}
            onChange={handleRecaptcha}
            onExpired={() => setRecaptchaToken(null)}
          />

          {!loading && (
            <button
              type='submit'
              className={styles.button}
              disabled={!recaptchaToken ? true : false}
            >
              {loading && <Loader />} logar
            </button>
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

export default Login;
