import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url ='https://identitytoolkit.googleapis.com/v1/accounts';
  private apikey = 'AIzaSyDK8sXBwlVmIZIAk7DvpXflcH_Xy3ZXrcQ';

  userToken: string;
  userNane: string;

  // Crear nuevos usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  
  // Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {
    this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel ) {
    const authData ={
      ...usuario,
      returnSecureToken: true
    };
    
    return this.http.post(
      `${ this.url }:signInWithPassword?key=${ this.apikey}`,
      authData
    ).pipe(
      map( res => {
        //console.log('Entro en el mapa del RXJS');
        this.saveToken( res['idToken'] );
        this.userNane = usuario.nombre;
        return res;
      })
    );
  }
  
  newUser( usuario: UsuarioModel ) {
    const authData ={
      ...usuario,
      returnSecureToken: true
    };
    
    return this.http.post(
      `${ this.url }:signUp?key=${ this.apikey}`,
      authData
    ).pipe(
      map( res => {
        //console.log('Entro en el mapa del RXJS');
        this.saveToken( res['idToken'] );
        return res;
      })
    );

  }

  private saveToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('Token', idToken);
    
    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString());

  }

  getToken() {
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean{
    
    if( this.userToken.length < 2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if( expiraDate > new Date()){
      return true;
    } else {
      return false;
    }

    return this.userToken.length > 2;
  }
}
