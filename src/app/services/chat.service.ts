import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../models/mensaje.model';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  public usuario: any = {
    nombre: this.auth.userNane,
    uid: this.auth.userToken
  };


  constructor( 
    private afs: AngularFirestore, 
    private auth: AuthService, 
    private router: Router,
  ) { }

  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy( 'fecha', 'asc' ).limitToLast(10) );

    return this.itemsCollection.valueChanges().pipe(
      map( (mensajes: Mensaje[] ) => {
        console.log(mensajes);
        
        this.chats = mensajes;
      })
    )
  }

  agregarMensaje( texto: string ){
    let mensaje: Mensaje = {
      usuario: 'User',
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.auth.userToken
    }

    return this.itemsCollection.add( mensaje );
  }

}
