import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Container, FloatingLabel, Form, Image, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

import styles from '@/pages/Login/Login.module.css';
import { ILoginData } from '@/interfaces/loginInterface';
import { emailValidator, passwordValidator } from '@/helpers/validators';
import ModalError from '@/components/ModalError';
import logo from '@/assets/img/myfavs.png';
import AuthContext from '@/context/AuthContext';

const Login = () => {
  const {
    authenticate,
    error,
    isLoggedIn,
    loading
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setShowModalError(true);

      return;
    }

    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [error, isLoggedIn, navigate]);

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

    await authenticate(values);
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

export default Login;
