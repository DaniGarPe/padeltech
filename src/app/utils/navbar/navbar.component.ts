import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {}

  buscarBlog( termino: string ){
    //console.log(termino);
    
    termino = termino.trim();

    if( termino.length === 0){
      return;
    }

    this.router.navigate( ['/search', termino] );
  }

}
