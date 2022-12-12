import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NewBlogService } from '../../services/new-blog.service';
import { NewBlogModel } from 'src/app/models/new-blog.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  blogs: NewBlogModel[] = [];
  cargando = false;

  constructor( private auth: AuthService, private router: Router, private blogService: NewBlogService ) { }

  ngOnInit() {

    this.cargando = true;
    
    this.blogService.getBlogs().subscribe( res => {
      console.log(res);
      this.blogs = res;
      this.cargando = false;
    });
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

  borrarBlog( blog: NewBlogModel , i: number){
    
    let confirmar = confirm("Esta seguro de eliminar el ${blog.titulo}");

    if(confirmar){
      this.blogs.splice(i, 1);
      this.blogService.borrarBlog( blog.id ).subscribe();
      alert("Se ha borrado correctamente");
    } else {
      //alert("Se ha borrado correctamente");
    }
  }

}
