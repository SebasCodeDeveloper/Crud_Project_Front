import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });

    if (this.id) {
      this.userService.getUser(this.id).subscribe((user) => {
        this.form.patchValue(user);
      });
    }
  }


  save() {
    const nombreUsuario = this.form.value.name;
    if (this.id) {
      this.userService.updateUser(this.id, this.form.value).subscribe(() => {
        this.userNameModal = nombreUsuario; 
        this.modalSaved = true;
      });
    } else {
      this.userService.createUser(this.form.value).subscribe({
        next: () => {
          this.userNameModal = nombreUsuario; 
          this.createModal = true;
        },
        error: (err) => {
          console.error('Error creating user:', err);
        },
      });
    }
  }
}
