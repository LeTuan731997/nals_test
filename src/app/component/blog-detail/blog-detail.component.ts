import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogDetailService } from './blog-detail.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  id: any = "";
  dataBlogDetail: any = {};
  loading: boolean = false;

  constructor(
    private router: Router,
    private blogDetailService: BlogDetailService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getBlogDetail();
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

  getBlogDetail() {
    this.loading = true;
    this.blogDetailService.getDetailBlog(this.id).subscribe((res: any) => {
      this.dataBlogDetail = res;
      this.loading = false;
    }, (error) => {
      // Do something
    })
  }
}
