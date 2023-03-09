import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  registerForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router,
    private response : ResponseService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nameUser : ['', [Validators.required]],
      firstName : ['',[Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      passwordConfirm : ['',[Validators.required]]
    }) 
  }

  onSubmit(){
    if(this.registerForm.invalid)
    return;
    const registerData = this.registerForm.value;
    this.http.post("auth/register", registerData).subscribe({
      next : (res : any)=>{
        this.response.successF("Connection OK", res.message);
        //pas sur que j'en ai besoin
        localStorage.setItem("token", res.body);
        //pas sur de rediriger sur home mais plus sur connexion
        //this.route.navigate(['/login'])
      },
      error : (err : any)=>{
        this.response.errorF(err,"Erreur d/inscription");
      }
    })
  }

}
