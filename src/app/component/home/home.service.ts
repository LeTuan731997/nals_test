import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(
        private httpClient: HttpClient
    ) { }

    getAllBlog(){
        return this.httpClient.get('https://5f55a98f39221c00167fb11a.mockapi.io/blogs');
    }

    getListBlog(key: any, _page: any, _limit: any, _sort: any) {
        if (_sort) {
            return this.httpClient.get('https://5f55a98f39221c00167fb11a.mockapi.io/blogs?sortBy=title&order=desc&page=' + _page + '&limit=' + _limit);
        } else {
            return this.httpClient.get('https://5f55a98f39221c00167fb11a.mockapi.io/blogs?search=' + key + '&page=' + _page + '&limit=' + _limit);
        }
    }

    search(key: any, _page: any, _limit: any, _sort: any) {
        return this.httpClient.get('https://5f55a98f39221c00167fb11a.mockapi.io/blogs?search=' + key + '&page=' + _page + '&limit=' + _limit);
    }

    searchAll(key: any) {
        return this.httpClient.get('https://5f55a98f39221c00167fb11a.mockapi.io/blogs?search=' + key);
    }
}