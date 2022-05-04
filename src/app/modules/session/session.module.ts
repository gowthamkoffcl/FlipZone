import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';

import { MaterialModule } from 'src/app/shared/material/material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
})
export class SessionModule {}
