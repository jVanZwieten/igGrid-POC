"use strict";
var TemplateHelper = (function () {
    function TemplateHelper() {
    }
    TemplateHelper.positionTemplates = function (rows, gridId, templateId, columnId) {
        var components = TemplateHelper.componentRefs[templateId];
        var grid = jQuery('#' + gridId);
        var id, nativeElement;
        if (components !== undefined) {
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
                    var cell = row_1[_a];
                    if (jQuery(cell).attr('aria-describedby') === gridId + '_' + columnId) {
                        id = grid.igGrid('getElementInfo', cell.parentElement).rowId;
                        if (components[id]) {
                            //nativeElement = jQuery(components[id].location.nativeElement);
                            //nativeElement.appendTo();
                            debugger;
                            jQuery(cell).append(components[id].location.nativeElement);
                        }
                    }
                }
            }
        }
    };
    return TemplateHelper;
}());
TemplateHelper.registry = {};
TemplateHelper.componentRefs = {};
exports.TemplateHelper = TemplateHelper;
//# sourceMappingURL=template-helper.js.map