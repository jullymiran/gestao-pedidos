import { Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Products} from '../products'

@Component({
  imports: [FormsModule],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productsService = inject(Products);
  private cdr = inject(ChangeDetectorRef)
  products: any[] = [];
  editandoId: number | null = null;
  editData: any = {};

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data as any [];
      this.cdr.detectChanges();
    });
  }

  toggleAtivo(product: any) {
    const novoStatus = { ...product, ativo: !product.ativo };
    this.productsService.updateProduct(product.id, novoStatus).subscribe(() => {
      product.ativo = !product.ativo;
      this.cdr.detectChanges();
    });
  }

  


editar(product: any) {
  this.editandoId = product.id;
  this.editData = { nome: product.nome, preco: product.preco}
}

salvarEdicao(product: any) {
  const atualizado = { ...product, ...this.editData };
  this.productsService.updateProduct(product.id, atualizado).subscribe(() => {
    product.nome = this.editData.nome;
    product.preco = this.editData.preco;
    this.editandoId = null;
    this.cdr.detectChanges()
  });
  
}
cancelarEdicao() {
  this.editandoId = null;
}
  
}
