import { User } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-users',
  imports: [RouterLink, CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  standalone: true,
  providers: [provideAnimations()],
})
export class Users implements OnInit {
  /**
   * Indica si se muestra actualmente un modal de eliminación.
   * @type {boolean}
   */
  modalDeleted = false;
  modalConfirmDelete = false;
  userNameModal: any;
  datos: any;
  userSelectionedId: any;

  /**
   * Matriz de objetos de usuario que representa la colección de usuarios.
   */
  users: User[] = [];
  /**
   * Crea una instancia del componente Usuarios.
   * @param userService - La instancia de UserService utilizada para gestionar las operaciones relacionadas con los usuarios.
   */
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Carga todos los usuarios del servicio y actualiza la lista de usuarios.
   * Se suscribe al observable getUsers y completa la propiedad users del componente con los datos recuperados.
   */
  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  /**
   * Elimina un usuario por su ID y actualiza la interfaz de usuario según corresponda.
   *
   * @param id - El identificador único del usuario que se eliminará
   * @returns void
   *
   * @remarks
   * Este método realiza las siguientes operaciones:
   * - Recupera el nombre del usuario de la matriz users para mostrarlo en el modal
   * - Llama a userService para eliminar al usuario del backend
   * - Establece modalConfirmDelete como falso para cerrar el modal de confirmación
   * - En caso de éxito: actualiza datos con la respuesta y muestra el modal de confirmación de la eliminación
   * - En caso de error: registra el error en la consola
   */
  deleteUser(id: any) {
    this.userNameModal = this.users.find((u) => u.id === id)?.name || '';
    this.modalConfirmDelete = false;
    this.userService.deleteUser(id).subscribe({
      next: (data) => {
        this.datos = data;
        this.modalDeleted = true;
      },
      error: (err) => {
        console.error('Error deleting user', err);
      },
    });
  }

  /**
   * Cierra todos los modales activos y actualiza la lista de usuarios.
   * Establece los estados de los modales "eliminado" y "confirmar eliminación" en "falso".
   * Luego, vuelve a cargar los datos de los usuarios desde el servicio.
   */
  closeModal() {
    this.modalDeleted = false;
    this.modalConfirmDelete = false;
    this.loadUsers();
  }

  /**
   * Prepara el formulario modal de confirmación de eliminación para un usuario.
   * Recupera el nombre del usuario y almacena su ID para la confirmación de eliminación.
   * @param id - El identificador único del usuario que se eliminará.
   */
  confirmDlete(id: any) {
    this.userNameModal = this.users.find((u) => u.id === id)?.name || '';
    this.userSelectionedId = id;
    this.modalConfirmDelete = true;
  }
}
