import { Component, OnInit } from '@angular/core';
import { FileDetector } from 'selenium-webdriver';
import { NewBlogModel } from 'src/app/models/new-blog.model';
import { NewBlogService } from 'src/app/services/new-blog.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs: NewBlogModel[] = [];

  slaiders: NewBlogModel[] = [];

  constructor( private blogService: NewBlogService ) { }

  ngOnInit() {
    
    this.blogService.getBlogs().subscribe( res => {
      console.log(res);
      this.blogs = res;
    });
    
  }
}
