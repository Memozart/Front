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
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

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
    public store: Store<AppState>,
    private metaService: Meta,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const ogtitle: MetaDefinition = { name: 'title', property: 'og:title', content: 'Memozart - Connecte-toi pour acceder à ton outil d’apprentissage efficace' };
    const ogkeywords: MetaDefinition = { name: 'keywords', property: 'og:keywords', content: 'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,home,accueil,entreprise,login,connexion' };
    const ogdesc: MetaDefinition = { name: 'description', property: 'og:description', content: 'Prêt à explorer ton monde d’apprentissage ? Connecte-toi à Memozart et ouvre la porte à une meilleure rétention des connaissances.' };

    if (ogtitle.content) this.titleService.setTitle(ogtitle.content);
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const loginData = this.loginForm.value;
    this.http.post('auth/login', loginData).subscribe({
      next: (res: any) => {
        this.response.successF('Connexion réussie', 'Content de te revoir ! 🫡');
        localStorage.setItem('access_token', res.body.accessToken);
        localStorage.setItem('refresh_token', res.body.refreshToken);
        this.route.navigate(['/home']);
        this.store.dispatch(updateUserAction({ user: res.body.user }));
      },
      error: (err: any) => {
        this.response.errorF(err, 'Erreur lors de la connexion');
      },
    });
  }
}
