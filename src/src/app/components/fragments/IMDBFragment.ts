import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'imdb',
  template:`
    <div *ngIf="imdbData">
      <h2>
        <a href="http://www.imdb.com/title/{{imdbData.imdbID}}" target="_blank">
          {{imdbData.Title}} ({{imdbData.Year}})
        </a>
      </h2>
      <img src="{{imdbData.Poster}}"  />
       <table>
          <tr><td>Runtime</td><td>{{imdbData.Runtime}}</td></tr> 
          <tr><td>Genre</td><td>{{imdbData.Genre}}</td></tr> 
          <tr><td>Director</td><td>{{imdbData.Director}}</td></tr> 
          <tr><td>Writer</td><td>{{imdbData.Writer}}</td></tr> 
          <tr><td>Language</td><td>{{imdbData.Language}}</td></tr> 
          <tr><td>IMDB Rating</td><td>{{imdbData.imdbRating}}</td></tr> 
       
      </table>
    </div>
    <div *ngIf="!imdbData">Connecting to IMDB, please wait...</div>
    `,
})
export class IMDBFragment {
 @Input('content') imdbData;
}

/**
 * Created by Changhui on 10/8/2016.
 */
