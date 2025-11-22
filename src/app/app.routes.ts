import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { UserForm } from './pages/user-form/user-form';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: Users },
  { path: 'user-form', component: UserForm },
  { path: 'user-form/:id', component: UserForm }
];
