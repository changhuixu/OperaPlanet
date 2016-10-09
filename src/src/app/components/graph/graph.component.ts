import {Component, ViewChild, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
import {ParseService} from "../../services/ParseService";
let vis =  require('vis');

@Component({
  selector: 'graph-component',
  template: `<div #container></div>`,
  styles: [`
      div {
          height:580px;
          background-color: azure;
          overflow: auto;
      }
  `]
})
export class GraphComponent {

  @ViewChild('container') domContainer;
  @Input('data') graphData;

  private clickTimeouts = [];

  @Output() node_clicked:EventEmitter<any> =  new EventEmitter<any>();

  private nodeDataset = null;
  private edgeDataset = null;
  private graph = null;

  constructor(private ps:ParseService) {
  }

  image(name) {
    return `./assets/imgs/${name}.png`;
  }
  buildGraph() {

    if(this.graph) {
      this.graph.destroy();
    }

    this.nodeDataset = new vis.DataSet();
    this.edgeDataset = new vis.DataSet();

    this.nodeDataset.add(this.graphData.nodes);
    this.edgeDataset.add(this.graphData.edges);

    let data = {
      nodes: this.nodeDataset,
      edges: this.edgeDataset
    };

    var options = {
      nodes: {
        scaling: {
          min: 16,
          max: 320
        },
        font: {
          size: 25,
          face: 'Droid Arabic Naskh',
          strokeWidth: 1
        }
      },
      edges: {
        color: {
          'color': '#aa0000',
          'hover': '#00aa00',
          'highlight': '#0000aa'
        },
        font: {
          size: 14,
          face: 'Droid Arabic Naskh'
        },
        selfReferenceSize: 75,
        length: 300,
        width: 0.1
      },
      interaction:{
        hover:true,
        navigationButtons: false
      },
      physics:{
        barnesHut:{
          gravitationalConstant:-15000,
          avoidOverlap:1
        },
        stabilization: {iterations:150}
      },
      groups: {
        prm: {
          shape: 'image',
          image: this.image('musicnote'),
          },
        opera: {
          shape: 'image',
          image: this.image('opera'),
          size: 250
        },
        tdm: {
          shape: 'image',
          image: this.image('camera'),
        },
        txt:{
          shape: 'image',
          image: this.image('book')
        },
        ntm:{
          shape:'image',
          image: this.image('score')
        },
        person: {
          shape: 'image',
          image: this.image('black-user-shape'),
          size: 10
        }
      }
    };

    this.graph  = new vis.Network(this.domContainer.nativeElement, data, options);

    this.graph.on('stabilized', this.onGraphReady.bind(this));
    this.graph.on('hoverNode', this.onNodeHover.bind(this));
    this.graph.on('click', this.onGraphClicked.bind(this));
    this.graph.on('doubleClick', this.onGraphDoubleClicked.bind(this));




  }

  onGraphReady(event) {
    //console.log(event);
  }

  onNodeHover(event) {


  }

  onGraphDoubleClicked(data) {

    for(let to of this.clickTimeouts) {
      clearTimeout(to);
    }

    let node = null;
    if(data.nodes.length != 0) {
      node = this.nodeDataset.get(data.nodes[0]);
    }

    if(node == null) {
      return;
    }

    if(node.group == 'opera' || node.group == 'person') {
      return;
    }
    let persons = null;
    if(node.data.relatedPersons) {
      persons = node.data.relatedPersons;
      console.log(persons);
    } else {
      let temp = this.ps.aggregate(node.data);
      persons = temp['bf:Person'];
    }

    if(!persons) {
      return;
    }

    for(let person of persons) {
      let id = person['@id'].split('/').pop();
      try {
        this.nodeDataset.add({
          "id": "node_" + id,
          "label": person['rdfs:label'],
          "group": "person",
          "data": {
            'person': person,
            'link': person['@id']
          }
        });
      } catch(e) {
      }
      try{
        let edgeId = node.id + '-' + id;
        this.edgeDataset.add({
          "id": edgeId,
          "type": "related",
          "label": "Contributed to",
          "from": "node_" + id,
          "to": node.id,
        });
      } catch(e) {
        //Node or edge exists, never mind
      }
    }
  }

  onGraphClicked(data) {
    let that = this;

    this.clickTimeouts.push(setTimeout(function(){
      that.clickTimeouts = [];

      if(data.nodes.length != 0) {
        let node = that.nodeDataset.get(data.nodes[0]);
        let edges = [];
        for(let e of data.edges) {
          edges.push(that.edgeDataset.get(e));
        }
        that.onNodeClicked(node, edges);
        return;
      }
      if(data.edges.length != 0) {
        that.onEdgeClicked(that.edgeDataset.get(data.nodes[0]));
        return;
      }
    }, 300));
  }

  onNodeClicked(node, edges) {
    if(node.group == 'opera') {
      return;
    }

    if(node.group == 'person') {
      window.open(node.data.link);
      return;
    }

    this.node_clicked.emit({
      "node": node,
      "edges": edges
    });
    //console.log(node, edges);
  }

  onEdgeClicked(edge) {
    //console.log(edge);
  }

  ngOnInit() {
    if(this.graphData) {
      this.buildGraph();
    }
  }
}
