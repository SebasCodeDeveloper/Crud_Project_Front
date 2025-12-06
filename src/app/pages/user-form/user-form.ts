import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-user-form',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  standalone: true,
  providers: [provideAnimations()],
})
export class UserForm implements OnInit {
  form!: FormGroup;
  id!: any;
  modalSaved = false;
  createModal = false;
  userNameModal: string = '';
  submitted = false;

  /**
   * Inicializa el componente UserForm con los servicios necesarios.
   *
   * @param fb - El servicio Angular FormBuilder para crear formularios reactivos.
   * @param route - El servicio ActivatedRoute para acceder a los parámetros de ruta.
   * @param router - El servicio Router para la navegación.
   * @param userService - El servicio UserService para las operaciones de la API relacionadas con el usuario.
   */
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  /**
   * Gancho de ciclo de vida de Angular que inicializa el componente.
   *
   * Inicializa el formulario de usuario con validadores para nombre (obligatorio), correo electrónico (formato de correo electrónico)
   * y contraseña (opcional). Si existe un parámetro de ruta id, obtiene los datos del usuario
   * del servicio y rellena el formulario con los valores obtenidos.
   *
   * @returns {nulo}
   */
  /**
   * Gancho del ciclo de vida de inicialización del componente angular.
   * Inicializa el formulario de usuario con reglas de validación y lo completa con datos de usuario existentes si hay una identificación presente en los parámetros de ruta.
   *
   * @comentarios
   * - Recupera la ID de usuario de los parámetros de consulta de la ruta actual
   * - Crea un grupo de formulario reactivo con campos para nombre, correo electrónico y contraseña.
   * - Si existe una ID de usuario, recupera los datos del usuario del servicio y parchea los valores del formulario.
   *
   * @returns {nulo}
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: [''],
    });

    if (this.id) {
      this.userService.getUser(this.id).subscribe((user) => {
        this.form.patchValue(user);
      });
    }
  }

  /**
   * Guarda un usuario creando uno nuevo o actualizando uno existente.
   *
   * Valida el formulario antes de guardarlo. Si el formulario no es válido, marca todos los campos como modificados y regresa antes.
   *
   * Para actualizaciones (cuando `id` existe):
   * - Llama a `userService.updateUser()` con el ID del usuario y los datos del formulario.
   * - Establece `userNameModal` con el nombre del usuario actualizado.
   * - Establece `modalSaved` como verdadero.
   *
   * Para creación (cuando `id` no existe):
   * - Llama a `userService.createUser()` con los datos del formulario.
   * - Establece `userNameModal` con el nombre del nuevo usuario.
   * - Establece `createModal` como verdadero si se realiza correctamente.
   * - Registra cualquier error que ocurra durante la creación.
   *
   * @returns {void}
   */

  save() {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.id) {
      this.userService.updateUser(this.id, this.form.value).subscribe(() => {
        this.userNameModal = this.form.value.name;
        this.modalSaved = true;
      });
    } else {
      this.userService.createUser(this.form.value).subscribe({
        next: () => {
          this.userNameModal = this.form.value.name;
          this.modalSaved = true;
        },
        error: (err) => {
          console.error('Error creating user:', err);
        },
      });
    }
  }
}
