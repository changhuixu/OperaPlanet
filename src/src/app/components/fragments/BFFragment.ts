import { Component } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {language_lookup} from "../../loc_lookup/language";

@Component({
  selector: 'bf',
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
                <a href="{{item['url']}}" target="_blank">
                    <i style="background-color:gold;display: inline-block;width:5px;height:5px;"
                    class="fa fa-{{item.css}}" aria-hidden="true"></i>
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
  styles: [`

 .dl-horizontal dt {
    white-space: normal !important;
  }

.fa-language:before {
    content: "" !important;
}
`]
})
export class BFFragment {

  @Input('content') content;


  constructor() {

  }

  private toRegularForm(camelCase:string) {
    return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
  }

  private capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  ngOnInit() {

    let loc = this.content.title.replace('bf:', '');
    this.content.text = this.toRegularForm(loc);
    this.content.url = 'http://id.loc.gov/ontologies/bibframe.html#p_' + loc;

    if(!Array.isArray(this.content.data)) {
      this.content.data = [this.content.data];
    }

    for(let i of this.content.data) {
      i = i || {};
      i.css = "literal";
      if(i['@type']) {
        if(Array.isArray(i['@type'])) {
          i['@type'] = i['@type'][0];
        }
        let t = i['@type'].replace('bf:', '');
        i.css = t.toLowerCase();
        i.url = 'http://id.loc.gov/ontologies/bibframe.html#c_' + this.capitalizeFirstLetter(t);
      }

      if(i['@id'].indexOf('http') != 0) {
        i['@id'] = null;
      }

      if(i['@type'] == 'bf:Work') {
        i['rdfs:label'] = i['skos:prefLabel'];
      }


      if(i['@type'] == "bf:Identifier") {
        if(!Array.isArray(i['rdf:value'])) {
          i['rdf:value'] = [i['rdf:value']];
        }
        for(let v of i['rdf:value']) {
          if(v.indexOf('http') == 0) {
            i['@id'] = v;
          }
        }
      }


      let labelKeys = ['rdfs:label', 'rdf:label'];
      if(i['@type'] == 'bf:Note') {
        i['rdfs:label'] = `(${i["bf:noteType"]}) - ${i["rdfs:label"]}`;
        continue;
      }

      for(let labelKey of labelKeys) {
        if(i[labelKey]) {
          if(i[labelKey] instanceof Object) {
            i['rdfs:label'] = i[labelKey]['@value'] + " (" + language_lookup(i[labelKey]['@language']) + ")";
          }
        }
      }

      let valueKeys = ['rdfs:value', 'rdf:value'];
      for(let valueKey of valueKeys) {
        if(i[valueKey]) {
          if(Array.isArray(i[valueKey])) {
            i['rdfs:label'] = i[valueKey].join(' ');
          } else {
            i['rdfs:label'] = i[valueKey];
          }
        }
      }

      if(this.content.title == 'bf:identifiedBy') {
        if('bf:source' in i) {
          i['rdfs:label'] += ' (' + i['bf:source'] + ')';
        }
      }


    }

  }
}

/**
 * Created by Changhui on 10/8/2016.
 */
