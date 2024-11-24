const passwordValidator = (password: string): { error: boolean, message: string } => { 
  if (password.length < 8) {
    return {
      error: true,
      message: 'A senha deve ter no mínimo 8 caracteres'
    };
  }

  if (password.length > 16) {
    return {
      error: true,
      message: 'A senha deve ter no máximo 16 caracteres'
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      error: true,
      message: 'A senha deve ter pelo menos uma letra maiúscula'
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      error: true,
      message: 'A senha deve ter pelo menos uma letra minúscula'
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      error: true,
      message: 'A senha deve ter pelo menos um número'
    };
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    return {
      error: true,
      message: 'A senha deve ter pelo menos um caractere especial'
    };
  }

  return {
    error: false,
    message: 'Senha validada com sucesso'
  };
};

const emailValidator = (email: string): boolean => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false;
  }

  return true;
};

const urlValidator = (url: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?(\/[^\s]*)?$/;

  return urlRegex.test(url);
};

export {
  passwordValidator,
  emailValidator,
  urlValidator
};
