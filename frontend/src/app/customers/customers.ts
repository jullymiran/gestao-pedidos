import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class Customers {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3333/customers';

    getCustomers() {
        return this.http.get(this.apiUrl);
    }

    createCustomer(data: any) {
        return this.http.post(this.apiUrl, data);
    }

    getCustomer(id: any) {
        return this.http.get(this.apiUrl + '/' + id);
    }

    updateCustomer(id: any, data: any) {
        return this.http.put(this.apiUrl + '/'+ id, data);
    }
}
