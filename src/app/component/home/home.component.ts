import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listBlogs: any = [];
  limit: number = 10;
  currentPage: any = 1;
  totalPage: any = 0;
  listPage: any = [];
  loading: boolean = false;
  sort: boolean = false;
  searchValue: any = "";
  searchCallApi: any = "";

  constructor(
    private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTotalPage();
    this.getListBlog();
  }

  getListBlog() {
    this.loading = true;
    this.homeService.getListBlog(this.searchCallApi, this.currentPage, this.limit, this.sort).subscribe((res: any) => {
      this.listBlogs = res;
      this.loading = false;
    }, (error) => {
      // Do something
    })
  }

  getTotalPage() {
    this.loading = true;
    this.homeService.getAllBlog().subscribe((res: any) => {
      this.totalPage = Math.floor(res.length / this.limit + 1);
      this.listPage = Array(this.totalPage).fill(0).map((x, i) => i);
      this.loading = false;
    }, (error) => {
      // Do something
    })
  }

  goToPage(page: number) {
    this.currentPage = page + 1;
    this.getListBlog();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.getListBlog();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage = this.currentPage + 1;
      this.getListBlog();
    }
  }

  sortBlogs() {
    this.sort = true;
    this.getListBlog();
  }

  blogDetail(id: any) {
    this.router.navigate(['/detail/' + id]);
  }

  searchBlog() {
    this.searchCallApi = this.searchValue;
    this.loading = true;
    this.homeService.searchAll(this.searchCallApi).subscribe((res: any) => {
      this.totalPage = Math.floor(res.length / this.limit + 1);
      this.listPage = Array(this.totalPage).fill(0).map((x, i) => i);
      this.loading = false;
    }, (error) => {
      // Do something
    })
    this.getListBlog();
  }
}
