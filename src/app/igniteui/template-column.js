"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var igniteui_angular2_1 = require("../igniteui/igniteui.angular2");
var template_helper_1 = require("../igniteui/template-helper");
var TemplateColumn = TemplateColumn_1 = (function (_super) {
    __extends(TemplateColumn, _super);
    function TemplateColumn(componentFactoryResolver, viewContainerRef, el) {
        var _this = _super.call(this, el) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.viewContainerRef = viewContainerRef;
        return _this;
    }
    TemplateColumn.prototype.ngAfterViewInit = function () {
        var that = this;
        var templateHelper = template_helper_1.TemplateHelper;
        function template(tmpl, data) {
            var template = tmpl;
            var templateType = template.slice(1, template.length);
            var bracketIndex = templateType.indexOf('>');
            templateType = templateType.slice(0, bracketIndex);
            if (templateHelper.componentRefs[templateType] === undefined) {
                templateHelper.componentRefs[templateType] = {};
            }
            //if (templateHelper.componentRefs[templateType][data['id']] === undefined) {
            var component = templateHelper.registry[templateType];
            var factory = that.componentFactoryResolver.resolveComponentFactory(component);
            //create component for each record
            var cmpRef = that.viewContainerRef.createComponent(factory);
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
    };
    return TemplateColumn;
}(igniteui_angular2_1.Column));
TemplateColumn = TemplateColumn_1 = __decorate([
    core_1.Directive({
        selector: 'template-column',
        inputs: ['key', 'headerText', 'template', 'width', 'dataType'],
        providers: [{ provide: igniteui_angular2_1.Column, useExisting: TemplateColumn_1 }]
    }),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ViewContainerRef, core_1.ElementRef])
], TemplateColumn);
exports.TemplateColumn = TemplateColumn;
var TemplateColumn_1;
//# sourceMappingURL=template-column.js.map