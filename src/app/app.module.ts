import { Routes, RouterModule }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { HttpModule } from '@angular/http';

import { MatButtonModule,  MatCheckboxModule, MatInputModule, MatCardModule, 
  MatAutocompleteModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NetworkService } from './network.service';

import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { MovieComponent } from './movie/movie.component';
import { SearchComponent } from './search/search.component';
import { MylistComponent } from './mylist/mylist.component';

const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'movie',   component: MovieComponent },
  { path: 'list' ,   component: MylistComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    MovieComponent,
    SearchComponent,
    MylistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [NetworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
