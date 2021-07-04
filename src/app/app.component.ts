import { Component } from '@angular/core';
import { Product } from './Product';
import { WebService } from './web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EAD-frontend-sc3002829';

  isModalActive: boolean = false;
  productsList: Product[];
  selectedProduct: Product;

  constructor(private web: WebService) { }

  loadAllProducts(): void {
    this.web.getAllProducts().subscribe(res => {
      this.productsList = res;
    });
  }

  updateList(hasChanges: boolean): void {
    if (hasChanges) {
      this.loadAllProducts();
    }
  }

  handleProduct(event: object): void {
    if (event['action'] === 'edit') {
      this.selectedProduct = event['product'];
      this.toggleModal(true);
    }
    else if (event['action'] === 'delete') {
      this.delete(event['product']);
    }
  }

  delete(product): void {
    this.web.deleteProduct(product._id).subscribe(res => {
      if (res.ok == true) {
        alert("O produto foi deletado com sucesso");
        this.updateList(true);
      }
      else {
        alert("O produto não foi deletado");
      }
    });
  }

  newProduct(): void {
    this.selectedProduct = null;
    this.toggleModal(true);
  }

  toggleModal(state: boolean) {
    this.isModalActive = state;
  }

  ngOnInit(): void {
    this.loadAllProducts();
  }
}
