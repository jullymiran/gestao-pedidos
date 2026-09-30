import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class Products {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3333/products';

    getProducts() {
        return this.http.get(this.apiUrl);
    }

    createProduct(data: any) {
        return this.http.post(this.apiUrl, data);
    }

    getProduct(id: any) {
        return this.http.get(this.apiUrl + '/' + id)
    }
    
    updateProduct(id: any, data: any) {
        return this.http.put(this.apiUrl + '/' + id, data)
    }
}


