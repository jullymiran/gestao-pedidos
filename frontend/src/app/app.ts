import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './products/product-list/product-list';
import { ProductForm } from './products/product-form/product-form';
import { CustomerList } from './customers/customer-list/customer-list';
import { CustomerForm } from './customers/customer-form/customer-form';
import { OrderList } from './orders/order-list/order-list';
import { OrderForm } from './orders/order-form/order-form';

@Component({
  imports: [RouterOutlet, ProductList, ProductForm, CustomerList, CustomerForm, OrderList, OrderForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('sistemaVendasFrontend');
}
