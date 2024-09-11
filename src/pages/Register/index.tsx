import { ChangeEvent, FormEvent, useState } from 'react';

import { Button, Container, FloatingLabel, Form, Image, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

import styles from '@/pages/Register/Register.module.css';
import { emailValidator, passwordValidator } from '@/helpers/validators';
import ModalError from '@/components/ModalError';
import logo from '@/assets/img/myfavs.png';
import { IRegisterData } from '@/interfaces/registerInterface';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleModalErrorClose = () => setShowModalError(false);

  const initialValues: IRegisterData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [values, setValues] = useState<IRegisterData>(initialValues);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.username) {
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

    console.log(values);
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
            controlId='username'
            label='nome de usuário'
            className={styles.input}
          >
            <Form.Control
              type='text'
              name='username'
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
