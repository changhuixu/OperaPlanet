import { Pipe, PipeTransform } from '@angular/core';
import {country_lookup} from "../loc_lookup/country";
import {language_lookup} from "../loc_lookup/language";
import {relator_lookup} from "../loc_lookup/relators";

@Pipe({name: 'lookup'})
export class LookupPipe implements PipeTransform {


    transform(value: string, tableName: string): any {

        let lookupMap = {
            'country': country_lookup,
            'language': language_lookup,
            'relator': relator_lookup
        };

        if (!value) {
            return value;
        }

        if(!(tableName in lookupMap)) {
            return value;
        }

        return lookupMap[tableName](value);

    }
}