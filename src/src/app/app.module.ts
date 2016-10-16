import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';
import {GraphComponent} from "./components/graph/graph.component";
import {WindowComponent} from "./components/window/window.component";
import {DataService} from "./services/DataService";
import {ParseService} from "./services/ParseService";
import {IMDBFragment} from "./components/fragments/IMDBFragment";
import {BFFragment} from "./components/fragments/BFFragment";
import {RelatorFragment} from "./components/fragments/RelatorFragment";
import {GeneralPageComponent} from "./components/pages/GEN.component";
import {TDIPageComponent} from "./components/pages/TDI.component";


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    WindowComponent,
    GraphComponent,
    IMDBFragment,
    BFFragment,
    RelatorFragment,
    GeneralPageComponent,
    TDIPageComponent
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
