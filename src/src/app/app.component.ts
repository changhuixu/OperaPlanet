import {Component} from '@angular/core';
import {DataService} from "./services/DataService";
import {txt_1} from "./data/txt_1";
import {ntm_1} from "./data/ntm_1";
import {prm_2} from "./data/prm_2";
import {prm_1} from "./data/prm_1";
import {tdi_1} from "./data/tdi_1";
import {ParseService} from "./services/ParseService";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  active = false;
  windowData = null;
  graphData = {
    nodes: [{
      "id": "node_0",
      "label": "The Marriage of Figaro (Opera)",
      "group": "opera",
      size : 50,
      "data": {}
    },prm_1, prm_2, tdi_1, ntm_1, txt_1],
    edges: [{
      "id": "edge_0",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_1",
      "data": {}
    }, {
      "id": "edge_1",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_2",
      "data": {}
    }, {
      "id": "edge_2",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_3",
      "data": {}
    }, {
      "id": "edge_3",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_4",
      "data": {}
    }, {
      "id": "edge_4",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_5",
      "data": {}
    }, {
      "id": "edge_5",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_6",
      "data": {}
    }]
  };

  onQueryClicked() {
    this.active = true;
  }

  onNodeClicked(ev) {
    this.windowData = ev;
    console.log(ev);
  }


}
