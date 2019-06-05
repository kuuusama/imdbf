import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Movie } from './classes/movie';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private static apiKey: string = '51b13105';
  private static apiUrl: string = 'http://www.omdbapi.com/?apikey=';

  constructor(private http: HttpClient) { }

  public getMovieById(imdbId: string) : Promise<Movie> {
    return new Promise<Movie>((resolve) => {
      this.sendQuery("i=" + imdbId + "&plot=full")
        .then(result => {
          if ('True' == result.Response) {
            var movie = new Movie(result);
            resolve (movie);
          } else {
            resolve (null);
          }
        }
        )
    })
  }

  public searchByTitle(title: string) : Promise<Array<Movie>> {
    return new Promise<Array<Movie>>((resolve) => {
      this.sendQuery("s=" + title + "*&plot=short")
        .then(result => {
          if ('True' == result.Response) {
            let movies: Array<Movie> = [];
            result.Search.forEach(movie => {
              let newMovie = new Movie(movie);
              movies.push(newMovie);
            });
            resolve (movies);
          } else {
            resolve (null); 
          }
        }
        )
    })
  }

  private sendQuery(comandString: string ) : Promise<any> {
    let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'});

    let options = new RequestOptions({ headers: headers });
    let url = NetworkService.apiUrl + NetworkService.apiKey + "&" + comandString;
    url += "&callback=JSONP_CALLBACK";

    return this.http.jsonp(url,'respclb')
      .toPromise()
        .then( (res : Response) => {
          return res;
        }
        )
        .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
