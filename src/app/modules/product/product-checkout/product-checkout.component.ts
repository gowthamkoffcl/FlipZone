import { Component, OnInit, HostListener } from '@angular/core';
declare var Razorpay: any;
import { WindowRefService } from 'src/app/service/window.service';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss'],
})
export class ProductCheckoutComponent implements OnInit {
  listProducts: any;
  forRemoval: any;
  total: any = 0;
  gst: any = 0;
  subtotal: any = 0;
  discount: number = 0;

  private window: WindowRefService;
  message: string;
  options: {
    key: string;
    amount: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    handler: (response: any) => void;
    prefill: { name: string; email: string; contact: string };
    notes: { address: string };
    theme: { color: string };
  };
  constructor() {}

  ngOnInit(): void {
    this.getItem();
    this.forSubtotal();
  }

  getItem() {
    let data = localStorage.getItem('cart');
    const cart = JSON.parse(data);
    this.forRemoval = cart.cart;
    this.listProducts = cart.cart;
  }

  removeFromCart(id: any) {
    this.forRemoval.splice(id, 1);
    let obj = { cart: this.forRemoval };
    localStorage.setItem('cart', JSON.stringify(obj));
    if (this.forRemoval.length < 1) {
      this.discount = 0.0;
      this.gst = 0.0;
      this.subtotal = 0.0;
      this.total = 0.0;
    }
    this.discount = 0.0;
    this.gst = 0.0;
    this.subtotal = 0.0;
    this.total = 0.0;
    this.forSubtotal();
  }

  forSubtotal() {
    this.forRemoval.forEach((ele) => {
      this.subtotal = this.subtotal + ele?.price;
      return this.subtotal;
    });
    this.forGst();
  }

  forGst() {
    this.gst = Math.ceil((this.subtotal * 14) / 100);
    console.log(this.gst);
    this.grantotal();
  }

  grantotal() {
    this.total = Math.ceil(this.discount + this.subtotal + this.gst);
  }
  ////RazorPay Payment gateway integration

  newPayment() {
    var angular = this;
    this.options = {
      key: 'rzp_test_eOCbMxZFFow2Bz',
      amount: '200',
      name: 'Gowtham K',
      description: 'FlipZone Ecommerce site',
      image:
        'https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg',
      order_id: '',
      handler: function (response: any) {
        angular.getPaymentres(response);
        var event = new CustomEvent('payment.success', {
          detail: response,
          bubbles: true,
          cancelable: true,
        });
   // window.dispatchEvent(event);
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

  paynow() {
    // this.options.amount = '200'; //paise
    this.options.amount = String(Math.ceil(this.total) * 100); //paise
    this.options.prefill.name = 'Gowtham';
    this.options.prefill.email = 'gowtham.k@technogenesis.in';
    this.options.prefill.contact = '9561320192';
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    // rzp1.on('payment.success', function (response: any) {
    //   //this.message = "Payment Failed";
    //   // Todo - store this information in the server
    //   console.log(response.error.code);
    //   console.log(response.error.description);
    //   console.log(response.error.source);
    //   console.log(response.error.step);
    //   console.log(response.error.reason);
    //   console.log(response.error.metadata.order_id);
    //   console.log(response.error.metadata.payment_id);
    //   //this.error = response.error.reason;
    // });

    // rzp1.on('');
  }

  getPaymentres(res: any) {
    console.log(res);
  }

  // @HostListener('window:payment.success', ['$event'])
  // onPaymentSuccess(event: any): void {
  //   this.message = 'Success Payment';
  // }
}
