import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit() {
    this.authService.register(this.form.getRawValue()).subscribe((user) => {
      localStorage.setItem('token', user.token)

      this.authService.currentUserSig.set(user)
      this.router.navigateByUrl('/home')
    })
  }
}
