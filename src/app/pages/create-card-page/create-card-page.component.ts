import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ResponseService } from 'src/app/services/response.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-create-card-page',
  templateUrl: './create-card-page.component.html',
  styleUrls: ['./create-card-page.component.css']
})
export class CreateCardPageComponent {

  title!: string;
  themes!: any[];
  selectedTheme!: any;
 
  createCardForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router,
    private response:  ResponseService

  ){}

  ngOnInit(){
    this.createCardForm = this.fb.group({
        question: ['',[Validators.required]],
        answer: ['',[Validators.required]],
        help:[''],
        theme:['',[Validators.required]],
        datePresentation:[''],
        
    })
  

    this.http.get("themes").subscribe({
      next: (data: any)=>{
         this.themes = data.body;
      },
      error:(error:any)=>{}
    })

        
    }


  onSubmit(){
  
  if(this.createCardForm.invalid)
    return;
  const createCardData = this.createCardForm.value;
  
  createCardData.datePresentation = new Intl.DateTimeFormat(['fr', 'fr']).format(createCardData.datePresentation);
  console.log(createCardData.datePresentation);
  console.log(createCardData);
  this.http.post("/cards", createCardData).subscribe({
        next : (res : any)=> {
          this.response.successF("Creation OK", res.message);
          this.createCardForm.reset();
        },
        error : (err : any)=>{
          this.response.errorF(err,"Erreur");
        }
  })
  }

 
  

  
  }


