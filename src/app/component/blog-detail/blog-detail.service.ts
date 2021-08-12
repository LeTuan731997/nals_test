import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class BlogDetailService {
    constructor(
        private httpClient: HttpClient
    ) {}

    getDetailBlog(id: any) {
        return this.httpClient.get('https://5f55a98f39221c00167fb11a.mockapi.io/blogs/' + id);
    }
}