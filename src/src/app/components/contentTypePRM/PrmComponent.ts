import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";



@Component({
  selector: 'prm',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class PrmComponent {

  @Input('content') data:any;

  @Output('closed') component_closed:EventEmitter<any> =  new EventEmitter<any>();

  constructor(){
  }
  ngOnInit() {

  }
  onBtnClicked() {
    debugger;
    this.component_closed.emit();
  }
}

/**
 * Created by Changhui on 10/8/2016.
 */
