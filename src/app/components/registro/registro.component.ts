import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  recordarme = false;

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel;

    //this.usuario.email = "dgarpe17@gmail.com";


  }

  onSubmit( form : NgForm){
    if(form.invalid){
      return;
    }

    //console.log('Formulario enviado');
    //console.log(this.usuario);
    //console.log(form);

    //alert("Espere por favor");

    this.auth.newUser( this.usuario ).subscribe( res => {
      console.log(res);
      
      if( this.recordarme ){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/admin');
    }, (err) => {
      console.log(err.error.error.message);
      alert("Error al registrarse" + err.error.error.message);
    });
  }


}
