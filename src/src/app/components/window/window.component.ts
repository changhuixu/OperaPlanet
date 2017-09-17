import {Component, Input} from '@angular/core';

@Component({
  selector: 'window-component',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent {

  @Input('data') inputData:any = null;

  onCloseClicked() {
    this.inputData = null;
  }

}
