import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileComponent } from '../profile/profile.component';
declare var Razorpay: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;
  wishCount: any;
  cartCount: any;
  constructor(
    private actiaved: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    // this.actiaved.paramMap.subscribe((res) => {
    //   // console.log(this.router.url);
    //   this.router.events.subscribe((res) => {
    //     console.log(this.router.url.toString());
    //   });
    // });
  }

  ngOnInit(): void {
    let wish: any = JSON.parse(localStorage.getItem('wishlist'));
    this.wishCount = wish.length < 1 ? 0 : wish.length;

    let cart: any = JSON.parse(localStorage.getItem('cart'));
    this.cartCount = cart?.cart.length < 1 ? 0 : cart?.cart.length;

    let users: any = localStorage.getItem('currentuser');

    this.user = JSON.parse(users);
  }

  logOut() {
    this.auth.logout();
  }

  wishList() {
    this.router.navigate(['/products/wish-list']);
  }

  profile() {
    this.dialog.open(ProfileComponent, {
      width: '7cm',
      height: '7cm',
      position: { right: '0', top: '8vh' },
    });
  }

  cart() {
    this.router.navigate(['products/checkout']);
  }

  options = {
    key: 'rzp_test_y54hLH3MmYGkND',
    amount: '',
    name: 'Flip Zone',
    description: 'E-Commerce',
    // "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    order_id: 'FlipZone8123',
    handler: function (response) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };
}
