import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewBlogComponent } from './components/new-blog/new-blog.component';
import { AuthGuard } from './guards/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { BlogComponent } from './components/blog/blog.component';
import { ErrorPageComponent } from './utils/error-page/error-page.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { SubirFotosComponent } from './components/subir-fotos/subir-fotos.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'admin'   , component: AdminComponent, canActivate: [ AuthGuard ] },
  { path: 'new-blog/:id'   , component: NewBlogComponent, canActivate: [ AuthGuard ] },
  { path: 'search/:termino'   , component: SearchComponent },
  { path: 'blog/:id'   , component: BlogComponent },
  { path: 'fotos'   , component: FotosComponent, canActivate: [ AuthGuard ] },
  { path: 'subir'   , component: SubirFotosComponent, canActivate: [ AuthGuard ] },
  { path: 'chat'   , component: ChatComponent, canActivate: [ AuthGuard ] },
  { path: ''   , component: HomeComponent },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
