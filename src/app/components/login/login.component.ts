import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario: UsuarioModel = new UsuarioModel;

  recordarme = false;

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if( localStorage.getItem('email') ){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login( form: NgForm){
    
    if( form.invalid) { return; }

    //console.log(this.usuario);

    //console.log(form);
    
    this.auth.login( this.usuario ).subscribe( res => {
      console.log(res);
      this.router.navigateByUrl('/admin');
      
      if( this.recordarme ){
        localStorage.setItem('email', this.usuario.email);
      }

    }, (err) => {
      console.log(err.error.error.message);
    });

  }

}
