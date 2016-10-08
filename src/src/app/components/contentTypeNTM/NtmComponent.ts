import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";



@Component({
  selector: 'ntm',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class NtmComponent {
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
