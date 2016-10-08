
import {Http, Headers, Response} from "@angular/http";
import {Injectable, Inject, EventEmitter, Output} from "@angular/core";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/map';
import {Location} from "@angular/common";
import {type} from "os";


@Injectable()
export class DataService {


    private apiVersion:number = 2;
    private language:string = 'ar';
    private entities:string[] = null;
    private data:any = {};
    private cache:any = {};

    private entity_data_loading:EventEmitter;
    private entity_data_loaded:EventEmitter;



    constructor(
        private http: Http
    ) {
    }

    public getData(arr, type:string) {


    }





}