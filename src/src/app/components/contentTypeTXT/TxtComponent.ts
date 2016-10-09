import { Component } from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
import {EventEmitter} from "@angular/forms/src/facade/async";



@Component({
  selector: 'txt',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class TxtComponent {
  title = 'app works!';
  @Input('content') data:any;
  @Output('closed') component_closed:EventEmitter<any> =  new EventEmitter<any>();
  constructor(){

  }
  ngOnInit() {

  }

  onBtnClicked() {
    this.component_closed.emit();
  }
}

/**
 * Created by Changhui on 10/8/2016.
 */
