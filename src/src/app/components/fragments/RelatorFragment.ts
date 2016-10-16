import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {relator_lookup} from "../../loc_lookup/relators";



@Component({
  selector: 'relator',
  template:`
      <div class="">
        <dl class="dl-horizontal">
          <dt>
            <label>
              <a href="{{content.url}}" target="_blank">{{content.text}}:</a>
            </label>
          </dt>
          <dd>
            <ul class="list-unstyled">
              <li *ngFor='let item of content["data"]' >
                <a href="" target="_blank">
                    <i class="fa fa-{{item.css}}" aria-hidden="true"></i>
                </a>
                
                <a *ngIf="item['@id']" href='{{item["@id"]}}' target="_blank">
                  {{item["rdfs:label"]}}
                </a>
                <span *ngIf="!item['@id']">
                  {{item["rdfs:label"]}}
                </span>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
`,
})
export class RelatorFragment{

  @Input('content') content;


  private toRegularForm(camelCase:string) {
    return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
  }

  ngOnInit() {

    [this.content.text, this.content.url] = relator_lookup(this.content.title.replace("relators:", ""));

    if(!Array.isArray(this.content.data)) {
      this.content.data = [this.content.data];
    }

    for(let i of this.content.data) {

      i.css = "literal";
      if(i['@type']) {
        if(Array.isArray(i['@type'])) {
          i['@type'] = i['@type'][0];
        }
        i.css = i['@type'].replace('bf:', '').toLowerCase();
      }

      if(i['@id'].indexOf('http') != 0) {
        i['@id'] = null;
      }

      if(i['rdfs:label'] instanceof Object) {
        i['rdfs:label'] = i['rdfs:label']['@value'] + " (" + i['rdfs:label']['@language'] + ")";
      }

      if(i['rdf:value']) {
        if(Array.isArray(i['rdf:value'])) {
          i['rdfs:label'] = i['rdf:value'].join(' ');
        } else {
          i['rdfs:label'] = i['rdf:value'];
        }
      }

    }
  }
}

/**
 * Created by Changhui on 10/8/2016.
 */
