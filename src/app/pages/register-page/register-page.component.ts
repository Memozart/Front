import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  registerForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router,
    private response: ResponseService,
    private metaService: Meta,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const ogtitle: MetaDefinition = { name: 'title', property: 'og:title', content: 'Memozart - Inscris-toi sur Memozart et commence à apprendre dès maintenant' };
    const ogkeywords: MetaDefinition = { name: 'keywords', property: 'og:keywords', content: 'Memozart,memozar,memo,art,mémozart,mémomzat,memozzart,cartes,revisons,apprentissage,mémorisation,répétition,apprentissage espacé,home,accueil,entreprise,inscription, register,rejoindre,' };
    const ogdesc: MetaDefinition = { name: 'description', property: 'og:description', content: 'Participe à une symphonie de connaissances en t\'inscrivant sur Memozart. Ton voyage vers l’apprentissage commence ici.' };

    if (ogtitle.content) this.titleService.setTitle(ogtitle.content);
    this.metaService.addTag(ogtitle);
    this.metaService.addTag(ogkeywords);
    this.metaService.addTag(ogdesc);

    this.registerForm = this.fb.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  ngOnDestroy() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:keywords'");
  }

  onSubmit() {
    if (this.registerForm.invalid)
      return;
    const registerData = this.registerForm.value;
    this.http.post("/auth/register", registerData).subscribe({
      next: (res: any) => {
        this.response.successF("Inscription réussie", 'Bienvenue ! Tu peux maintenant te connecter sur Memozart et commencer ton aventure ! 🤓');
        //pas sur que j'en ai besoin
        //localStorage.setItem("token", res.body);
        this.route.navigate(['/login'])
      },
      error: (err: any) => {
        this.errorMessage = "";

        if (err.error.message.includes('"email" must be a valid email')) this.errorMessage += '• Quelque chose cloche avec l\'email... 🙃\n';
        if (err.error.message.includes('"confirmPassword" must be [ref:password]')) this.errorMessage += '• Les mots de passe que tu as saisis ne coïncident pas. Assure-toi qu\'ils soient identiques. 🧐\n';
        if (err.error.message.includes('"password" length must be at least 6 characters long')) this.errorMessage += '• Ce mot de passe est tout petit ! Il doit être plus grand, avec au moins 6 caractères. 🤫\n';
        if (err.error.message.includes('E11000 duplicate key error collection: dev.users index: email_1')) this.errorMessage += '• Cette adresse email est déjà prise. 🧐\n';

        if (this.errorMessage) this.response.errorF(err, 'Erreur lors de l\'inscription', this.errorMessage);
        else this.response.errorF(err, 'Erreur d\'inscription');

      }
    })
  }

}
