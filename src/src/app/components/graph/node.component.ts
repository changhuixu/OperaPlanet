import {Component, ViewChild, ElementRef} from '@angular/core';
import {Element} from "@angular/compiler/src/ml_parser/ast";
let vis =  require('vis');

@Component({
  selector: 'edge',
  template: ''
})
export class EdgeComponent {

  constructor(private el:ElementRef) {

  }

  ngAfterViewInit() {
    const hostElem = this.el.nativeElement;
    console.log(hostElem.children);
    console.log(hostElem.parentNode);
  }

}
