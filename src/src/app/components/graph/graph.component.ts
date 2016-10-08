import {Component, ViewChild, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
let vis =  require('vis');

@Component({
  selector: 'graph-component',
  template: `<div #container></div>`
  styles: [`
      div {
          height:750px;
      }
  `]
})
export class GraphComponent {

  @ViewChild('container') domContainer;
  @Input('data') graphData;

  @Output() node_clicked:EventEmitter<any> =  new EventEmitter<any>();

  private nodeDataset = null;
  private edgeDataset = null;
  private graph = null;

  constructor() {
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
          max: 32
        },
        font: {
          size: 16,
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
          image: this.image('musicnote')
        },
        opera: {
          shape: 'image',
          image: this.image('soprano')
        },
        tdm: {
          shape: 'image',
          image: this.image('camera')
        }
      }
    };

    this.graph  = new vis.Network(this.domContainer.nativeElement, data, options);

    this.graph.on('stabilized', this.onGraphReady.bind(this));
    this.graph.on('hoverNode', this.onNodeHover.bind(this));
    this.graph.on('click', this.onGraphClicked.bind(this));



  }

  onGraphReady(event) {
    //console.log(event);
  }

  onNodeHover(event) {
    //console.log(event);
  }

  onGraphClicked(data) {
    if(data.nodes.length != 0) {
      let node = this.nodeDataset.get(data.nodes[0]);
      let edges = [];
      for(let e of data.edges) {
        edges.push(this.edgeDataset.get(e));
      }
      this.onNodeClicked(node, edges);
      return;
    }
    if(data.edges.length != 0) {
      this.onEdgeClicked(this.edgeDataset.get(data.nodes[0]));
      return;
    }
  }

  onNodeClicked(node, edges) {
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
