
import {Http, Headers, Response} from "@angular/http";
import {Injectable, Inject, EventEmitter, Output} from "@angular/core";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";



@Injectable()
export class ParseService {


    public getData() {
        //TODO: Add all data loading rouitnes here
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
