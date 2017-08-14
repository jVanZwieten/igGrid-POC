import { NgModule }      from '@angular/core';

import { IgGridComponent, Column } from './igniteui.angular2';
import { TemplateColumn } from './template-column';

@NgModule({
    declarations: [ IgGridComponent, Column, TemplateColumn ],
    exports: [ IgGridComponent, Column, TemplateColumn ]
}) 
export class IgniteUIModule{
    
}