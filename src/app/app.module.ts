import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { IgniteUIModule } from './igniteui/igniteui.module';

import { DataService } from './services/data-service';

import { ActionsComponent } from './actions/actions.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
    imports:      [ BrowserModule, IgniteUIModule ],
    declarations: [ AppComponent, ActionsComponent, ProgressComponent ],
    entryComponents: [ ProgressComponent, ActionsComponent ],
    providers:    [ DataService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
