import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

/**
 * Representa a un usuario en la aplicación.
 * @interface Usuario
 * @property {any} [id] - El identificador único del usuario. Opcional.
 * @property {string} nombre - El nombre completo del usuario.
 * @property {string} correo electrónico - La dirección de correo electrónico del usuario.
 */
export interface User {
  id?: any;
  name: string;
  email: string;
}

/**
 * Servicio para gestionar operaciones HTTP relacionadas con el usuario.
 * Proporciona métodos para realizar operaciones CRUD en los usuarios a través de puntos finales de la API.
 *
 * @class UserService
 * @injectable
 */

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Crea una instancia de UserService.
   * @param http - El servicio HttpClient utilizado para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Recupera todos los usuarios de la API.
   *
   * @returns {Observable<any>} Un observable que emite la lista de usuarios.
   */

  getUsers(): Observable<any> {
    return this.http.get<User>(`${environment.apiUrl}`);
  }
  /**
   * Recupera un usuario específico por ID de la API.
   *
   * @param {any} id: el identificador único del usuario a recuperar.
   * @returns {Observable<any>}: un observable que emite los datos del usuario.
   */

  getUser(id: any): Observable<any> {
    return this.http.get<User>(`${environment.apiUrl}/${id}`);
  }
  /**
   * Crea un nuevo usuario en la API.
   *
   * @param {User} body - El objeto de usuario que contiene los datos que se crearán.
   * @returns {Observable<any>} Un observable que emite el usuario creado.
   */
  createUser(body: User): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}`, body);
  }
  /**
   * Actualiza un usuario existente en la API.
   *
   * @param {any} id - El identificador único del usuario a actualizar
   * @param {User} body - The user object containing the updated data
   * @returns {Observable<any>} An observable that emits the updated user
   */
  updateUser(id: any, body: User): Observable<any> {
    return this.http.put<User>(`${environment.apiUrl}/${id}`, body);
  }
  /**
   * Elimina un usuario de la API.
   *
   * @param {any} id - El identificador único del usuario a eliminar
   * @returns {Observable<any>} Un observable que se completa después de la eliminación
   */
  deleteUser(id: any): Observable<any> {
    return this.http.delete<User>(`${environment.apiUrl}/${id}`);
  }

  /**
   * Maneja las respuestas de error HTTP.
   * Diferencia entre errores del lado del cliente y del servidor y formatea mensajes de error apropiados.
   *
   * @private
   * @param {HttpErrorResponse} error - El objeto de respuesta de error HTTP
   * @returns {Observable<never>} Un observable que lanza un error formateado
   */
  private handleError(error: HttpErrorResponse) {
    let msg = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      msg = `Error cliente: ${error.error.message}`;
    } else {
      msg = `Error servidor: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}
