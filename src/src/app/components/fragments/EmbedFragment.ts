import {Component, Input} from '@angular/core';
import {relator_lookup} from "../../loc_lookup/relators";



@Component({
  selector: 'embed-fragment',
  template:`<iframe *ngIf="url"  frameborder="no" height="450" scrolling="no" [src]="url" width="80%"></iframe>`,
})
export class EmbedFragment{

  @Input('content') url;

}
