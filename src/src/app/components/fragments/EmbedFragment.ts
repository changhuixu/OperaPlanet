import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {relator_lookup} from "../../loc_lookup/relators";



@Component({
  selector: 'embed-fragment',
  template:`<iframe *ngIf="url"  frameborder="no" height="450" scrolling="no" [src]="url" width="80%"></iframe>`,
})
export class EmbedFragment{

  @Input('content') url;

}
