import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { filter, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'http://localhost:3000/';

  suggestion: any;
  constructor(private http: HttpClient) {}

  getAllproducts() {
    return this.http.get(this.url + 'products');
  }

  getlimitedProducts(data: any) {
    let pagination = new HttpParams();

    // for( pagination in data){
    //   pagination[]
    // }

    Object.keys(data).forEach((ele) => {
      pagination = pagination.append(ele, data[ele]);
    });

    return this.http.get(this.url + 'products', { params: pagination });
  }

  getOneProduct(id: any) {
    return this.http.get(this.url + `products/${id}`).pipe(
      take(1),
      map((ele: any) => {
        this.suggestion = ele.category;
        console.log(this.suggestion, 'suggesstion');
        return ele;
      })
    );
  }

  suggestionCategories() {
    return this.http.get(this.url + `products`);
  }
}
