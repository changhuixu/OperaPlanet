import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
    windowData = null;
    graphData = {
    nodes: [{
      "id": "node_0",
      "label": "ROOT",
      "group": "opera",
      "data": {}
    },{
      "id": "node_1",
      "label": "MUSIC",
      "group": "prm",
      "data": {}
    },{
      "id": "node_2",
      "label": "VIDEO",
      "group": "tdm",
      "data": {}
    }],
    edges : [{
      "id": "edge_0",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_1",
      "data": {

      }
    },{
      "id": "edge_1",
      "type": "related",
      "label": "",
      "from": "node_0",
      "to": "node_2",
      "data": {}
    }]
  };

  onNodeClicked(ev) {
      this.windowData = ev;
  }

}
