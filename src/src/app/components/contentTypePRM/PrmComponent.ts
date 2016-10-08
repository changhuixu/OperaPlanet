import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";



@Component({
  selector: 'prm',
  templateUrl: './prm.html',
  styleUrls: ['./prm.css']
})
export class PrmComponent {
  title = 'app works!';
  @Input('content') data:any;

  constructor(){

  }
  ngOnInit() {

  }


}

/**
 * Created by Changhui on 10/8/2016.
 */
