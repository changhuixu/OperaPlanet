import {DomSanitizer} from "@angular/platform-browser";
import {PipeTransform} from "@angular/core";
import {Pipe} from "@angular/core/src/metadata/directives";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
} 