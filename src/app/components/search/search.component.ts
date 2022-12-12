import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewBlogService } from '../../services/new-blog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  blogs: any[] = [];
  termino: string;

  constructor( private activeRoute: ActivatedRoute, private blogService: NewBlogService ) { }

  ngOnInit() {
    
    this.activeRoute.params.subscribe( params => {
      this.termino = params['termino'];
      this.blogs = this.blogService.buscarBlog( params['termino'] );
      console.log("esto buscas: ", this.blogService.buscarBlog( params['termino'] ));
      console.log( this.blogs );
    });
  }

}
