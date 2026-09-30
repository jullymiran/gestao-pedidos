import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Service()
export class Orders {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3333/orders';

     getOrders() {
        return this.http.get(this.apiUrl);
    }

    createOrder(data: any) {
        return this.http.post(this.apiUrl, data);
    }

    getOrder(id: any) {
        return this.http.get(this.apiUrl + '/' + id);
    }

    updateStatus(id: any, status: string) {
        return this.http.put(this.apiUrl + '/'+ id + '/status', { status });
    }
}
