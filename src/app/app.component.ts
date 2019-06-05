import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { MovieComponent } from './movie/movie.component';
import { Dspmode } from './classes/dspmode.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'imdbf';
  public movie = {title: "Evangelion", year: "1995", mImdbId: "1"};
  public movieList = [
    {mTitle: "Evangelion", mYear: "1995", mImdbId: "1"}, 
    {mTitle: "RaXephon",   mYear: "1999", mImdbId: "2"},
    {mTitle: "S.E. Lain",  mYear: "2000", mImdbId: "3"}
  ];
  public movieId: string = 'tt0112159';
}
