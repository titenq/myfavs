import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, FloatingLabel, Form, Image, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

import styles from '@/pages/Register/Register.module.css';
import { emailValidator, passwordValidator } from '@/helpers/validators';
import ModalError from '@/components/ModalError';
import logo from '@/assets/img/myfavs.png';
import { IRegister, IRegisterRequest } from '@/interfaces/registerInterface';
import register from '@/api/auth/register';
import { IUser } from '@/interfaces/userInterface';
import { IGenericError } from '@/interfaces/errorInterface';
import Loader from '@/components/Loader';
import useRecaptcha from '@/hooks/useRecapcha';

const Register = () => {
  const navigate = useNavigate();
  const { recaptchaToken, resetRecaptcha, RecaptchaComponent } = useRecaptcha();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModalErrorClose = () => setShowModalError(false);

  const initialValues: IRegister = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [values, setValues] = useState<IRegister>(initialValues);

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
    const name = event.target.getAttribute('name') || '';
    let value = event.target.value;

    if (name === 'name') {
      value = value
        .toLowerCase()
        .replace(/[^a-z0-9\-_]/g, '')
        .slice(0, 10);

      event.target.value = value;
    }

    setValue(name, value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    if (!values.name) {
      setErrorMessage('nome de usuário não informado');
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    if (!values.email) {
      setErrorMessage('e-mail não informado');
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    if (!emailValidator(values.email)) {
      setErrorMessage('e-mail com formato inválido');
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    if (!values.password) {
      setErrorMessage('senha não informada');
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    const isPasswordValid = passwordValidator(values.password);

    if (isPasswordValid.error) {
      setErrorMessage(isPasswordValid.message);
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    if (values.confirmPassword !== values.password) {
      setErrorMessage('senhas não conferem');
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    const data: IRegisterRequest = {
      name: values.name,
      email: values.email,
      password: values.password,
      recaptchaToken
    };

    const response: IUser | IGenericError = await register(data);

    resetRecaptcha();

    if ('error' in response) {
      setErrorMessage(response.message);
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    setIsLoading(false);

    navigate('/cadastro-sucesso');
  };

  return (
    <Container className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.logo_container}>
          <Image src={logo} width={88.95} height={80.75} fluid className={styles.logo} />
          <h1 className={styles.title}>cadastro</h1>
        </div>

        <Form onSubmit={handleSubmit} noValidate className={styles.input_container}>
          <FloatingLabel
            controlId='name'
            label='nome de usuário'
            className={styles.input}
          >
            <Form.Control
              type='text'
              name='name'
              placeholder='nome de usuário'
              className={styles.control}
              onChange={handleChange}
            />
          </FloatingLabel>
          <span className={styles.span}>de 3 a 10 caracteres, somente minúsculas, números, - e _</span>

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
          <span className={styles.span}>
            mínimo de 8 caracteres, maiúsculo, minúsculo, número e caractere especial
          </span>

          <InputGroup className={styles.input}>
            <FloatingLabel controlId='confirmPassword' label='confirmar senha'>
              <Form.Control
                type={passwordVisible ? 'text' : 'password'}
                name='confirmPassword'
                placeholder='confirmar senha'
                className={styles.control}
                onChange={handleChange}
              />
            </FloatingLabel>
            <InputGroup.Text onClick={handlePasswordVisible} className={styles.eye}>
              {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </InputGroup.Text>
          </InputGroup>

          <RecaptchaComponent />

          <button
            type='submit'
            className={styles.button}
            disabled={!recaptchaToken ? true : false}
          >
            {isLoading && <Loader />} cadastrar
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

export default Register;
