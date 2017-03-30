import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SpyDirective} from './spy.directive';
import {LoggerService} from './logger.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SpyDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
