import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { Users } from '../pages/users/users';

export interface User {
    id?: any;
    name: string;
    email: string;
    // agregar más campos según sea necesario
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
     private apiUrl = `${environment.apiUrl}/users`;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {}

 
      getUsers(): Observable<any> {
        return this.http.get<User>(`${environment.apiUrl}`)
  }

    getUser(id: any): Observable<any> {
        return this.http.get<User>(`${environment.apiUrl}/${id}`)
  }

    createUser(body: User): Observable<any> {
        return this.http.post<User>(`${environment.apiUrl}`, body)
  }

    updateUser(id: any, body: User): Observable<any> {
        return this.http.put<User>(`${environment.apiUrl}/${id}`, body);
    }
    
    deleteUser(id: any): Observable<any> {
        return this.http.delete<User>(`${environment.apiUrl}/${id}`)
  }
  
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