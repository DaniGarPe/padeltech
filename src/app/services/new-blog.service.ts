import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewBlogModel } from '../models/new-blog.model';
import { finalize, map } from 'rxjs/operators';
import { FileModel } from '../models/file.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class NewBlogService {
  
  private url = 'https://padeltech-86323-default-rtdb.europe-west1.firebasedatabase.app';

  //private blogs: NewBlogModel[] = [];

  //private filePath: any;
  //private downloadURL: Observable<string>;
  
  constructor( private http: HttpClient, private storage: AngularFireStorage) { 

  }
  
  crearBlog( blog: NewBlogModel ){
    return this.http.post(`${ this.url }/blogs.json`, blog).pipe(
      map( (res: any) => {
        blog.id = res.name;
        //console.log("Esto estoy buscando: ",res.name);
        return blog;
      })
    );
  }

  actualizarBlog( blog: NewBlogModel ){

    const blogTemp = {
      ...blog
    };

    //delete blog.id;

    return this.http.put(`${ this.url }/blogs/${ blog.id }.json`, blogTemp);
  }

  getBlogById( id: string ){
    return this.http.get(`${ this.url }/blogs/${ id }.json`);
  }

  getBlogs(){
    return this.http.get(`${ this.url }/blogs.json`).pipe(
      map( res => this.crearArray(res))
    );
  }

  private crearArray( blogsObj: object ){

    const blogs: NewBlogModel[] = [];
    
    //console.log(blogsObj);

    if( blogsObj === null){
      return [];
    }

    Object.keys( blogsObj ).forEach( key => {
      
      const blog: NewBlogModel = blogsObj[key];
      blog.id = key;

      blogs.push( blog );
    })

    return blogs;
  }

  borrarBlog( id: string ){
    return this.http.delete(`${ this.url }/blogs/${ id }.json`);
  }
  
  /*
  uploadImage(image: FileModel) {
    this.filePath = `padel/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = this.storage.ref(this.filePath).getDownloadURL();
            console.log('Pasa por upload, Url: ', this.downloadURL);
            this.saveImgBD( this.filePath );
          });
        })
      ).subscribe();
  }

  saveImgBD( nombre: string ){
    console.log('Guardar ', nombre);
    return;
  }
  */






  buscarBlog( termino: string ){
    
    
    //let filtroBlogs: NewBlogModel[] = [];

    let blogs: NewBlogModel[] = [];

    //let blogs = this.http.get(`${ this.url }/blogs.json`);

    console.log("Todos los blogs: ", blogs);

    termino = termino.toLowerCase();
    
    
    for( let blog of blogs){
      let nombre = blog.titulo.toLowerCase();

      if( nombre.indexOf( termino ) >= 0 ){
        blogs.push(blog);
      }
    }

    return blogs;
    
    //let blogs = this.http.get(`${ this.url }/blogs.json`);
    
    //return this.http.get(`${ this.url }/blogs/${ termino }.json`);
  }
}
