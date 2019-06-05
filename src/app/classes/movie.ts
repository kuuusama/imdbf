/* Movie object class */
import { Rating } from './rating';

export class Movie {
    mTitle   : string;
    mYear    : string;
    mRated   : string;
    mReleased: string;
    mRuntime : string;
    mGenre   : string;
    mDirector: string;
    mWriter  : string;
    mActors  : string;
    mPlot    : string;
    mLanguage: string;
    mCountry : string;
    mAwards  : string;
    mPoster  : string;
    mRatings : Array<Rating>
    mMetascore    : string;
    mImdbRating   : string;
    mImdbVotes    : string;
    mImdbID       : string;
    mType         : string;
    mTotalSeasons : string;

    /* Create object using json result object from server */
    constructor (jsonObject) {
        this.mTitle    = jsonObject.Title;
        this.mYear     = jsonObject.Year;
        this.mRated    = jsonObject.Rated;
        this.mReleased = jsonObject.Released;
        this.mRuntime  = jsonObject.Runtime;
        this.mGenre    = jsonObject.Genre;
        this.mDirector = jsonObject.Director;
        this.mWriter   = jsonObject.Writer;
        this.mActors   = jsonObject.Actors;
        this.mPlot     = jsonObject.Plot;
        this.mLanguage = jsonObject.Language;
        this.mCountry  = jsonObject.Country;
        this.mAwards   = jsonObject.Awards;
        this.mPoster   = jsonObject.Poster;
        this.mRatings    = jsonObject.Ratings;
        this.mMetascore  = jsonObject.Metascore;
        this.mImdbRating = jsonObject.imdbRating;
        this.mImdbVotes  = jsonObject.imdbVotes;
        this.mImdbID = jsonObject.imdbID;
        this.mType   = jsonObject.Type;
        this.mTotalSeasons = jsonObject.totalSeasons;
    }
}
