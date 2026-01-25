import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private readonly httpClient: HttpClient) {}

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient
      .get<GetResponseProduct>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getProduct(productId: number): Observable<Product> {
    const searchUrl = `${this.baseUrl}/products/${productId}`;
    return this.httpClient.get<Product>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const url = `${this.baseUrl}/product-category`;
    return this.httpClient
      .get<GetResponseProductCategory>(url)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(query: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${query}`;
    return this.httpClient
      .get<GetResponseProduct>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
