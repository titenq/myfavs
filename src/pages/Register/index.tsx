import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container, FloatingLabel, Form, Image, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

import styles from '@/pages/Register/Register.module.css';
import { emailValidator, passwordValidator } from '@/helpers/validators';
import ModalError from '@/components/ModalError';
import logo from '@/assets/img/myfavs.png';
import { IRegister, IRegisterData } from '@/interfaces/registerInterface';
import register from '@/api/auth/register';
import { IUser } from '@/interfaces/userInterface';
import { IGenericError } from '@/interfaces/errorInterface';

const Register = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    setValue(event.target.getAttribute('name') || '', event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.name) {
      setErrorMessage('nome de usuário não informado');
      setShowModalError(true);

      return;
    }

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

    if (values.confirmPassword !== values.password) {
      setErrorMessage('senhas não conferem');
      setShowModalError(true);

      return;
    }

    const data: IRegisterData = {
      name: values.name,
      email: values.email,
      password: values.password
    };

    const response: IUser | IGenericError = await register(data);

    if ('error' in response) {
      setErrorMessage(response.message);
      setShowModalError(true);

      return;
    }

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

          <Button type='submit' className={styles.button}>enviar</Button>
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
