import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NewBlogService } from '../../services/new-blog.service';
import { NewBlogModel } from 'src/app/models/new-blog.model';


@Component({
  selector: 'app-subir-fotos',
  templateUrl: './subir-fotos.component.html',
  styleUrls: ['./subir-fotos.component.css']
})
export class SubirFotosComponent implements OnInit {
  
  private MEDIA_STORAGE_PATH = 'padel';

  private image: any;

  file: File;
  completed = false;
  uploadPercent: Observable<number>;
  url: Observable<string>;
  filePath = File.name;
  fileRef = this.storage.ref(this.filePath);

  imgName: string;

  constructor(
    private storage: AngularFireStorage,
    private auth: AuthService, 
    private router: Router,
    private blogService: NewBlogService,
  ){}

  ngOnInit() {
  }
  
  uploadImg() {
    this.completed = false;
    const filePath = this.generateFileName( this.file.name );
    const task = this.storage.upload(filePath, this.file);

    this.uploadPercent = task.percentageChanges();

    console.log(this.file);

    task.snapshotChanges().pipe(
      finalize(() => {
        this.completed = true;
        this.url = this.storage.ref(filePath).getDownloadURL();
        console.log(this.url);
      })
    )
    .subscribe();
  }
  
  private generateFileName(name: string): string{
    return `${this.MEDIA_STORAGE_PATH}/${new Date().getTime()}_$name`;
  }

  onImgSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.imgName = this.file.name;
    }
  }
  /*
  guardar(){
    this.blogService.uploadImage( this.image );
    console.log('Pasa por Guardar, imagen: ', this.image);
  }
  */
  
  /*
  handleImage(event: any): void {
    this.image = event.target.files[0];
    console.log('Pasa por handleImage ', this.image);
  }*/
}
