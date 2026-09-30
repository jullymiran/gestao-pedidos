import { Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { Orders } from '../orders';


@Component({
  imports: [FormsModule, DatePipe],
  selector: 'app-order-list',
  styleUrl: './order-list.css',
  templateUrl: './order-list.html',
})
export class OrderList implements OnInit {
  private ordersService = inject(Orders);
  private cdr = inject(ChangeDetectorRef)
  orders: any[] = [];
 
  statusOptions = ['Pendente', 'Em preparação', 'Pronto', 'Finalizado', 'Cancelado']

  ngOnInit() {
    this.ordersService.getOrders().subscribe((data) => {
      this.orders = data as any [];
      this.cdr.detectChanges();
    });
  }

  alterarStatus(order: any, novoStatus: string) {
    this.ordersService.updateStatus(order.id, novoStatus).subscribe((response: any) => {
      if(response.message) {
        alert(response.message);
        this.cdr.detectChanges();
        return;
      }
      order.status = novoStatus;
      this.cdr.detectChanges();
    });
  }
}


