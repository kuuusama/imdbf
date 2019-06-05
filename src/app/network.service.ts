/* All network-related things implemented in this service */

import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Movie } from './classes/movie';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  /* OMDb API url and api key */
  private static apiKey: string = '51b13105';
  private static apiUrl: string = 'http://www.omdbapi.com/?apikey=';

  /* Using default http client */
  constructor(private http: HttpClient) { }

  /* Get movie description be imdb ID */
  /* Returns one movie description or null*/
  public getMovieById(imdbId: string) : Promise<Movie> {
    return new Promise<Movie>((resolve) => {
      /* Send query to server */
      this.sendQuery("i=" + imdbId + "&plot=full")
        .then(result => {
          if ('True' == result.Response) {
            /* If movie description found, return it */
            var movie = new Movie(result);
            resolve (movie);
          } else {
            /* Return null in case of error */
            resolve (null);
          }
        }
        )
    })
  }

  /* Search movies by title */
  /* Returns an array of movie descriptions or null */
  public searchByTitle(title: string) : Promise<Array<Movie>> {
    return new Promise<Array<Movie>>((resolve) => {
      /* Send query to server */
      this.sendQuery("s=" + title + "*&plot=short")
        .then(result => {
          if ('True' == result.Response) {
            /*  If movie descriptions found, convert it from JSON
                object to array of description objects and return it.
                In this case result object definitely have a "Search" array,
                so we can just to iterate it.
            */
            let movies: Array<Movie> = [];
            result.Search.forEach(movie => {
              let newMovie = new Movie(movie);
              movies.push(newMovie);
            });
            resolve (movies);
          } else {
            /* Return null in case of error */
            resolve (null); 
          }
        }
        )
    })
  }

  /* Send query to server side */
  private sendQuery(comandString: string ) : Promise<any> {
    /* Construct query string */
    let url = NetworkService.apiUrl + NetworkService.apiKey + "&" + comandString;
    url += "&callback=JSONP_CALLBACK";

    /* Using JSONP to avoid CORS issues */
    return this.http.jsonp(url,'respclb')
      .toPromise()
        .then( (res : Response) => {
          return res;
        }
        )
        .catch(this.handleError);
  }

  /* Function to handle error */
  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}
