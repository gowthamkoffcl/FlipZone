import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  confirmPass!: FormGroup;
  showResetForm: boolean = false;
  constructor(
    private auth: AuthService,
    private formbuiler: FormBuilder,
    private router: Router,
    private toaster: MatSnackBar,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    this.emptyForm();
  }

  emptyForm() {
    this.form = this.formbuiler.group({
      name: new FormControl('', [Validators.required]),
    });

    this.confirmPass = this.formbuiler.group({
      new: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.confirmUser(this.form.value).subscribe((res: any) => {
        if (res) {
          this.showResetForm = true;
        } else {
          this.showResetForm = false;
          this.dialogRef.close();
          this.toaster.open('No such user found', '', { duration: 1000 });
          this.router.navigate(['/register']);
        }
      });
    }
  }

  reset() {
    console.log(this.confirmPass.value, 'ts');

    this.auth
      .resetPassword(this.form.value, this.confirmPass.value)
      .subscribe((res: any) => {
        if (res) {
          this.toaster.open('Password updated successfully', '', {
            duration: 1000,
          });
          this.router.navigate(['/']);
          this.dialogRef.close();
        }
      });
  }
}
