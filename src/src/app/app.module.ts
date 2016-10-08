import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';
import {GraphComponent} from "./components/graph/graph.component";
import {PrmComponent} from "./components/contentTypePRM/PrmComponent";


@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    PrmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
