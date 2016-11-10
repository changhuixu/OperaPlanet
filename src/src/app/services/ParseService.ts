
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
                this.lookupTable[section['@id']] = JSON.parse(JSON.stringify(section));
            }
        }
    }
    
    private lookup(id) {
        if(id in this.lookupTable) {
           return this.lookupTable[id];
        }
        
        return {
            '@id' : id,
            'rdfs:label' : id
        }
    }


    private unfold(json) {

        let data = {};

        json = JSON.parse(JSON.stringify(json));

        let ignoreList = ['bf:provisionActivity', '@id', '@type', 'bf:hasItem', 'bf:instanceOf', 'items', 'bf:itemOf', 'bf:hasInstance'];
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
                        p.data.push(this.lookup(id));
                    } else {
                        p.data.push({
                            "@id": "",
                            "@type": "bf:literal",
                            "rdfs:label": json[k][x]
                        });
                    }
                    //json[k][x] = this.lookup(json[k][x]['@id']];
                }
                data[ns].push(p);
            } else if(json[k] instanceof Object) {
                let p = {
                    "title": k,
                    "data": this.lookup(json[k]['@id'])
                };

                if(k == 'bf:classification') {
                    let e = this.lookup(json[k]['@id']);
                    let l = null;
                    if( 'bf:classificationNumber' in e ) {
                         l = e['bf:classificationNumber'];
                    } else {
                        l = e['rdfs:label'];
                    }
                    p = {
                        "title": k,
                        "data": {
                            "@id": e['@id'],
                            "rdfs:label": l
                        }
                    };
                }

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
                let instance = JSON.parse(JSON.stringify(this.lookup(subid)));
                results.push(instance);
            }
        }
        return results;
    }

    private rearrangeFormFields(fields) {
        fields.sort((a, b) => {
            let last = [];


            let first= [
                'bf:title',
                'bf:Title',
                'bf:WorkTitle',
                'bf:heldBy',
                'bf:subLocation',
                'bf:physicalLocation',
                'bf:shelfMarkLcc',
                'bf:barcode',
                'bf:usageAndAccessPolicy',
                'bf:status',
                'bf:instanceTitle',
                'bf:provisionActivityStatement',
                'bf:extent',
                'bf:dimensions',
                'bf:genreForm',
                'bf:media',
                'bf:carrier',
                'bf:note',
                'bf:identifiedBy',
                'bf:content',
                'bf:translationOf',
                'bf:relatedTo',
                'bf:subject',
                'bf:language',
                'bf:contributor'
            ];

            //debugger;
            a = a['title'];
            b = b['title'];

            for(let key of last) {
                if(a == key) { return 1; }
                if(b == key) { return -1 }
            }

            for(let key of first) {
                if(a == key) { return -1; }
                if(b == key) { return 1 }
            }

            return 0;
        });
        return fields;
    }

    constructor(workId:string, json:any) {

        this.workId = workId;
        this.read(json);

        this.work = this.lookup(workId);

        this.work.instances = this.resolve('bf:hasInstance', this.work);

        for(let idx in this.work.instances) {
            let i = this.work.instances[idx];
            this.work.instances[idx].items = this.resolve('bf:hasItem', this.work.instances[idx]);
            for(let idx2 in this.work.instances[idx].items ) {
                this.work.instances[idx].items[idx2] = this.unfold(this.work.instances[idx].items[idx2]);
                this.work.instances[idx].items[idx2]['bf'] =
                    this.rearrangeFormFields(this.work.instances[idx].items[idx2]['bf']);
            }

            this.work.instances[idx] = this.unfold(i);
            this.work.instances[idx]['bf'] = this.rearrangeFormFields(this.work.instances[idx]['bf']);
        }

        this.work = this.unfold(this.work);
        this.work['bf'] = this.rearrangeFormFields(this.work['bf']);
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
