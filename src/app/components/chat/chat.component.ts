import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  mensaje: string = "";

  elemento: any;

  constructor( public cs: ChatService ) { 
    
    this.cs.cargarMensajes().subscribe( () => {
      
      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeigth;
      }, 20)
    });

  }

  ngOnInit() {
    
    this.elemento.document.getElementById('chat');

  }

  enviarMensaje(){
    console.log(this.mensaje);

    if( this.mensaje.length === 0) {
      return;
    }

    this.cs.agregarMensaje( this.mensaje )
    .then( () => this.mensaje = "" )
    .catch( () => console.log('Error al enviar') )

    

  }

}
