import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgIf } from '@angular/common';





@Component({
  selector: 'app-users',
imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  standalone: true,
  providers: [provideAnimations()],
})
export class Users implements OnInit {
  ModalDeleted = false;
  userNameModal: any;

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
closeModal() {
  this.ModalDeleted = false;
  this.loadUsers();
}

  deleteUser(id: any) {
    const nombreUsuario = this.users.find((u) => u.id === id)?.name || '';
         console.log('User deleted successfully', id);
      this.userService.deleteUser(id).subscribe(() => {
   
      this.userNameModal = nombreUsuario;
      this.ModalDeleted = true;
      //this.loadUsers(); // Recargar la lista después de eliminar
    });
  }
}
