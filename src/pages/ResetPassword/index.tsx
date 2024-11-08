import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Container, FloatingLabel, Form, Image, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

import styles from '@/pages/ResetPassword/ResetPassword.module.css';
import ModalError from '@/components/ModalError';
import logo from '@/assets/img/myfavs.png';
import { IResendLinkResponse, IResetPassword, IResetPasswordData } from '@/interfaces/authInterface';
import { IGenericError } from '@/interfaces/errorInterface';
import resetPassword from '@/api/auth/resetPassword';
import { passwordValidator } from '@/helpers/validators';
import Loader from '@/components/Loader';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = searchParams.get('token');

  const initialValues: IResetPassword = {
    password: '',
    confirmPassword: ''
  };

  const [values, setValues] = useState<IResetPassword>(initialValues);

  const setValue = (key: string, value: string) => {
    setValues({
      ...values,
      [key]: value
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.getAttribute('name') || '', event.target.value);
  };

  const handleModalErrorClose = () => setShowModalError(false);

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    if (!token) {
      setErrorMessage('token não informado');
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

    const data: IResetPasswordData = {
      token,
      password: values.password
    };

    const response: IResendLinkResponse | IGenericError = await resetPassword(data);

    if ('error' in response) {
      setErrorMessage(response.message);
      setShowModalError(true);
      setIsLoading(false);

      return;
    }

    setIsLoading(false);

    navigate('/recadastrar-senha-ok');
  };

  return (
    <Container className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.logo_container}>
          <Image src={logo} width={88.95} height={80.75} fluid className={styles.logo} />
          <h1 className={styles.title}>redefinir senha</h1>
        </div>

        <Form onSubmit={handleSubmit} noValidate className={styles.input_container}>
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

          <button type='submit' className={styles.button}>
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

export default ResetPassword;
