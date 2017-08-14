"use strict";
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
var ProgressComponent = (function () {
    function ProgressComponent() {
    }
    ProgressComponent.prototype.ngOnInit = function () {
        var outerWidth = this.outer.nativeElement.offsetWidth;
        this.progress = (this.recordData.progress * .01) * outerWidth;
    };
    return ProgressComponent;
}());
__decorate([
    core_1.ViewChild('outer'),
    __metadata("design:type", core_1.ElementRef)
], ProgressComponent.prototype, "outer", void 0);
ProgressComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'item-progress',
        templateUrl: './progress.component.html',
        styleUrls: ['./progress.component.css']
    })
], ProgressComponent);
exports.ProgressComponent = ProgressComponent;
//# sourceMappingURL=progress.component.js.map