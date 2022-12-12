/* Modulos */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/* Componentes */

import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { FooterComponent } from './utils/footer/footer.component';
import { ErrorPageComponent } from './utils/error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './components/search/search.component';
import { BlogComponent } from './components/blog/blog.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { SubirFotosComponent } from './components/subir-fotos/subir-fotos.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewBlogComponent } from './components/new-blog/new-blog.component';

/* Servicios */
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { NewBlogService } from './services/new-blog.service';

/* Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

/* Otros */
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    NewBlogComponent,
    SearchComponent,
    BlogComponent,
    ErrorPageComponent,
    FotosComponent,
    SubirFotosComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [
    AuthService,
    NewBlogService,
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
