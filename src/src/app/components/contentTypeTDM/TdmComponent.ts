import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
import {TDM, Person} from "../../models/tdm";
import {DataService} from "../../services/DataService";
import {ParseService} from "../../services/ParseService";
import {Observable} from "rxjs";



@Component({
  selector: 'tdm',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class TdmComponent {
  title = 'app works!';

  model:TDM = null;

  @Input('content') data:any;
  @Output('closed') component_closed:EventEmitter<any> =  new EventEmitter<any>();

  private work:any = null;
  private entryList:any[] = [];

  private imdbData:Observable<any>;
  private uiowaLink;
  private worldCatLink;

  constructor(private ds:DataService, private ps:ParseService) {

  }

  onQueryComplete(x) {
    console.log(arguments);
  }

  ngOnInit() {

    this.work = this.ps.getWork(this.data.work_id, this.data.data);
    console.log(this.work);

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

    /*
    let worldcatEntry = {
      "title": "WorldCat Resource",
      "data": [{
        "link":     this.data['genont:ContentTypeGenericResource'][0]['@id'],
        "text":     this.data['genont:ContentTypeGenericResource'][0]['@id']

      }]
    };
    */
   }


  onBtnClicked() {
    this.component_closed.emit();
  }



}

/**
 * Created by Changhui on 10/8/2016.
 */
