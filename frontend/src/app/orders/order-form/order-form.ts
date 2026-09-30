import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Orders } from '../orders';
import { Products } from '../../products/products';
import { Customers } from '../../customers/customers';

@Component({
  imports: [FormsModule],
  selector: 'app-order-form',
  styleUrl: './order-form.css',
  templateUrl: './order-form.html',
})
export class OrderForm  implements OnInit{
  private ordersService = inject(Orders);
  private productsService = inject(Products);
  private customersService = inject(Customers);
  private cdr = inject(ChangeDetectorRef);

  customers: any[] = [];
  products: any[] = [];

  customerId: any = null;
  selectedProductId: any = null;
  selectedQuantidade: number = 1;
  itensPedido: any[] = [];

  ngOnInit() {
    this.customersService.getCustomers().subscribe((data) => {
      this.customers = data as any[];
      this.cdr.detectChanges();
    });

    this.productsService.getProducts().subscribe((data) => {
      this.products = (data as any[]).filter((p) => p.ativo);
      this.cdr.detectChanges();
    });
  }

  get total() {
    return this.itensPedido.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  }

  adicionarItem() {
    const produto = this.products.find((p) => p.id == this.selectedProductId);
    if(!produto)
      return;
    
    this.itensPedido.push({
      product_id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: this.selectedQuantidade,
    });

    this.selectedProductId = null;
    this.selectedQuantidade = 1;

  }

  removerItem(index: number) {
    this.itensPedido.splice(index, 1);
  }

  salvar() {
    if(!this.customerId || this.itensPedido.length === 0) {
      alert('Selecione um cliente e adicione ao menos um produto')
      return;
    }

    const payload = {
      customer_id: this.customerId,
      produtos: this.itensPedido.map((item) => ({
        product_id: item.product_id,
        quantidade: item.quantidade,
      }))
    };

    this.ordersService.createOrder(payload).subscribe(() => {
      alert('Pedido criado com sucesso!');
        this.itensPedido = [];
        this.customerId = null;
    })
  }

  

}
