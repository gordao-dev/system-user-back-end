interface ICreateUser {
  firstName: string; // Mínimo 4 caracteres e não pode conter números
  lastName: string; // Mínimo 4 caracteres e não pode conter números
  email: string; // Deve ser um email válido
  phoneNumber: string; // Deve conter apenas números e ser um número de telefone válido
  password: string; // Mínimo 8 caracteres
}

export default ICreateUser;
