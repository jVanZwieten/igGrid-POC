import { Component, Directive, ViewContainerRef, ElementRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { Column } from '../igniteui/igniteui.angular2';

import { TemplateHelper } from '../igniteui/template-helper';

@Directive({
    selector: 'template-column',
    inputs: ['key', 'headerText', 'template', 'width', 'dataType'],
    providers: [{ provide: Column, useExisting: TemplateColumn }]
})
export class TemplateColumn extends Column {
    constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef, el: ElementRef) {
        super(el);
    }

    ngAfterViewInit() {
        var that = this;
        var templateHelper = TemplateHelper;

        function template(tmpl, data) {
            let template = <string>tmpl;
            let templateType = (<string>template).slice(1, template.length);
            let bracketIndex = templateType.indexOf('>');
            templateType = templateType.slice(0, bracketIndex);

            if(templateHelper.componentRefs[templateType] === undefined){
                templateHelper.componentRefs[templateType] = {};
            }

            //if (templateHelper.componentRefs[templateType][data['id']] === undefined) {
                let component = templateHelper.registry[templateType];
                let factory = that.componentFactoryResolver.resolveComponentFactory(component);

                //create component for each record
                let cmpRef = that.viewContainerRef.createComponent(factory);
                cmpRef.instance["recordData"] = data;

                //store these components, they need to be stored once, to retain their instance state
                $("#hc").html(cmpRef.location.nativeElement);
                templateHelper.componentRefs[templateType][data["id"]] = cmpRef;
            // }
            //}
            return '';
        }

        // //Override IgniteUI Templating
        jQuery.ig.tmpl = template;
    }
}