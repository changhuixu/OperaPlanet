
import {Http, Headers, Response} from "@angular/http";
import {Injectable, Inject, EventEmitter, Output} from "@angular/core";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import {relator_lookup} from "../loc_lookup/relators";


class Relationship {

    from:string;
    to:string;
    type:string;
    title:string;
    verb:string;

}

class Parser {

    private workId:string;
    private relationship:Relationship[];
    private lookupTable:any = {};
    private work:any = null;
    private instances:any = [];

    public get() {
        return this.work;
    }
    private read(json) {
        for(let section of json) {
            if('@id' in section) {
                this.lookupTable[section['@id']] = section;
            }
        }
    }



    private unfold(json) {

        let data = {};

        json = JSON.parse(JSON.stringify(json));
        let ignoreList = ['@id', '@type', 'bf:hasItem', 'bf:instanceOf', 'items', 'bf:itemOf', 'bf:hasInstance'];
        let nsRawList = ['sko', 'wdsr', 'owl', 'skos', 'schema'];
        let keys = Object.keys(json);

        for(let k of keys) {

            if(ignoreList.indexOf(k) != -1) {
                data[k] = json[k];
                continue;
            }

            let keyParts = k.split(':');
            if(keyParts.length != 2 || nsRawList.indexOf(keyParts[0]) != -1) {
                data[k] = json[k];
                continue;
            }

            let ns = keyParts[0];
            if(!(ns in data)) {
                data[ns] = [];
            }

            if(Array.isArray(json[k])) {
                let p = {
                    "title": k,
                    "data": []
                };
                for (let x in json[k]) {
                    let id = json[k][x]['@id'];
                    if(id) {
                        p.data.push(this.lookupTable[id]);
                    } else {
                        p.data.push({
                            "@id": "",
                            "@type": "bf:literal",
                            "rdfs:label": json[k][x]
                        });
                    }
                    //json[k][x] = this.lookupTable[json[k][x]['@id']];
                }
                data[ns].push(p);
            } else if(json[k] instanceof Object) {
                let p = {
                    "title": k,
                    "data": this.lookupTable[json[k]['@id']]
                };
                data[ns].push(p);
            } else {
                let p = {
                    "title": k,
                    "data": {
                        "@id": "",
                        "@type": "bf:literal",
                        "rdfs:label": json[k]
                    }
                };
                data[ns].push(p);
            }
        }
        return data;
    }

    private resolve(id, json) {
        let results = [];
        if(json[id]) {
            if(!Array.isArray(json[id])) {
                json[id] = [json[id]];
            }
            for(let idx in json[id]) {
                let i = json[id][idx];
                let subid = i['@id'];
                let instance = JSON.parse(JSON.stringify(this.lookupTable[subid]));
                results.push(instance);
            }
        }
        return results;
    }

    constructor(workId:string, json:any) {

        this.workId = workId;
        this.read(json);

        this.work = this.lookupTable[workId];

        this.work.instances = this.resolve('bf:hasInstance', this.work);

        for(let idx in this.work.instances) {
            let i = this.work.instances[idx];
            this.work.instances[idx].items = this.resolve('bf:hasItem', this.work.instances[idx]);
            for(let idx2 in this.work.instances[idx].items ) {
                this.work.instances[idx].items[idx2] = this.unfold(this.work.instances[idx].items[idx2]);
            }
            this.work.instances[idx] = this.unfold(i);
        }

        this.work = this.unfold(this.work);
    }




}

@Injectable()
export class ParseService {


    public getData() {
        //TODO: Add all data loading rouitnes here
    }


    public getWork(workId, json) {
        return new Parser(workId, json).get();
    }

    private getItem(id) {

    }



    public aggregate(json) {
        let map = {};
        for(let section of json) {
            if(!section['@type']) {
                continue;
            }

            let type= section['@type'];
            if(Array.isArray(type)) {
                type = type[0];
            }
            if(!(type in map)) {
                map[type] = []
            }
            map[type].push(section);
        }
        return map;
    }


}
