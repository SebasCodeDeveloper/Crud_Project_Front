// Definimos una interfaz llamada "User"
// Sirve para indicar cómo debe estar estructurado un objeto de tipo usuario
export interface User {
  // "id" es opcional (por eso el signo ?)
  // Puede ser de cualquier tipo (number, string, etc.)
  id?: any;

  // "name" es obligatorio y debe ser un string
  name: string;

  // "email" es obligatorio y debe ser un string
  email: string;

  // "password" también es opcional
  // Se usa por ejemplo al registrar o iniciar sesión
  password?: string;
}
