import { Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { CartComponent } from './pages/cart/cart.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
]
