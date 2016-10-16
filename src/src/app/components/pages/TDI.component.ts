import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
import {Observable} from "rxjs";
import {DataService} from "../../services/DataService";
import {ParseService} from "../../services/ParseService";



@Component({
  selector: 'tdi-page',
  templateUrl: './TDI.template.html',
  styleUrls: ['./style.css']
})
export class TDIPageComponent {

  @Input('content') data:any;
  @Output('closed') component_closed:EventEmitter<any> =  new EventEmitter<any>();

  private work:any = null;

  private imdbData:Observable<any>;
  private uiowaLink;
  private worldCatLink;

  constructor(private ds:DataService, private ps:ParseService) {}

  ngOnInit() {

    this.work = this.ps.getWork(this.data.work_id, this.data.data);

    if(this.work['owl:sameAs']) {
      let id = this.work['owl:sameAs']['@id'].split('/').pop();
      this.imdbData = this.ds.queryIMDB(id);
    }

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
   }


  onBtnClicked() {
    this.component_closed.emit();
  }



}

/**
 * Created by Changhui on 10/8/2016.
 */
