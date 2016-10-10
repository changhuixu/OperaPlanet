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

  private entryList:any[] = [];

  private imdbData:Observable<any>;
  private uiowaLink;

  constructor(private ds:DataService, private ps:ParseService) {

  }

  onQueryComplete(x) {
    console.log(arguments);
  }

  ngOnInit() {
    this.data = this.ps.aggregate(this.data);
    if(this.data['schema:Movie']) {
      let d = this.data['schema:Movie'][0];
      let id = d['@id'].split('/').pop();
      this.imdbData = this.ds.queryIMDB(id);
    }

    let d = this.data['bf:ThreeDimensionalObject'][0]['wdsr:describedby'];
    for(let x of d) {
      let id = x['@id'];

      if(id.indexOf('uiowa') != -1) {
        this.uiowaLink = id;
      }
    }

    let targets = [
      "bf:Title",
      "bf:Organization",
      "bf:Topic",
      "bf:GenreForm",
      "bf:VideorecordingNumber",
      "bf:Content",
      "bf:language",
      "bf:Carrier",
      "bf:ShelfMark",
      "bf:AccessPolicy",
    ];

    for(let i of targets) {

      let title = i.replace('bf:', '');
      let entry = {
        "title": title,
        "data": []
      };
      let list = this.data[i];
      for(let l of list)  {
        let link = l['@id'];
        let label = l['rdfs:label'];
        if(!label) {
          label = l['rdf:value']
        }
        if( l['@id'].indexOf('http') == -1) {
          //label += " (" + l['@id'] + ")";
          link = null;
        }

        entry.data.push({
          "link": link,
          "text": label
        });
      }
      this.entryList.push(entry);
    }

  }


  onBtnClicked() {
    this.component_closed.emit();
  }



}

/**
 * Created by Changhui on 10/8/2016.
 */
