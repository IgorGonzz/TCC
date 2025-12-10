import { Routes } from '@angular/router';

// IMPORTE AQUI (Para que o VS Code e o AppModule resolvam a tipagem)
import { HomeComponent } from './home/home';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { ScoreboardComponent } from './scoreboard/scoreboard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: '**', redirectTo: '' }
];