import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {TDM, Person} from "../../models/tdm";
import {DataService} from "../../services/DataService";
import {ParseService} from "../../services/ParseService";
import {Observable} from "rxjs";



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
    <div *ngIf="!imdbData">Contacting IMDB</div>
    `,
})
export class IMDBFragment {

  model:TDM = null;
  @Input('content') imdbData;


  constructor() {

  }



}

/**
 * Created by Changhui on 10/8/2016.
 */
