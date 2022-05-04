import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // url
  url: string = 'http://localhost:3000/users';

  public hasLoggedIn = new BehaviorSubject(false);

  public loggedVar = this.hasLoggedIn.asObservable();

  constructor(
    private router: Router,
    private toaster: MatSnackBar,
    private http: HttpClient
  ) {}

  public login() {
    return this.loggedVar;
  }

  signIn(data: any) {
    let users: any = localStorage.getItem('users');
    let user = JSON.parse(users);

    const navi = user.some(
      (ele: any) =>
        ele.username == data.username && ele.password == data.password
    );

    console.log(navi);
    if (navi) {
      this.hasLoggedIn.next(true);
      localStorage.setItem('currentuser', JSON.stringify(data.username));
      let obj = { cart: [] };
      localStorage.setItem('cart', JSON.stringify(obj));
      localStorage.setItem('wishlist', '[]');
      localStorage.setItem('logged', 'true');
      this.router.navigate(['/products']);
      this.toaster.open('Logged in successfully', '', { duration: 500 });
    } else {
      this.hasLoggedIn.next(false);
      this.router.navigate(['/']);
      localStorage.setItem('logged', 'false');
      this.toaster.open('Please enter valid username or password', '', {
        duration: 500,
      });
    }
  }

  logout() {
    this.hasLoggedIn.next(false);
    this.router.navigate(['/']);
    localStorage.removeItem('currentuser');
    localStorage.setItem('logged', 'false');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
  }

  registerUser(data: any) {
    let old: any = localStorage.getItem('users');
    let oldUsers: any = JSON.parse(old);
    let navi: Observable<boolean> = oldUsers.some(
      (ele: any) => ele.username == data.name
    );
    if (navi) {
      this.toaster.open('Name you have entered is already a user', '', {
        duration: 1000,
      });
      this.router.navigate(['/']);
    } else {
      let obj = {
        username: data.name,
        password: data.password,
        mobile: data.mobile,
        dob: data.dob,
        add: 'Dubai kurukku santhu,Dubai main road,Dubai',
      };
      oldUsers.push(obj);
      localStorage.setItem('users', JSON.stringify(oldUsers));
      // localStorage.setItem('registered', JSON.stringify(oldUsers));
      this.toaster.open('Registered sucesfully', '', { duration: 1000 });
      this.router.navigate(['/']);
    }

    return navi;
  }

  confirmUser(data: any) {
    let old: any = localStorage.getItem('users');
    let oldUsers: any = JSON.parse(old);
    let navi: Observable<any> = oldUsers.some(
      (ele: any) => ele.username == data.name
    );
    console.log(navi, 'from auth service');

    return of(navi);
  }

  resetPassword(name: any, password: any): Observable<any> {
    console.log(password, 'users');

    let old: any = localStorage.getItem('users');
    let oldUsers: any = JSON.parse(old);
    let index: any = oldUsers.findIndex(
      (ele: any) => ele.username == name.name
    );
    oldUsers[index].password = password.confirm;
    console.log(index, oldUsers);
    localStorage.setItem('users', JSON.stringify(oldUsers));
    let msg = 'Upadted successfully ';
    return of(true);
  }

  // from db.json

  registeruser(data: any) {
    return this.http.post(this.url, data);
  }
}
