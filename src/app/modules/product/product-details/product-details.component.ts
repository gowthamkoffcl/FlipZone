import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  product: any;
  rating: any;
  max: number = 5;
  suggestion: any;
  oldSugg: any;

  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private productService: ProductService,
    private toaster: MatSnackBar
  ) {
    this.activated.paramMap.subscribe((res) => {
      this.id = res.get('id');
      this.productView();
      this.getCategories();
    });
  }

  ngOnInit(): void {
    // this.productView();
    // this.getCategories();
  }

  productView() {
    this.productService.getOneProduct(this.id).subscribe((res: any) => {
      this.product = res;
      this.oldSugg = res.category;
      this.rating = Math.ceil(this.product?.rating?.rate);
      console.log(this.product, 'product', this.oldSugg);
    });
  }

  getCategories() {
    this.productService.getAllproducts().subscribe((res: any) => {
      this.suggestion = res.filter((ele: any) => {
        return ele.category == this.oldSugg && ele.id != this.product.id;
      });
      console.log(this.suggestion, 'suggested', res);
    });
  }

  navigate(data: any) {
    this.router.navigate([`products/product-details/${data}`]);
    console.log(data);
  }
}
