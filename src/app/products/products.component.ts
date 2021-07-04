import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() productsList: Product[];
  @Output() productAction = new EventEmitter<object>();

  selectProduct(product: Product): void {
    this.productAction.emit({
      product: product,
      action: 'edit'
    });
  }

  removeProduct(product: Product): void {
    this.productAction.emit({
      product: product,
      action: 'delete'
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}
