import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CreateCardPageComponent } from './pages/create-card-page/create-card-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManageCardPageComponent } from './pages/manage-card-page/manage-card-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReviewCardPageComponent } from './pages/review-card-page/review-card-page.component';
import { OrganisationPageComponent } from './pages/organisation-page/organisation-page.component';
import { ManageOrganisationPageComponent } from './pages/manage-organisation-page/manage-organisation-page.component';
import { PaymentsComponent } from './pages/payment-page/payments.component';
import { CguPageComponent } from './pages/cgu-page/cgu-page.component';
import { PolitiqueConfidentialiteComponent } from './pages/politique-confidentialite/politique-confidentialite.component';
import { MonCompteComponent } from './pages/mon-compte/mon-compte.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'card',
    children: [
      {
        path: 'create',
        component: CreateCardPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage',
        component: ManageCardPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'review',
        component: ReviewCardPageComponent,
        canActivate: [AuthGuard],
      }
    ],
  },
  {
    path: 'organisation',
    children: [
      {
        path: 'create',
        component: OrganisationPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage',
        component: ManageOrganisationPageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'payments/:statut', component: PaymentsComponent, canActivate: [AuthGuard] },
  {
    path: 'cgu',
    component: CguPageComponent
  },
  {
    path: 'policy',
    component: PolitiqueConfidentialiteComponent
  },
  {
    path: 'account',
    component:  MonCompteComponent
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
