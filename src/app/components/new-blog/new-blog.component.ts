import { Component, OnInit } from '@angular/core';
import { NewBlogModel } from '../../models/new-blog.model';
import { NgForm } from '@angular/forms';
import { NewBlogService } from '../../services/new-blog.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {
  
  nuevoBlog = new NewBlogModel();

  private image: any;
  
  constructor( private auth: AuthService, private blogService: NewBlogService, private router: ActivatedRoute, private route: Router ) { }

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ){
      this.blogService.getBlogById( id ).subscribe( (res: NewBlogModel) => {
        this.nuevoBlog = res;
        this.nuevoBlog.id = id;
      });
    }
  }

  guardar( form: NgForm){
    
    if(form.invalid){
      console.log("Formulario no valido");
      return;
    }

    let peticion: Observable<any>;

    if(this.nuevoBlog.id){
      peticion = this.blogService.actualizarBlog( this.nuevoBlog );
    } else {
      peticion = this.blogService.crearBlog( this.nuevoBlog );
    }

    peticion.subscribe( res => {
      alert("Se actualizó correctamente");
      this.route.navigate(['/admin']);
    });
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
    console.log('Pasa por handleImage ', this.image);
  }
}
