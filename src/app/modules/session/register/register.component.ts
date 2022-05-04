import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private toaster: MatSnackBar,
    private authservice: AuthService,
    private productesrvice: ProductService
  ) {}

  ngOnInit(): void {
    this.emptyForm();
  }

  emptyForm() {
    this.form = this.formbuilder.group({
      name: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  register() {
    if (this.form.valid) {
      this.authservice.registerUser(this.form.value).subscribe((res) => {
        if (res) {
          this.form.reset();
        }
      });
    } else {
      console.log('invalid');
    }
  }

  newRegister() {
    if (this.form.valid) {
      this.authservice.registeruser(this.form.value).subscribe((res: any) => {
        // console.log(res)
        this.toaster.open('User created successfully', '', { duration: 1000 });
      });
    }
  }
}
