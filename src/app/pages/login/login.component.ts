import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)

  form = this.fb.nonNullable.group({
    email: ['demo@angular-store.com', [Validators.required, Validators.email]],
    password: ['demo', Validators.required],
  })

  onSubmit() {
    this.authService.login(this.form.getRawValue()).subscribe((user) => {
      localStorage.setItem('token', user.token)

      this.authService.currentUserSig.set(user)
      this.router.navigateByUrl('/home')
    })
  }

  getEmailErrorMessage() {
    if (this.form.controls['email'].errors?.['required']) {
      return 'You must enter a value'
    }

    return this.form.controls['email'].errors?.['email'] ? 'Not a valid email' : ''
  }

  getPasswordErrorMessage() {
    return 'You must enter a value'
  }
}
