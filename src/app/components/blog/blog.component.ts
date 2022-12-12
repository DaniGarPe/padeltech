import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewBlogModel } from 'src/app/models/new-blog.model';
import { AuthService } from 'src/app/services/auth.service';
import { NewBlogService } from 'src/app/services/new-blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  nuevoBlog = new NewBlogModel();

  constructor( private auth: AuthService, private blogService: NewBlogService, private route: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ){
      this.blogService.getBlogById( id ).subscribe( (res: NewBlogModel) => {
        //console.log(res);
        this.nuevoBlog = res;
        this.nuevoBlog.id = id;
      });
    }
  }

}
