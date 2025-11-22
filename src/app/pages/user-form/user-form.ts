import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  standalone: true,
  providers: [provideAnimations()]
})
export class UserForm implements OnInit{

  form! : FormGroup;
  id ! : number | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });

    if (this.id) {
      this.userService.getUser(this.id).subscribe(user => {
        this.form.patchValue(user);
      });
    }
  }

  save() {
    if (this.id) {
      this.userService.updateUser(this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      console.log(this.form.value,"en el save del user form");
      this.userService.createUser(this.form.value).subscribe( { next: () => {
        console.log('User created successfully');
        this.router.navigate(['/users']);
      }, error: (err) => {
        console.error('Error creating user:', err);
      } } );
    }
  }
}