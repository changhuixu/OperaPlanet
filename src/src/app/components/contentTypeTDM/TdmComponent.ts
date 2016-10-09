import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {TDM, Person} from "../../models/tdm";
import {DataService} from "../../services/DataService";



@Component({
  selector: 'tdm',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class TdmComponent {
  title = 'app works!';

  model:TDM = null;
  @Input('content') data:any;

  constructor(private ds:DataService) {

  }

  onQueryComplete(x) {
    console.log(arguments);
  }

  ngOnInit() {
    this.model = new TDM(this.data);

    let names = [];
    for(let p of this.model.persons) {
      names.push(p.name);
    }
    console.log(names);
    this.ds.queryDBPedia(names).subscribe(this.onQueryComplete.bind(this));
    console.log(this.model);
  }


}

/**
 * Created by Changhui on 10/8/2016.
 */
