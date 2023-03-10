import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm! : FormGroup ;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private messageService: MessageService,
    private route: Router,
    private response : ResponseService
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  onSubmit(){
    if(this.loginForm.invalid)
      return;
    const loginData = this.loginForm.value;
    this.http.post("/auth/login", loginData).subscribe({
      next : (res : any)=>{
        this.response.successF("Connection OK", res.message);
        localStorage.setItem("token", res.body);
        this.route.navigate(['/home'])
      },
      error : (err :any)=>{
        this.response.errorF(err,"Erreur lors de la connexion");
      }
    })
    
  }
}
