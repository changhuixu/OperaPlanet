
import {Http, Headers, Response} from "@angular/http";
import {Injectable, Inject, EventEmitter, Output} from "@angular/core";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";



@Injectable()
export class DataService {


    private apiVersion:number = 2;
    private language:string = 'ar';
    private entities:string[] = null;
    private data:any = {};
    private cache:any = {};

    //private entity_data_loading:EventEmitter;
    //private entity_data_loaded:EventEmitter;



    constructor(
        private http: Http
    ) {
    }

    public queryDBPedia(query:string|string[]) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');

        let qs = [];
        if(!Array.isArray(query)) {
            qs.push(query);
        } else {
            qs = query;
        }
        let requests = [];

        for(let q of qs) {
            let encoded_q = encodeURI(q);
            let url = `http://lookup.dbpedia.org/api/search/KeywordSearch?QueryString=${encoded_q}`;
            requests.push(this.http.get(url, { headers: headers}).map(res => res.json()));
        }
        console.log(requests);
        return Observable.forkJoin.apply(null, requests);
    }

    public getData() {
        //TODO: Add all data loading rouitnes here
    }





}
