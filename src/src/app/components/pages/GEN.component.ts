import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
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

  private uiowaLink;
  private worldCatLink;
  private
  constructor(private ds:DataService, private ps:ParseService) {

  }

  ngOnInit() {

    this.work = this.ps.getWork(this.data.work_id, this.data.data);
    console.log(this.work);
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
