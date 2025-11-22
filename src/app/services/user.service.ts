import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
    id?: number;
    name: string;
    email: string;
    // agregar más campos según sea necesario
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:3000/users'; // ajustar según el backend
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl).pipe(catchError(this.handleError));
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl, user, this.httpOptions).pipe(catchError(this.handleError));
    }

    updateUser(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${id}`, user, this.httpOptions).pipe(catchError(this.handleError));
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(catchError(this.handleError));
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