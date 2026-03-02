import { environment } from '../environments/environment';

export const API_URL = environment.apiUrl;

export const APP_MESSAGES = {
  SAVE_SUCCESS: 'Registro salvo com sucesso!',
  DELETE_SUCCESS: 'Registro excluído com sucesso!',
  ERROR: 'Ocorreu um erro. Tente novamente.',
  LOGIN_ERROR: 'Usuário ou senha inválidos.',
  REQUIRED_FIELD: 'Campo obrigatório.'
};
