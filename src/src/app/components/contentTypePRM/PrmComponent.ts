import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";



@Component({
  selector: 'prm',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class PrmComponent {

  @Input('content') data:any;

  constructor(){

  }
  ngOnInit() {

  }
  onBtnClicked() {
    this.data = null;
  }
}

/**
 * Created by Changhui on 10/8/2016.
 */
