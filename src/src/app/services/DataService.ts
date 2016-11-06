
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

    private queryMap:any = {
        'imdb' : this.queryIMDB,
        'musicbrainz': this.queryMusicBrainz
    };

    constructor(
        private http: Http
    ) {
    }

    public queryExternalDatabase(key, id) {
        return this.queryMap[key](id);
    }

    public queryIMDB(id:string) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let url = `http://www.omdbapi.com/?i=${id}&plot=short&r=json`;
        return this.http.get(url, { headers: headers}).map(res => res.json());
    }

    public queryMusicBrainz(id:string) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('User-Agent', 'OperaPlanet.org/1.0 ( amanda-xu@uiowa.edu )');
        let url = `http://musicbrainz.org/ws/2/release/${id}/`;
        return this.http.get(url, { headers: headers}).map(res => res.json());
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
        return Observable.forkJoin.apply(null, requests);
    }

    public getData() {
        //TODO: Add all data loading rouitnes here
    }





}
