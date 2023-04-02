import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResponseService } from 'src/app/services/response.service';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/stores';
import { Store } from '@ngrx/store';
import { updateUserAction } from 'src/app/stores/user.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  user!: User;
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router,
    private response: ResponseService,
    public store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const loginData = this.loginForm.value;
    this.http.post('auth/login', loginData).subscribe({
      next: (res: any) => {
        this.response.successF('Connection OK', res.message);
        localStorage.setItem('access_token', res.body.accessToken);
        localStorage.setItem('refresh_token', res.body.refreshToken);
        this.route.navigate(['/home']);
        this.store.dispatch(updateUserAction({user : res.body.user}));
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur lors de la connexion');
      },
    });
  }
}
