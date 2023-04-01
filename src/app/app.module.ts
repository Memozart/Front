import { BearerInterceptor } from './interceptors/bearer.interceptor';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CreateCardPageComponent } from './pages/create-card-page/create-card-page.component';
import { ManageCardPageComponent } from './pages/manage-card-page/manage-card-page.component';
import { ReviewCardPageComponent } from './pages/review-card-page/review-card-page.component';

import { CardComponent } from './shared/card/card.component';
import { SvgComponent } from './shared/svg/svg.component';
import { MenuComponent } from './shared/menu/menu.component';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ThemeComponent } from './shared/theme/theme.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    LandingPageComponent,
    CreateCardPageComponent,
    ManageCardPageComponent,
    ReviewCardPageComponent,
    MenuComponent,
    CardComponent,
    SvgComponent,
    ThemeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    DividerModule,
    CalendarModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    DropdownModule,
    CardModule,
    PanelModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
    ProgressBarModule,
    InputTextareaModule,
    DialogModule,
    ConfirmDialogModule,
    OverlayPanelModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerInterceptor,
      multi: true,
    },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
