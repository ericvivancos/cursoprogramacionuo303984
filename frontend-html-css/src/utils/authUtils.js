export const getToken = () => localStorage.getItem('token');
export const setToken = () => localStorage.setItem('token',token);
export const removeToken = () => localStorage.removeItem('token');