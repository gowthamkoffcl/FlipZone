import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Pagination } from 'src/app/shared/pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  loading: boolean = true;
  productlist: any = [];
  pageSize: number = 3;
  pagination!: Pagination;

  @ViewChild('description') description!: ElementRef;
  show: boolean;
  constructor(
    private productService: ProductService,
    private router: Router,
    private toaster: MatSnackBar
  ) {
    this.pagination = new Pagination();
  }

  ngOnInit(): void {
    this.allProducts();
  }

  allProducts() {
    this.productService.getAllproducts().subscribe((result: any) => {
      if (result.length < 0) {
        this.loading = true;
      } else {
        this.loading = false;
        this.productlist = result.map((ele) => ({ ...ele, fav: false }));
      }
    });
  }
  public more: boolean = true;
  public less: boolean = false;

  showMore(data: any) {
    // alert(data.id);
    this.router.navigate(['products/product-details', data.id]);
    console.log(data, 'navigaet ');
  }

  dontScroll: boolean = false;

  onScroll() {
    console.log('scrolled');
    if (this.dontScroll) {
      this.getProductsLimit();
    }
  }

  getProductsLimit() {
    // this.pagination.limit = this.pageSize++;
    // this.productService
    //   .getlimitedProducts(this.pagination)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     // this.productlist = res;
    //   });
  }

  addTowishList(product: any) {
    let index = this.productlist.findIndex((ele) => ele.id == product.id);
    let wish: any = JSON.parse(localStorage.getItem('wishlist'));
    let some = wish.some((ele) => ele?.id == product?.id);
    console.log(some, 'for some');

    if (some) {
      let index = wish.findIndex((ele) => ele.id == product.id);
      wish.splice(index, 1);
      localStorage.setItem('wishlist', JSON.stringify(wish));
    } else {
      wish.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wish));
      console.log(wish, 'for local storage');
    }
    if (product.fav == true) {
      this.productlist[index].fav = false;
      this.show = false;
    } else {
      this.productlist[index].fav = true;
      this.show = true;
    }
  }

  visibleIndex = -1;
  showSubItem(ind) {
    console.log(ind, 'index');
  }

  addTocart(product: any) {
    const ca: any = localStorage.getItem('cart');
    const cart = JSON.parse(ca);
    console.log(cart);
    cart.cart.push(product);
    // console.log(cart, 'added');
    this.toaster.open('Added to cart sucessfully', '', { duration: 1000 });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addNavi(product: any) {
    const ca: any = localStorage.getItem('cart');
    const cart = JSON.parse(ca);
    console.log(cart);
    cart.cart.push(product);
    // console.log(cart, 'added');
    localStorage.setItem('cart', JSON.stringify(cart));

    this.router.navigate([`products/checkout`]);
  }
}
