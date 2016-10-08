import {Component, ViewChild} from '@angular/core';
let vis =  require('vis');

@Component({
  selector: 'graph-component',
  template: '<div #container></div>',
  styles : [`
      :host {
          width: 550px;
          height: 550px;
      }`]
})
export class GraphComponent {

  @ViewChild('container') domContainer;

  private nodeDataset = null;
  private edgeDataset = null;
  private graph = null;

  ngOnInit() {
    // create an array with nodesDS
    this.nodeDataset = new vis.DataSet();
    this.edgeDataset = new vis.DataSet();

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
    };

    this.graph  = new vis.Network(this.domContainer.nativeElement, data, options);
  }
}
