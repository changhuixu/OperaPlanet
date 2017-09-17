import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {GraphComponent} from "./components/graph/graph.component";
import {WindowComponent} from "./components/window/window.component";
import {DataService} from "./services/DataService";
import {ParseService} from "./services/ParseService";
import {IMDBFragment} from "./components/fragments/IMDBFragment";
import {BFFragment} from "./components/fragments/BFFragment";
import {RelatorFragment} from "./components/fragments/RelatorFragment";
import {GeneralPageComponent} from "./components/pages/GEN.component";
import {MusicBrainzFragment} from "./components/fragments/MusicBrainzFragment";
import {LookupPipe} from "./pipes/lookup.pipe";
import {SafePipe} from "./pipes/safe.pipe";
import {AlertModule} from "ngx-bootstrap";


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    WindowComponent,
    GraphComponent,
    IMDBFragment,
    MusicBrainzFragment,
    BFFragment,
    RelatorFragment,
    GeneralPageComponent,
    LookupPipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule
  ],
  providers: [DataService, ParseService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
