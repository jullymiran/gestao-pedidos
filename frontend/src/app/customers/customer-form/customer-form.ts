import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customers } from '../customers';


@Component({
  imports: [FormsModule],
  selector: 'app-customer-form',
  styleUrl: './customer-form.css',
  templateUrl: './customer-form.html',
})
export class CustomerForm {
  private customersService = inject(Customers);

  customer = {
    nome: '',
    telefone: '',
  };

  salvar() {
    this.customersService.createCustomer(this.customer).subscribe( () => {
      alert('Cliente cadastrado com sucesso!')
    });
  }
}
