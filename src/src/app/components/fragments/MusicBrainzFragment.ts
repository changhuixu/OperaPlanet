import {Component, Input} from '@angular/core';

@Component({
  selector: 'musicbrainz',
  template:`


    <div *ngIf="data">
      <h2>
        <a href="https://musicbrainz.org/release/{{data.id}}" target="_blank">
          {{data.title}} - {{data.date}} ({{data.country | lookup:'country'}})
        </a>
      </h2>
       <table>
          <tr><td>Album Packaging</td><td>{{data.packaging}}</td></tr> 
          <tr><td>Status</td><td>{{data.status}}</td></tr> 
          <tr><td>Data Quality</td><td>{{data.quality}}</td></tr> 
      </table>
      <sub>Data from Musicbrainz.org</sub>
    </div>
    <div *ngIf="!data">Contacting Musicbrainz.org</div>
    `,

    styles: [`
        table td {
            padding-right: 10px;
        }
    `]

})
export class MusicBrainzFragment {
 @Input('content') data;
}

/**
 * Created by Changhui on 10/8/2016.
 */
