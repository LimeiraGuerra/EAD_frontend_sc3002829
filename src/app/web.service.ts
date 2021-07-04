import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  baseURL = "https://ead-backend-sc3002829.glitch.me/api";

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL + "/produtos");
  }

  registerProduct(product): Observable<any> {
    let body = new HttpParams();
    body = body.set("titulo", product.titulo);
    body = body.set("preco", String(product.preco));
    body = body.set("descricao", product.descricao);
    body = body.set("vegano", product.vegano);
    return this.http.post(this.baseURL + "/produtos", body, {observe: "response"});
  }

  updateProduct(product): Observable<any> {
    let body = new HttpParams();
    body = body.set("titulo", product.titulo);
    body = body.set("preco", String(product.preco));
    body = body.set("descricao", product.descricao);
    body = body.set("vegano", product.vegano);
    return this.http.put(this.baseURL + "/produtos/" + product._id, body, {observe: "response"});
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(this.baseURL + "/produtos/" + productId, {observe: "response"});
  }

  constructor(private http: HttpClient) { }
}
