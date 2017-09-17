import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataService} from "../../services/DataService";
import {ParseService} from "../../services/ParseService";


@Component({
  selector: 'general-page',
  templateUrl: './GEN.template.html',
  styleUrls: ['./style.css']
})
export class GeneralPageComponent {

  @Input('content') data:any;
  @Output('closed') component_closed:EventEmitter<any> =  new EventEmitter<any>();

  private work:any = null;
  private collection_id:string=null;

  private apiData:any = null;
  private uiowaLink;
  private worldCatLink;

  constructor(private ds:DataService, private ps:ParseService) {

  }

  ngOnInit() {

    this.collection_id = this.data.collection_id;
    this.work = this.ps.getWork(this.data.work_id, this.data.data);

    let d = this.work['wdsr:describedby'];
    for(let x of d) {
      let id = x['@id'];
      if(id.indexOf('uiowa') != -1) {
        this.uiowaLink = id;
      }
      if(id.indexOf('worldcat') != -1) {
        this.worldCatLink = id;
      }
    }


    if(this.work['owl:sameAs']) {
      let id = this.work['owl:sameAs']['@id'].split('/').pop();
      this.apiData = {
        'type': 'imdb',
        'content': this.ds.queryIMDB(id)
      }
    }

    if(this.work['owl:sameAs']) {
      let id = this.work['owl:sameAs']['@id'].split('/').pop();
      this.apiData = {
        'type': 'imdb',
        'content': this.ds.queryIMDB(id)
      }
    }

    if(this.work['schema:albumRelease']) {
      let id = this.work['schema:albumRelease']['@id'].split('/').pop();
      this.apiData = {
        'type': 'musicbrainz',
        'content': this.ds.queryMusicBrainz(id)
      }

    }

  }

  onBtnClicked() {
    this.component_closed.emit();
  }



}

/**
 * Created by Changhui on 10/8/2016.
 */
