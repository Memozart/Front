import { DesignService } from 'src/app/services/design.service';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/stores';
import { Store } from '@ngrx/store';
import { updateUserAction } from 'src/app/stores/user.actions';
import { Organisation } from 'src/app/models/organisation';

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
    private messageService: MessageService,
    private route: Router,
    private response: ResponseService,
    private designService: DesignService,
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
        this.designService.currentOrganisation = res.body.currentOrganisation;
        this.route.navigate(['/home']);
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur lors de la connexion');
      },
    });
  }

  updateStore() {
    this.store.dispatch(updateUserAction({
      user: {
        _id: "01234564897798",
        currentOrganisationId: "01234564897798",
        firstName: "prenom ok",
        lastName: "nom ok",
        email: " email ok",
        currentOrganisation: {
          _id :"01234564897798",
          name : "super organisation",
        } as Organisation
      }
    }))
  }
}
