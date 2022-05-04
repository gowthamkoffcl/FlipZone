import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private authservice: AuthService,
    private toaster: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.emptyform(); //for the initial form;
  }
  // initial form
  emptyform() {
    this.form = this.formbuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  // submit value

  onSubmit() {
    if (this.form.valid) {
      this.authservice.signIn(this.form.value);
    } else {
      console.log('invalid');
      // this.dialog.open(LoginComponent, {
      //   width: '250px',
      // });
    }
  }

  openDialog() {
    this.dialog.open(ForgotPasswordComponent, {
      width: '500px',
      height: '600px',
    });
  }
}
