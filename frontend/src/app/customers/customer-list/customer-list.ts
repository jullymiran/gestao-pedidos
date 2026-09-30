import { Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customers } from '../customers';

@Component({
  imports: [FormsModule],
  selector: 'app-customer-list',
  styleUrl: './customer-list.css',
  templateUrl: './customer-list.html',
})
export class CustomerList implements OnInit {
  private customersService = inject(Customers);
  private cdr = inject(ChangeDetectorRef)
  customers: any[] = [];
  editandoId: number | null = null;
  editData: any = {};

  ngOnInit() {
    this.customersService.getCustomers().subscribe((data) => {
      this.customers = data as any [];
      this.cdr.detectChanges();
    });
  }

  
  

editar(customer: any) {
  this.editandoId = customer.id;
  this.editData = { nome: customer.nome, telefone: customer.telefone}
}

salvarEdicao(customer: any) {
  const atualizado = { ...customer, ...this.editData };
  this.customersService.updateCustomer(customer.id, atualizado).subscribe(() => {
    customer.nome = this.editData.nome;
    customer.telefone = this.editData.telefone;
    this.editandoId = null;
    this.cdr.detectChanges()
  });
  
}
cancelarEdicao() {
  this.editandoId = null;
}
  
}

