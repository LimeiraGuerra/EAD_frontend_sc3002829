import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../Product';
import { WebService } from '../web.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() isModalActive: boolean;
  @Input() selectedProduct: Product;
  @Output() modalControl = new EventEmitter<boolean>();
  @Output() hasChanges = new EventEmitter<boolean>();

  formCadastro: FormGroup;

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges() {
    this.initForm();
}

  private initForm() {
    this.formCadastro = new FormGroup({
      titulo: new FormControl(this.selectedProduct?.titulo || null, [Validators.required, Validators.minLength(2)]),
      descricao: new FormControl(this.selectedProduct?.descricao || null, [Validators.required, Validators.minLength(2)]),
      preco: new FormControl(this.selectedProduct?.preco || null, [Validators.required, Validators.min(0)]),
      vegano: new FormControl(this.selectedProduct?.vegano || false),
    });
  }

  onSubmit(): void {
    if(this.formCadastro.valid) {
      const product = {
        titulo: this.formCadastro.get('titulo').value,
        descricao: this.formCadastro.get('descricao').value,
        preco: this.formCadastro.get('preco').value,
        vegano: this.formCadastro.get('vegano').value,
      }
      if (this.selectedProduct) {
        product['_id'] = this.selectedProduct._id;
        this.edit(product);
      }
      else {
        this.register(product);
      }
    }
  }

  register(product: object): void {
    this.web.registerProduct(product).subscribe(res => {
      if(res.ok == true) {
        alert("O cadastro foi realizado com sucesso");
        this.hasChanges.emit(true);
        this.toggleModal(false);
      }
      else {
        alert("O cadastro não foi realizado");
      }
    });
  }

  edit(product: object): void {
    this.web.updateProduct(product).subscribe(res => {
      if(res.ok == true) {
        alert("A edição foi realizado com sucesso");
        this.hasChanges.emit(true);
        this.toggleModal(false);
      }
      else {
        alert("A edição não foi realizado");
      }
    });
  }

  toggleModal(state: boolean) {
    this.modalControl.emit(state);
    this.initForm();
  }

}
