import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Products } from '../products';
@Component({
  imports: [FormsModule],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm {
  private productsService = inject(Products);

  product = {
    nome: '',
    preco: 0,
    ativo: true,
  };

  salvar() {
    this.productsService.createProduct(this.product).subscribe( () => {
      alert('Produto criado com sucesso!')
    });
  }
}
