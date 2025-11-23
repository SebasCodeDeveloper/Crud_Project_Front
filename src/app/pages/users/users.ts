import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import{ User } from '../../services/user.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-users',
  imports: [RouterLink, CommonModule], 
  templateUrl: './users.html',
  styleUrl: './users.scss',
  standalone: true,
  providers: [provideAnimations()]
})
export class Users implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}   

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {     
    this.userService.getUsers().subscribe(data => {
      console.log(data,"data en users");
        this.users = data;
      });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers(); // Recargar la lista después de eliminar
    });
  }
}

