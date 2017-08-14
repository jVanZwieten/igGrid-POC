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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
require("./igniteui");
var NODES = {
    "ig-text-editor": "div",
    "ig-numeric-editor": "input",
    "ig-percent-editor": "input",
    "ig-mask-editor": "input",
    "ig-date-picker": "input",
    "ig-date-editor": "input",
    "ig-currency-editor": "input",
    "ig-checkbox-editor": "input",
    "ig-html-editor": "div",
    "ig-combo": "input",
    "ig-grid": "table",
    "ig-tree-grid": "table",
    "ig-hierarchical-grid": "table",
    "ig-pivot-data-selector": "div",
    "ig-pivot-grid": "table",
    "ig-data-chart": "div",
    "ig-pie-chart": "div",
    "ig-doughnut-chart": "div",
    "ig-funnel-chart": "div",
    "ig-radial-gauge": "div",
    "ig-sparkline": "div",
    "ig-zoombar": "div",
    "ig-map": "div",
    "ig-bullet-graph": "div",
    "ig-linear-gauge": "div",
    "ig-q-r-code-barcode": "div",
    "ig-validator": "div",
    "ig-upload": "div",
    "ig-popover": "div",
    "ig-rating": "div",
    "ig-video-player": "div",
    "ig-radial-menu": "div",
    "ig-split-button": "div",
    "ig-notifier": "div",
    "ig-tree": "div",
    "ig-dialog": "div",
    "ig-splitter": "div",
    "ig-layout-manager": "div",
    "ig-tile-manager": "div",
    "ig-spreadsheet": "div",
    "ig-scheduler": "div"
};
var Column = (function () {
    function Column(el) {
        this._settings = {};
        this._el = el;
        var self = this;
        var i, settings = ['headerText', 'key', 'formatter', 'format', 'dataType', 'width', 'hidden', 'template', 'unbound', 'group', 'rowspan', 'formula', 'unboundValues', 'unboundValuesUpdateMode', 'headerCssClass', 'columnCssClass'];
        for (i = 0; i < settings.length; i++) {
            Object.defineProperty(self, settings[i], {
                set: self.createColumnsSetter(settings[i]),
                get: self.createColumnsGetter(settings[i]),
                enumerable: true,
                configurable: true
            });
        }
    }
    Column.prototype.createColumnsSetter = function (name) {
        return function (value) {
            var grid = jQuery(this._el.nativeElement.parentElement).find("table[role='grid']");
            this._settings[name] = value;
            if (jQuery.ui["igGrid"] &&
                jQuery.ui["igGrid"].prototype.options &&
                jQuery.ui["igGrid"].prototype.options.hasOwnProperty("columns") &&
                grid.data("igGrid")) {
                grid["igGrid"]("option", "columns", this._settings);
            }
        };
    };
    Column.prototype.createColumnsGetter = function (name) {
        return function () {
            return this._settings[name];
        };
    };
    return Column;
}());
Column = __decorate([
    core_1.Directive({
        selector: 'column',
        inputs: ['headerText', 'key', 'formatter', 'format', 'dataType', 'width', 'hidden', 'template', 'unbound', 'group', 'rowspan', 'formula', 'unboundValues', 'unboundValuesUpdateMode', 'headerCssClass', 'columnCssClass']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], Column);
exports.Column = Column;
var Feature = (function () {
    function Feature(el) {
        this._settings = {};
        this._el = el;
        var nodeName = el.nativeElement.nodeName.toLowerCase();
        this.name = nodeName.charAt(0).toUpperCase() + nodeName.slice(1);
        this.featureName = "igGrid" + this.name;
        for (var propt in jQuery.ui["igGrid" + this.name].prototype.events) {
            this[propt] = new core_1.EventEmitter();
        }
    }
    Feature.prototype.ngOnInit = function () {
        var self = this;
        this.initSettings = jQuery.extend(true, {}, this);
        var evtName;
        this._events = new Map();
        var grid = jQuery(this._el.nativeElement).closest("ig-grid").find("table");
        //event binding for features
        for (var propt in jQuery.ui[this.featureName].prototype.events) {
            evtName = this.featureName.toLowerCase() + propt.toLowerCase();
            this._events[evtName] = propt;
            jQuery(grid).on(evtName, function (evt, ui) {
                self[self._events[evt.type]].emit({ event: evt, ui: ui });
            });
        }
        for (var setting in jQuery.ui[this.featureName].prototype.options) {
            Object.defineProperty(self, setting, {
                set: self.createFeatureSetter(setting),
                get: self.createFeatureGetter(setting),
                enumerable: true,
                configurable: true
            });
        }
        var propNames = Object.getOwnPropertyNames(jQuery.ui[this.featureName].prototype);
        for (var i = 0; i < propNames.length; i++) {
            var name = propNames[i];
            if (name.indexOf("_") !== 0 && typeof jQuery.ui[this.featureName].prototype[name] === "function") {
                Object.defineProperty(self, name, {
                    get: self.createMethodGetter(name)
                });
            }
        }
    };
    Feature.prototype.createFeatureSetter = function (name) {
        return function (value) {
            var grid = jQuery(this._el.nativeElement).closest("ig-grid").find("table[role='grid']");
            this._settings[name] = value;
            if (jQuery.ui[this.featureName] &&
                jQuery.ui[this.featureName].prototype.options &&
                jQuery.ui[this.featureName].prototype.options.hasOwnProperty(name) &&
                grid.data(this.featureName)) {
                grid[this.featureName]("option", name, value);
            }
        };
    };
    Feature.prototype.createFeatureGetter = function (name) {
        return function () {
            return this._settings[name];
        };
    };
    Feature.prototype.createMethodGetter = function (name) {
        return function () {
            var grid = jQuery(this._el.nativeElement).closest("ig-grid").find("table[role='grid']");
            var args = [];
            var feature = grid.data(this.featureName);
            return jQuery.proxy(feature[name], feature);
        };
    };
    return Feature;
}());
exports.Feature = Feature;
var IgGridSortingFeature = (function (_super) {
    __extends(IgGridSortingFeature, _super);
    function IgGridSortingFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Sorts the data in a grid column  and updates the UI.
     *
     * @param index     Column key (string) or index (number) - for multi-row grid only column key can be used. Specifies the column which we want to sort. If the mode is multiple, previous sorting states are not cleared.
     * @param direction     Specifies sorting direction (ascending or descending)
     * @param header
     */
    IgGridSortingFeature.prototype.sortColumn = function (index, direction, header) { return; };
    ;
    /**
     * Sorts the data in grid columns and updates the UI.\
     */
    IgGridSortingFeature.prototype.sortMultiple = function () { return; };
    ;
    /**
     * Removes current sorting(for all sorted columns) and updates the UI.
     */
    IgGridSortingFeature.prototype.clearSorting = function () { return; };
    ;
    /**
     * Removes sorting for the grid column with the specified columnKey/columnIndex and updates the UI.
     *
     * @param index     Column key (string) or index (number) - for multi-row grid only column key can be used. Specifies the column for which we want to remove sorting. If the mode is multiple, previous sorting states are not cleared.
     * @param header     - if specified client events should be fired
     */
    IgGridSortingFeature.prototype.unsortColumn = function (index, header) { return; };
    ;
    /**
     * Destroys the sorting feature. Unbinds events, removes added sorting elements, etc.
     */
    IgGridSortingFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Opens the multiple sorting dialog.
     */
    IgGridSortingFeature.prototype.openMultipleSortingDialog = function () { return; };
    ;
    /**
     * Closes the multiple sorting dialog.
     */
    IgGridSortingFeature.prototype.closeMultipleSortingDialog = function () { return; };
    ;
    /**
     * Renders content of multiple sorting dialog - sorted and unsorted columns.
     *
     * @param isToCallEvents
     */
    IgGridSortingFeature.prototype.renderMultipleSortingDialogContent = function (isToCallEvents) { return; };
    ;
    /**
     * Remove clear button for multiple sorting dialog
     */
    IgGridSortingFeature.prototype.removeDialogClearButton = function () { return; };
    ;
    return IgGridSortingFeature;
}(Feature));
IgGridSortingFeature = __decorate([
    core_1.Directive({
        selector: 'sorting',
        inputs: ["disabled", "create", "type", "caseSensitive", "applySortedColumnCss", "sortUrlKey", "sortUrlKeyAscValue", "sortUrlKeyDescValue", "mode", "customSortFunction", "firstSortDirection", "sortedColumnTooltip", "modalDialogSortOnClick", "modalDialogSortByButtonText", "modalDialogResetButtonLabel", "modalDialogCaptionButtonDesc", "modalDialogCaptionButtonAsc", "modalDialogCaptionButtonUnsort", "modalDialogWidth", "modalDialogHeight", "modalDialogAnimationDuration", "featureChooserText", "unsortedColumnTooltip", "columnSettings", "modalDialogCaptionText", "modalDialogButtonApplyText", "modalDialogButtonCancelText", "featureChooserSortAsc", "featureChooserSortDesc", "persist", "sortingDialogContainment", "dialogWidget", "inherit"],
        outputs: ["columnSorting", "columnSorted", "modalDialogOpening", "modalDialogOpened", "modalDialogMoving", "modalDialogClosing", "modalDialogClosed", "modalDialogContentsRendering", "modalDialogContentsRendered", "modalDialogSortingChanged", "modalDialogButtonUnsortClick", "modalDialogSortClick", "modalDialogButtonApplyClick", "modalDialogButtonResetClick"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridSortingFeature);
exports.IgGridSortingFeature = IgGridSortingFeature;
var IgGridFilteringFeature = (function (_super) {
    __extends(IgGridFilteringFeature, _super);
    function IgGridFilteringFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Destroys the filtering widget - remove fitler row, unbinds events, returns the grid to its previous state.
     */
    IgGridFilteringFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Returns the count of data records that match filtering conditions
     */
    IgGridFilteringFeature.prototype.getFilteringMatchesCount = function () { return; };
    ;
    /**
     * Toggle filter row when mode is simple or [advancedModeEditorsVisible](ui.iggridfiltering#options:advancedModeEditorsVisible) is true. Otherwise show/hide advanced dialog.
     *
     * @param event     Column key
     */
    IgGridFilteringFeature.prototype.toggleFilterRowByFeatureChooser = function (event) { return; };
    ;
    /**
     * Applies filtering programmatically and updates the UI by default.
     *
     * @param expressions     An array of filtering expressions, each one having the format {fieldName: , expr: , cond: , logic: } where  fieldName is the key of the column, expr is the actual expression string with which we would like to filter, logic is 'AND' or 'OR', and cond is one of the following strings: "equals", "doesNotEqual", "contains", "doesNotContain", "greaterThan", "lessThan", "greaterThanOrEqualTo", "lessThanOrEqualTo", "true", "false", "null", "notNull", "empty", "notEmpty", "startsWith", "endsWith", "today", "yesterday", "on", "notOn", "thisMonth", "lastMonth", "nextMonth", "before", "after", "thisYear", "lastYear", "nextYear". The difference between the empty and null filtering conditions is that empty includes null, NaN, and undefined, as well as the empty string.
     * @param updateUI     specifies whether the filter row should be also updated once the grid is filtered
     * @param addedFromAdvanced
     */
    IgGridFilteringFeature.prototype.filter = function (expressions, updateUI, addedFromAdvanced) { return; };
    ;
    /**
     * Check whether filterCondition requires or not filtering expression - e.g. if filterCondition is "lastMonth", "thisMonth", "null", "notNull", "true", "false", etc. then filtering expression is NOT required
     *
     * @param filterCondition    filtering condition - e.g. "true", "false",  "yesterday", "empty", "null", etc.
     */
    IgGridFilteringFeature.prototype.requiresFilteringExpression = function (filterCondition) { return; };
    ;
    return IgGridFilteringFeature;
}(Feature));
IgGridFilteringFeature = __decorate([
    core_1.Directive({
        selector: 'filtering',
        inputs: ["disabled", "create", "caseSensitive", "filterSummaryAlwaysVisible", "renderFC", "filterSummaryTemplate", "filterDropDownAnimations", "filterDropDownAnimationDuration", "filterDropDownWidth", "filterDropDownHeight", "filterExprUrlKey", "filterDropDownItemIcons", "columnSettings", "type", "filterDelay", "mode", "advancedModeEditorsVisible", "advancedModeHeaderButtonLocation", "filterDialogWidth", "filterDialogHeight", "filterDialogFilterDropDownDefaultWidth", "filterDialogExprInputDefaultWidth", "filterDialogColumnDropDownDefaultWidth", "renderFilterButton", "filterButtonLocation", "nullTexts", "labels", "tooltipTemplate", "filterDialogAddConditionTemplate", "filterDialogAddConditionDropDownTemplate", "filterDialogFilterTemplate", "filterDialogFilterConditionTemplate", "filterDialogAddButtonWidth", "filterDialogOkCancelButtonWidth", "filterDialogMaxFilterCount", "filterDialogContainment", "showEmptyConditions", "showNullConditions", "featureChooserText", "featureChooserTextHide", "featureChooserTextAdvancedFilter", "dialogWidget", "persist", "inherit"],
        outputs: ["dataFiltering", "dataFiltered", "dropDownOpening", "dropDownOpened", "dropDownClosing", "dropDownClosed", "filterDialogOpening", "filterDialogOpened", "filterDialogMoving", "filterDialogFilterAdding", "filterDialogFilterAdded", "filterDialogClosing", "filterDialogClosed", "filterDialogContentsRendering", "filterDialogContentsRendered", "filterDialogFiltering"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridFilteringFeature);
exports.IgGridFilteringFeature = IgGridFilteringFeature;
var IgGridPagingFeature = (function (_super) {
    __extends(IgGridPagingFeature, _super);
    function IgGridPagingFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Gets/Sets the current page index, delegates data binding and paging to [$.ig.DataSource](ig.datasource).
     *
     * @param index     The page index to go to.
     */
    IgGridPagingFeature.prototype.pageIndex = function (index) { return; };
    ;
    /**
     * Gets/Sets the page size. If no parameter is specified, just returns the current page size.
     *
     * @param size     The new page size.
     */
    IgGridPagingFeature.prototype.pageSize = function (size) { return; };
    ;
    /**
     * Destroys the igGridPaging feature by removing all elements in the pager area, unbinding events, and resetting data to discard data filtering on paging.
     */
    IgGridPagingFeature.prototype.destroy = function () { return; };
    ;
    return IgGridPagingFeature;
}(Feature));
IgGridPagingFeature = __decorate([
    core_1.Directive({
        selector: 'paging',
        inputs: ["disabled", "create", "pageSize", "recordCountKey", "pageSizeUrlKey", "pageIndexUrlKey", "currentPageIndex", "type", "showPageSizeDropDown", "pageSizeDropDownLabel", "pageSizeDropDownTrailingLabel", "pageSizeDropDownLocation", "showPagerRecordsLabel", "pagerRecordsLabelTemplate", "nextPageLabelText", "prevPageLabelText", "firstPageLabelText", "lastPageLabelText", "showFirstLastPages", "showPrevNextPages", "currentPageDropDownLeadingLabel", "currentPageDropDownTrailingLabel", "currentPageDropDownTooltip", "pageSizeDropDownTooltip", "pagerRecordsLabelTooltip", "prevPageTooltip", "nextPageTooltip", "firstPageTooltip", "lastPageTooltip", "pageTooltipFormat", "pageSizeList", "pageCountLimit", "visiblePageCount", "defaultDropDownWidth", "delayOnPageChanged", "persist", "inherit"],
        outputs: ["pageIndexChanging", "pageIndexChanged", "pageSizeChanging", "pageSizeChanged", "pagerRendering", "pagerRendered"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridPagingFeature);
exports.IgGridPagingFeature = IgGridPagingFeature;
var IgGridUpdatingFeature = (function (_super) {
    __extends(IgGridUpdatingFeature, _super);
    function IgGridUpdatingFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Sets a cell value for the specified cell. It also creates a transaction and updates the UI.
     * 			If the specified cell is currently in edit mode, the function will set the desired value in the cell's editor instead.
     *
     * @param rowId    The primary key of the row the cell is a child of.
     * @param colKey    The column key of the cell.
     * @param value    The new value for the cell.
     */
    IgGridUpdatingFeature.prototype.setCellValue = function (rowId, colKey, value) { return; };
    ;
    /**
     * Sets values for specified cells in a row. It also creates a transaction and updates the UI.
     * 			If the specified row is currently in edit mode, the function will set the desired values in the row's editors instead.
     *
     * @param rowId    The primary key of the row to update.
     * @param values    Pairs of values in the format { column1Key: value1, column2Key: value2, ... } .
     */
    IgGridUpdatingFeature.prototype.updateRow = function (rowId, values) { return; };
    ;
    /**
     * Adds a new row to the grid. It also creates a transaction and updates the UI.
     *
     * @param values    Pairs of values in the format { column1Key: value1, column2Key: value2, ... } .
     */
    IgGridUpdatingFeature.prototype.addRow = function (values) { return; };
    ;
    /**
     * Deletes a row from the grid. It also creates a transaction and updates the UI.
     *
     * @param rowId    The primary key of the row to delete.
     */
    IgGridUpdatingFeature.prototype.deleteRow = function (rowId) { return; };
    ;
    /**
     * Starts editing for the row or cell specified (depending on the [editMode](ui.iggridupdating#options:editMode)).
     *
     * @param rowId    The row id.
     * @param column    The column key or index.
     * @param raiseEvents    Specifies whether or not updating events should be raised for this operation.
     */
    IgGridUpdatingFeature.prototype.startEdit = function (rowId, column, raiseEvents) { return; };
    ;
    /**
     * Starts editing for adding a new row.
     *
     * @param raiseEvents    Specifies whether or not updating events should be raised for this operation.
     */
    IgGridUpdatingFeature.prototype.startAddRowEdit = function (raiseEvents) { return; };
    ;
    /**
     * Ends the currently active edit mode.
     *
     * @param update    Specifies if the edit process should accept the current changes. Default is 'false'.
     * @param raiseEvents    Specifies whether or not updating events should be raised for this operation.
     */
    IgGridUpdatingFeature.prototype.endEdit = function (update, raiseEvents) { return; };
    ;
    /**
     * Finds and returns the key of the first column the editor for which has invalid value.
     */
    IgGridUpdatingFeature.prototype.findInvalid = function () { return; };
    ;
    /**
     * Checks if the grid is in edit mode.
     */
    IgGridUpdatingFeature.prototype.isEditing = function () { return; };
    ;
    /**
     * Gets the editor for a column by the column key. That method can be used only after the editor has been created.
     *
     * @param key    The key of the column.
     */
    IgGridUpdatingFeature.prototype.editorForKey = function (key) { return; };
    ;
    /**
     * Gets the editor for a column by the cell it resides in. If allowed the function can create the editor if it has not been created yet.
     *
     * @param cell    Reference to the jQuery-wrapped TD object of the grid that the editor belongs to.
     * @param create    Requests to create the editor if it has not been created yet.
     */
    IgGridUpdatingFeature.prototype.editorForCell = function (cell, create) { return; };
    ;
    /**
     * Destroys igGridUpdating.
     */
    IgGridUpdatingFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Shows the delete button for specific row.
     *
     * @param row    A jQuery object of the targeted row.
     */
    IgGridUpdatingFeature.prototype.showDeleteButtonFor = function (row) { return; };
    ;
    /**
     * Hides the delete button.
     */
    IgGridUpdatingFeature.prototype.hideDeleteButton = function () { return; };
    ;
    return IgGridUpdatingFeature;
}(Feature));
IgGridUpdatingFeature = __decorate([
    core_1.Directive({
        selector: 'updating',
        inputs: ["disabled", "create", "columnSettings", "editMode", "enableDeleteRow", "enableAddRow", "validation", "doneLabel", "doneTooltip", "cancelLabel", "cancelTooltip", "addRowLabel", "addRowTooltip", "deleteRowLabel", "deleteRowTooltip", "showDoneCancelButtons", "enableDataDirtyException", "startEditTriggers", "horizontalMoveOnEnter", "excelNavigationMode", "saveChangesSuccessHandler", "saveChangesErrorHandler", "swipeDistance", "wrapAround", "rowEditDialogOptions", "dialogWidget", "inherit"],
        outputs: ["editRowStarting", "editRowStarted", "editRowEnding", "editRowEnded", "editCellStarting", "editCellStarted", "editCellEnding", "editCellEnded", "rowAdding", "rowAdded", "rowDeleting", "rowDeleted", "dataDirty", "generatePrimaryKeyValue", "rowEditDialogBeforeOpen", "rowEditDialogAfterOpen", "rowEditDialogBeforeClose", "rowEditDialogAfterClose", "rowEditDialogContentsRendered"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridUpdatingFeature);
exports.IgGridUpdatingFeature = IgGridUpdatingFeature;
var IgGridGroupByFeature = (function (_super) {
    __extends(IgGridGroupByFeature, _super);
    function IgGridGroupByFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Open groupby modal dialog
     */
    IgGridGroupByFeature.prototype.openGroupByDialog = function () { return; };
    ;
    /**
     * Close groupby modal dialog
     */
    IgGridGroupByFeature.prototype.closeGroupByDialog = function () { return; };
    ;
    /**
     * Render groupby modal dialog and its content
     */
    IgGridGroupByFeature.prototype.renderGroupByModalDialog = function () { return; };
    ;
    /**
     * Open layouts dropdown
     */
    IgGridGroupByFeature.prototype.openDropDown = function () { return; };
    ;
    /**
     * Close layouts dropdown
     */
    IgGridGroupByFeature.prototype.closeDropDown = function () { return; };
    ;
    /**
     * Check whether column with specified key and layout is grouped
     *
     * @param key    key of the column
     * @param layout    layout name
     */
    IgGridGroupByFeature.prototype.checkColumnIsGrouped = function (key, layout) { return; };
    ;
    /**
     * Get grouped data by value for the specific column. NOTE: Before calling this function the data(that is passed as an argument) should be sorted by colKey.
     *
     * @param data    data (sorted by colKey) that is used to get the records from.
     * @param colKey    key of the column for which grouping will be applied.
     * @param idval    value of the column by which grouping will be applied.
     */
    IgGridGroupByFeature.prototype.getGroupedData = function (data, colKey, idval) { return; };
    ;
    /**
     * Adds a column to the group by columns list, executes the group by operation and updates the view.
     */
    IgGridGroupByFeature.prototype.groupByColumns = function () { return; };
    ;
    /**
     * Groups by a column
     *
     * @param key    Column Key - group by the column with the specified key
     * @param layout    layout is an optional parameter. if set it means the grouped column is not in the root level but is a child layout column
     * @param sortingDirection    if not set it is taken from option defaultSortingDirection
     */
    IgGridGroupByFeature.prototype.groupByColumn = function (key, layout, sortingDirection) { return; };
    ;
    /**
     * Removes the specified column from the group by columns list, executes the group by operation and updates the view.
     *
     * @param key    Column Key - ungroup by the column with the specified key
     * @param layout    Layout is an optional parameter. If set it means the grouped column is not in the root level but is a child layout column.
     */
    IgGridGroupByFeature.prototype.ungroupByColumn = function (key, layout) { return; };
    ;
    /**
     * Expand group row with specified id
     *
     * @param rowId    data-id attribute of the group row in the DOM
     */
    IgGridGroupByFeature.prototype.expand = function (rowId) { return; };
    ;
    /**
     * Expand group row with specified id
     *
     * @param rowId    data-id attribute of the group row in the DOM
     */
    IgGridGroupByFeature.prototype.collapse = function (rowId) { return; };
    ;
    /**
     * Clears the group by columns list and updates the view.
     */
    IgGridGroupByFeature.prototype.ungroupAll = function () { return; };
    ;
    /**
     * Destroys the group by feature object.
     */
    IgGridGroupByFeature.prototype.destroy = function () { return; };
    ;
    return IgGridGroupByFeature;
}(Feature));
IgGridGroupByFeature = __decorate([
    core_1.Directive({
        selector: 'groupBy',
        inputs: ["disabled", "create", "groupByAreaVisibility", "initialExpand", "emptyGroupByAreaContent", "emptyGroupByAreaContentSelectColumns", "expansionIndicatorVisibility", "groupByLabelWidth", "labelDragHelperOpacity", "indentation", "defaultSortingDirection", "groupedColumns", "resultResponseKey", "groupedRowTextTemplate", "type", "groupByUrlKey", "groupByUrlKeyAscValue", "groupByUrlKeyDescValue", "summarySettings", "columnSettings", "expandTooltip", "collapseTooltip", "removeButtonTooltip", "modalDialogGroupByOnClick", "modalDialogGroupByButtonText", "modalDialogCaptionButtonDesc", "modalDialogCaptionButtonAsc", "modalDialogCaptionButtonUngroup", "modalDialogCaptionText", "modalDialogDropDownLabel", "modalDialogRootLevelHierarchicalGrid", "modalDialogDropDownButtonCaption", "modalDialogClearAllButtonLabel", "emptyGroupByAreaContentSelectColumnsCaption", "modalDialogDropDownWidth", "modalDialogDropDownAreaWidth", "modalDialogAnimationDuration", "modalDialogWidth", "modalDialogHeight", "modalDialogButtonApplyText", "modalDialogButtonCancelText", "useGridColumnFormatter", "persist", "groupByDialogContainment", "dialogWidget", "inherit"],
        outputs: ["groupedColumnsChanging", "groupedColumnsChanged", "modalDialogMoving", "modalDialogClosing", "modalDialogClosed", "modalDialogOpening", "modalDialogOpened", "modalDialogContentsRendering", "modalDialogContentsRendered", "modalDialogButtonApplyClick", "modalDialogButtonResetClick", "modalDialogGroupingColumn", "modalDialogGroupColumn", "modalDialogUngroupingColumn", "modalDialogUngroupColumn", "modalDialogSortGroupedColumn"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridGroupByFeature);
exports.IgGridGroupByFeature = IgGridGroupByFeature;
var IgGridColumnMovingFeature = (function (_super) {
    __extends(IgGridColumnMovingFeature, _super);
    function IgGridColumnMovingFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Restoring overwritten functions
     */
    IgGridColumnMovingFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Moves a visible column at a specified place, in front or behind a target column or at a target index
     * 			Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param column    An identifier of the column to be moved. It can be a key, a Multi-Column Header identificator, or an index in a number format. The latter is not supported when the grid contains multi-column headers.
     * @param target    An identifier of a column where the moved column should move to or an index at which the moved column should be moved to. In the case of a column identifier the column will be moved after it by default.
     * @param after    Specifies whether the column moved should be moved after or before the target column.
     * @param inDom    Specifies whether the column moving will be enacted through DOM manipulation or through rerendering of the grid.
     * @param callback    Specifies a custom function to be called when the column is moved.
     */
    IgGridColumnMovingFeature.prototype.moveColumn = function (column, target, after, inDom, callback) { return; };
    ;
    return IgGridColumnMovingFeature;
}(Feature));
IgGridColumnMovingFeature = __decorate([
    core_1.Directive({
        selector: 'columnMoving',
        inputs: ["disabled", "create", "columnSettings", "mode", "moveType", "addMovingDropdown", "movingDialogWidth", "movingDialogHeight", "movingDialogAnimationDuration", "movingAcceptanceTolerance", "movingScrollTolerance", "scrollSpeedMultiplier", "scrollDelta", "hideHeaderContentsDuringDrag", "dragHelperOpacity", "movingDialogCaptionButtonDesc", "movingDialogCaptionButtonAsc", "movingDialogCaptionText", "movingDialogDisplayText", "movingDialogDropTooltipText", "movingDialogDropTooltipMarkup", "dropDownMoveLeftText", "dropDownMoveRightText", "dropDownMoveFirstText", "dropDownMoveLastText", "movingToolTipMove", "featureChooserSubmenuText", "columnMovingDialogContainment", "dialogWidget", "inherit"],
        outputs: ["columnDragStart", "columnDragEnd", "columnDragCanceled", "columnMoving", "columnMoved", "movingDialogOpening", "movingDialogOpened", "movingDialogDragged", "movingDialogClosing", "movingDialogClosed", "movingDialogContentsRendering", "movingDialogContentsRendered", "movingDialogMoveUpButtonPressed", "movingDialogMoveDownButtonPressed", "movingDialogDragColumnMoving", "movingDialogDragColumnMoved"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridColumnMovingFeature);
exports.IgGridColumnMovingFeature = IgGridColumnMovingFeature;
var IgGridHidingFeature = (function (_super) {
    __extends(IgGridHidingFeature, _super);
    function IgGridHidingFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Destroys the hiding widget
     */
    IgGridHidingFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Shows the Column Chooser dialog. If it is visible the method does nothing.
     */
    IgGridHidingFeature.prototype.showColumnChooser = function () { return; };
    ;
    /**
     * Hides the Column Chooser dialog. If it is not visible the method does nothing.
     */
    IgGridHidingFeature.prototype.hideColumnChooser = function () { return; };
    ;
    /**
     * Shows a hidden column. If the column is not hidden the method does nothing.
     * 			Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param column    An identifier for the column. If a number is provided it will be used as a column index else if a strings is provided it will be used as a column key.
     * @param isMultiColumnHeader    If it is true then the column is of type multicolumnheader. An identifier for the column should be of type string.
     * @param callback    Specifies a custom function to be called when the column(s) is shown(optional)
     */
    IgGridHidingFeature.prototype.showColumn = function (column, isMultiColumnHeader, callback) { return; };
    ;
    /**
     * Hides a visible column. If the column is hidden the method does nothing.
     * 			Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param column    An identifier for the column. If a number is provided it will be used as a column index else if a strings is provided it will be used as a column key.
     * @param isMultiColumnHeader    If it is true then the column is of type multicolumnheader. An identifier for the column should be of type string.
     * @param callback    Specifies a custom function to be called when the column is hidden(optional)
     */
    IgGridHidingFeature.prototype.hideColumn = function (column, isMultiColumnHeader, callback) { return; };
    ;
    /**
     * Hides visible columns specified by the array. If the column is hidden the method does nothing.
     * 			Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param columns    An array of identifiers for the columns. If a number is provided it will be used as a column index else if a strings is provided it will be used as a column key.
     * @param callback    Specifies a custom function to be called when all columns are hidden(optional)
     */
    IgGridHidingFeature.prototype.hideMultiColumns = function (columns, callback) { return; };
    ;
    /**
     * Show visible columns specified by the array. If the column is shown the method does nothing.
     * 			Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param columns    An array of identifiers for the columns. If a number is provided it will be used as a column index else if a strings is provided it will be used as a column key.
     * @param callback    Specifies a custom function to be called when all columns are shown(optional)
     */
    IgGridHidingFeature.prototype.showMultiColumns = function (columns, callback) { return; };
    ;
    /**
     * Gets whether the reset button in the column chooser dialog is to be rendered or not.
     */
    IgGridHidingFeature.prototype.isToRenderButtonReset = function () { return; };
    ;
    /**
     * Reset hidden/shown column to initial state of dialog(when it is opened)
     */
    IgGridHidingFeature.prototype.resetHidingColumnChooser = function () { return; };
    ;
    /**
     * Renders the Reset button in the Column Chooser dialog.
     */
    IgGridHidingFeature.prototype.renderColumnChooserResetButton = function () { return; };
    ;
    /**
     * Remove Reset button in column chooser modal dialog
     */
    IgGridHidingFeature.prototype.removeColumnChooserResetButton = function () { return; };
    ;
    return IgGridHidingFeature;
}(Feature));
IgGridHidingFeature = __decorate([
    core_1.Directive({
        selector: 'hiding',
        inputs: ["disabled", "create", "columnSettings", "hiddenColumnIndicatorHeaderWidth", "columnChooserContainment", "columnChooserWidth", "columnChooserHeight", "dropDownAnimationDuration", "columnChooserCaptionText", "columnChooserDisplayText", "hiddenColumnIndicatorTooltipText", "columnHideText", "columnChooserShowText", "columnChooserHideText", "columnChooserHideOnClick", "columnChooserResetButtonLabel", "columnChooserAnimationDuration", "columnChooserButtonApplyText", "columnChooserButtonCancelText", "dialogWidget", "inherit"],
        outputs: ["columnHiding", "columnHidingRefused", "columnShowingRefused", "multiColumnHiding", "columnHidden", "columnShowing", "columnShown", "columnChooserOpening", "columnChooserOpened", "columnChooserMoving", "columnChooserClosing", "columnChooserClosed", "columnChooserContentsRendering", "columnChooserContentsRendered", "columnChooserButtonApplyClick", "columnChooserButtonResetClick"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridHidingFeature);
exports.IgGridHidingFeature = IgGridHidingFeature;
var IgGridCellMergingFeature = (function (_super) {
    __extends(IgGridCellMergingFeature, _super);
    function IgGridCellMergingFeature(el) {
        return _super.call(this, el) || this;
    }
    IgGridCellMergingFeature.prototype.destroy = function () { return; };
    ;
    return IgGridCellMergingFeature;
}(Feature));
IgGridCellMergingFeature = __decorate([
    core_1.Directive({
        selector: 'cell-merging',
        inputs: ["disabled", "create", "initialState", "inherit"],
        outputs: ["cellsMerging", "cellsMerged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridCellMergingFeature);
exports.IgGridCellMergingFeature = IgGridCellMergingFeature;
var IgGridResponsiveFeature = (function (_super) {
    __extends(IgGridResponsiveFeature, _super);
    function IgGridResponsiveFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Destroys the responsive widget.
     */
    IgGridResponsiveFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Returns the currently active responsive mode.
     */
    IgGridResponsiveFeature.prototype.getCurrentResponsiveMode = function () { return; };
    ;
    return IgGridResponsiveFeature;
}(Feature));
IgGridResponsiveFeature = __decorate([
    core_1.Directive({
        selector: 'responsive',
        inputs: ["disabled", "create", "columnSettings", "reactOnContainerWidthChanges", "forceResponsiveGridWidth", "responsiveSensitivity", "responsiveModes", "enableVerticalRendering", "windowWidthToRenderVertically", "propertiesColumnWidth", "valuesColumnWidth", "allowedColumnWidthPerType", "singleColumnTemplate", "inherit"],
        outputs: ["responsiveColumnHiding", "responsiveColumnHidden", "responsiveColumnShowing", "responsiveColumnShown", "responsiveModeChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridResponsiveFeature);
exports.IgGridResponsiveFeature = IgGridResponsiveFeature;
var IgGridResizingFeature = (function (_super) {
    __extends(IgGridResizingFeature, _super);
    function IgGridResizingFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Destroys the resizing widget
     */
    IgGridResizingFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Resizes a column to a specified width in pixels, percents or auto if no width is specified.
     *
     * @param column    An identifier for the column. If a number is provided it will be used as a columnIndex else if a strings is provided it will be used as a columnKey.
     * @param width    Width of the column in pixels or percents. If no width or "*" is specified the column will be auto-sized to the width of the data in it (including header and footer cells).
     */
    IgGridResizingFeature.prototype.resize = function (column, width) { return; };
    ;
    return IgGridResizingFeature;
}(Feature));
IgGridResizingFeature = __decorate([
    core_1.Directive({
        selector: 'resizing',
        inputs: ["disabled", "create", "allowDoubleClickToResize", "deferredResizing", "columnSettings", "handleThreshold", "inherit"],
        outputs: ["columnResizing", "columnResizingRefused", "columnResized"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridResizingFeature);
exports.IgGridResizingFeature = IgGridResizingFeature;
var IgGridSelectionFeature = (function (_super) {
    __extends(IgGridSelectionFeature, _super);
    function IgGridSelectionFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Destroys the selection widget.
     */
    IgGridSelectionFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Clears all selected cells, selected rows, active cell and active row. Also updates the UI accordingly
     */
    IgGridSelectionFeature.prototype.clearSelection = function () { return; };
    ;
    /**
     * Selects a cell by row/col
     *
     * @param row     Row index
     * @param col     Column index
     * @param isFixed     If the cell is part of the fixed or unfixed area of the grid.
     */
    IgGridSelectionFeature.prototype.selectCell = function (row, col, isFixed) { return; };
    ;
    /**
     * Selects a cell by row id/column key
     *
     * @param id     Row Id
     * @param colKey     Column key
     */
    IgGridSelectionFeature.prototype.selectCellById = function (id, colKey) { return; };
    ;
    /**
     * Deselects a cell by row/col
     *
     * @param row     Row index
     * @param col     Column index
     * @param isFixed     If the cell is part of the fixed or unfixed area of the grid.
     */
    IgGridSelectionFeature.prototype.deselectCell = function (row, col, isFixed) { return; };
    ;
    /**
     * Deselects a cell by row id/column key
     *
     * @param id     Row Id
     * @param colKey     Column key
     */
    IgGridSelectionFeature.prototype.deselectCellById = function (id, colKey) { return; };
    ;
    /**
     * Selects a row by index
     *
     * @param index     Row index
     */
    IgGridSelectionFeature.prototype.selectRow = function (index) { return; };
    ;
    /**
     * Selects a row by row id
     *
     * @param id     Row Id
     */
    IgGridSelectionFeature.prototype.selectRowById = function (id) { return; };
    ;
    /**
     * Deselects a row by index
     *
     * @param index     Row index
     */
    IgGridSelectionFeature.prototype.deselectRow = function (index) { return; };
    ;
    /**
     * Deselects a row by row id
     *
     * @param id     Row Id
     */
    IgGridSelectionFeature.prototype.deselectRowById = function (id) { return; };
    ;
    /**
     * Returns an array of selected cells in arbitrary order where every objects has the format { element: , row: , index: , rowIndex: , columnKey: } .
     *
     * 				If multiple selection is disabled the function will return null.
     */
    IgGridSelectionFeature.prototype.selectedCells = function () { return; };
    ;
    /**
     * Returns an array of selected rows in arbitrary order where every object has the format { element: , index: } .
     *
     * 				If multiple selection is disabled the function will return null.
     */
    IgGridSelectionFeature.prototype.selectedRows = function () { return; };
    ;
    /**
     * Returns the currently selected cell that has the format { element: , row: , index: , rowIndex: , columnKey: }, if any.
     *
     * 				If multiple selection is enabled the function will return null.
     */
    IgGridSelectionFeature.prototype.selectedCell = function () { return; };
    ;
    /**
     * Returns the currently selected row that has the format { element: , index: }, if any.
     *
     * 				If multiple selection is enabled the function will return null.
     */
    IgGridSelectionFeature.prototype.selectedRow = function () { return; };
    ;
    /**
     * Returns the currently active (focused) cell that has the format { element: , row: , index: , rowIndex: , columnKey: }, if any.
     */
    IgGridSelectionFeature.prototype.activeCell = function () { return; };
    ;
    /**
     * Returns the currently active (focused) row that has the format { element: , index: }, if any.
     */
    IgGridSelectionFeature.prototype.activeRow = function () { return; };
    ;
    return IgGridSelectionFeature;
}(Feature));
IgGridSelectionFeature = __decorate([
    core_1.Directive({
        selector: 'selection',
        inputs: ["disabled", "create", "multipleSelection", "mouseDragSelect", "mode", "activation", "wrapAround", "skipChildren", "multipleCellSelectOnClick", "touchDragSelect", "persist", "allowMultipleRangeSelection"],
        outputs: ["rowSelectionChanging", "rowSelectionChanged", "cellSelectionChanging", "cellSelectionChanged", "activeCellChanging", "activeCellChanged", "activeRowChanging", "activeRowChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridSelectionFeature);
exports.IgGridSelectionFeature = IgGridSelectionFeature;
var IgGridRowSelectorsFeature = (function (_super) {
    __extends(IgGridRowSelectorsFeature, _super);
    function IgGridRowSelectorsFeature(el) {
        return _super.call(this, el) || this;
    }
    IgGridRowSelectorsFeature.prototype.destroy = function () { return; };
    ;
    return IgGridRowSelectorsFeature;
}(Feature));
IgGridRowSelectorsFeature = __decorate([
    core_1.Directive({
        selector: 'row-selectors',
        inputs: ["disabled", "create", "enableRowNumbering", "enableCheckBoxes", "rowNumberingSeed", "rowSelectorColumnWidth", "requireSelection", "showCheckBoxesOnFocus", "inherit", "enableSelectAllForPaging", "selectAllForPagingTemplate", "deselectAllForPagingTemplate"],
        outputs: ["rowSelectorClicked", "checkBoxStateChanging", "checkBoxStateChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridRowSelectorsFeature);
exports.IgGridRowSelectorsFeature = IgGridRowSelectorsFeature;
var IgGridSummariesFeature = (function (_super) {
    __extends(IgGridSummariesFeature, _super);
    function IgGridSummariesFeature(el) {
        return _super.call(this, el) || this;
    }
    IgGridSummariesFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Returns whether summaries rows are hidden
     */
    IgGridSummariesFeature.prototype.isSummariesRowsHidden = function () { return; };
    ;
    /**
     * Calculate summaries
     */
    IgGridSummariesFeature.prototype.calculateSummaries = function () { return; };
    ;
    /**
     * Remove all summaries dropdown buttons.
     */
    IgGridSummariesFeature.prototype.clearAllFooterIcons = function () { return; };
    ;
    /**
     * Toggle drop down
     *
     * @param columnKey    toggle drop down for the column with the specified key
     * @param event    event object. Its data should contain current columnKey, isAnimating, buttonId
     */
    IgGridSummariesFeature.prototype.toggleDropDown = function (columnKey, event) { return; };
    ;
    /**
     * Show/Hide dialog
     *
     * @param $dialog     jQuery object representation of dropdown div element
     */
    IgGridSummariesFeature.prototype.showHideDialog = function ($dialog) { return; };
    ;
    /**
     * Toggle summaries rows
     *
     * @param isToShow    Specifies whether to show or not summaries
     * @param isInternalCall    Optional parameter.Specifies whether this function is called internally by the widget.
     */
    IgGridSummariesFeature.prototype.toggleSummariesRows = function (isToShow, isInternalCall) { return; };
    ;
    /**
     * Toggles the checkstate of a checkbox if checkboxMode is not set to off, otherwise does nothing.
     *
     * @param $checkbox     Specifies the jQuery object of the checkbox.
     */
    IgGridSummariesFeature.prototype.toggleCheckstate = function ($checkbox) { return; };
    ;
    /**
     * Select/Unselect specified checkbox
     *
     * @param $checkbox     Specifies the jQuery object for checkbox
     * @param isToSelect     Specify whether to select or not checkbox
     */
    IgGridSummariesFeature.prototype.selectCheckBox = function ($checkbox, isToSelect) { return; };
    ;
    /**
     * Summary calculate the whole data for the specified column key, columnMethods and dataType (used when datasource is remote and dataType is date)
     *
     * @param ck    ColumnKey
     * @param columnMethods    Array of column methods objects
     * @param data    Object which represents result
  represents dataType for the current column
     * @param dataType
     */
    IgGridSummariesFeature.prototype.calculateSummaryColumn = function (ck, columnMethods, data, dataType) { return; };
    ;
    /**
     * Return a JQUERY object which holds all summaries for all columns
     */
    IgGridSummariesFeature.prototype.summaryCollection = function () { return; };
    ;
    /**
     * Return a JQUERY object which holds all summaries for column with the specified column key
     *
     * @param columnKey
     */
    IgGridSummariesFeature.prototype.summariesFor = function (columnKey) { return; };
    ;
    return IgGridSummariesFeature;
}(Feature));
IgGridSummariesFeature = __decorate([
    core_1.Directive({
        selector: 'summaries',
        inputs: ["disabled", "create", "type", "dialogButtonOKText", "dialogButtonCancelText", "calculateRenderMode", "featureChooserText", "featureChooserTextHide", "compactRenderingMode", "defaultDecimalDisplay", "showSummariesButton", "summariesResponseKey", "summaryExprUrlKey", "callee", "dropDownHeight", "dropDownWidth", "showDropDownButton", "summaryExecution", "dropDownDialogAnimationDuration", "emptyCellText", "summariesHeaderButtonTooltip", "resultTemplate", "isGridFormatter", "renderSummaryCellFunc", "columnSettings", "inherit"],
        outputs: ["dropDownOpening", "dropDownOpened", "dropDownClosing", "dropDownClosed", "summariesCalculating", "summariesCalculated", "summariesMethodSelectionChanged", "summariesToggling", "summariesToggled", "dropDownOKClicked", "dropDownCancelClicked"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridSummariesFeature);
exports.IgGridSummariesFeature = IgGridSummariesFeature;
var IgGridColumnFixingFeature = (function (_super) {
    __extends(IgGridColumnFixingFeature, _super);
    function IgGridColumnFixingFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Unfixes a column by specified column identifier - column key or column index.
     *
     * @param colIdentifier    An identifier of the column to be unfixed - column index or column key.
     * @param target    Key of the column where the unfixed column should move to.
     * @param after    Specifies where the unfixed column should be rendered after or before the target column. This parameter is disregarded if there is no target column specified.
     */
    IgGridColumnFixingFeature.prototype.unfixColumn = function (colIdentifier, target, after) { return; };
    ;
    /**
     * Checks whether the heights of fixed and unfixed tables are equal - if not sync them. Similar check is made for heights of table rows.
     */
    IgGridColumnFixingFeature.prototype.checkAndSyncHeights = function () { return; };
    ;
    /**
     * If the 'check' argument is set to true, checks whether the heights of fixed and unfixed tables are equal, if not sync them. Similar check is made for heights of table rows. If the clearRowsHeights argument is set to true, clears rows heights before syncing them.
     *
     * @param check    If set to true, checks whether the heights of fixed and unfixed tables are equal, if not sync them. If this argument is set to false sync is performed regardless of the current heights.
     * @param clearRowsHeights    Clears row heigths for all visible rows.
     */
    IgGridColumnFixingFeature.prototype.syncHeights = function (check, clearRowsHeights) { return; };
    ;
    /**
     * Returns whether the column with the specified key is a column group header, when the [multi-column headers](http://www.igniteui.com/help/iggrid-multicolumnheaders-landingpage) feature is used.
     *
     * @param colKey    The key of the column to perform the check for.
     */
    IgGridColumnFixingFeature.prototype.isGroupHeader = function (colKey) { return; };
    ;
    /**
     * Checks whether column fixing is allowed for the specified columns. It should not be allowed if there is only one visible column in the unfixed area.
     *
     * @param columns    Array of columns and/or column identifiers - could be column indexes, column keys, column object or mixed.
     */
    IgGridColumnFixingFeature.prototype.checkFixingAllowed = function (columns) { return; };
    ;
    /**
     * Checks whether unfixing is allowed for the specified columns. It should not be allowed if there is only one visible column in the fixed area.
     *
     * @param columns    Array of columns and/or column identifiers - could be column indexes, column keys, column object or mixed.
     */
    IgGridColumnFixingFeature.prototype.checkUnfixingAllowed = function (columns) { return; };
    ;
    /**
     * Fixes non-data columns (such as the row numbering column of row selectors) if any and if [fixingDirection](ui.iggridcolumnfixing#options:fixingDirection) is left. Does nothing if the non-data columns are already fixed.
     */
    IgGridColumnFixingFeature.prototype.fixNonDataColumns = function () { return; };
    ;
    /**
     * This function is deprecated - use function fixNonDataColumns.
     */
    IgGridColumnFixingFeature.prototype.fixDataSkippedColumns = function () { return; };
    ;
    /**
     * Unfixes non-data columns (such as the row numbering column of row selectors) if any and if [fixingDirection](ui.iggridcolumnfixing#options:fixingDirection) is left. Does nothing if the non-data columns are already fixed.
     */
    IgGridColumnFixingFeature.prototype.unfixNonDataColumns = function () { return; };
    ;
    /**
     * This function is deprecated - use function unfixNonDataColumns.
     */
    IgGridColumnFixingFeature.prototype.unfixDataSkippedColumns = function () { return; };
    ;
    /**
     * Unfixes all fixed columns.
     */
    IgGridColumnFixingFeature.prototype.unfixAllColumns = function () { return; };
    ;
    /**
     * Syncs rows heights between two collections of rows.
     *
     * @param $trs    An array of rows of the first(fixed/unfixed) container.
     * @param $anotherRows    An array of rows of the second(fixed/unfixed) container.
     */
    IgGridColumnFixingFeature.prototype.syncRowsHeights = function ($trs, $anotherRows) { return; };
    ;
    /**
     * Calculates widths of the fixed columns.
     *
     * @param fCols    Array of grid columns. If not set then the total width of the fixed columns are returned.
     * @param excludeNonDataColumns    If set to true do not calculate the width of non-data fixed columns (like the row selector row numbering column).
     * @param includeHidden    If set to true calculates width of the hidden fixed columns (their initial width before hiding).
     */
    IgGridColumnFixingFeature.prototype.getWidthOfFixedColumns = function (fCols, excludeNonDataColumns, includeHidden) { return; };
    ;
    /**
     * Destroys the column fixing widget
     */
    IgGridColumnFixingFeature.prototype.destroy = function () { return; };
    ;
    return IgGridColumnFixingFeature;
}(Feature));
IgGridColumnFixingFeature = __decorate([
    core_1.Directive({
        selector: 'column-fixing',
        inputs: ["disabled", "create", "headerFixButtonText", "headerUnfixButtonText", "showFixButtons", "syncRowHeights", "scrollDelta", "fixingDirection", "columnSettings", "featureChooserTextFixedColumn", "featureChooserTextUnfixedColumn", "minimalVisibleAreaWidth", "fixNondataColumns", "populateDataRowsAttributes"],
        outputs: ["columnFixing", "columnFixed", "columnUnfixing", "columnUnfixed", "columnFixingRefused", "columnUnfixingRefused"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridColumnFixingFeature);
exports.IgGridColumnFixingFeature = IgGridColumnFixingFeature;
var IgGridTooltipsFeature = (function (_super) {
    __extends(IgGridTooltipsFeature, _super);
    function IgGridTooltipsFeature(el) {
        return _super.call(this, el) || this;
    }
    /**
     * Destroys the tooltip widget.
     */
    IgGridTooltipsFeature.prototype.destroy = function () { return; };
    ;
    /**
     * Returns the ID of the parent div element bounding the ruler and the tooltip container
     */
    IgGridTooltipsFeature.prototype.id = function () { return; };
    ;
    return IgGridTooltipsFeature;
}(Feature));
IgGridTooltipsFeature = __decorate([
    core_1.Directive({
        selector: 'tooltips',
        inputs: ["disabled", "create", "visibility", "style", "showDelay", "hideDelay", "columnSettings", "fadeTimespan", "cursorLeftOffset", "cursorTopOffset", "inherit"],
        outputs: ["tooltipShowing", "tooltipShown", "tooltipHiding", "tooltipHidden"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], IgGridTooltipsFeature);
exports.IgGridTooltipsFeature = IgGridTooltipsFeature;
var Features = (function () {
    function Features() {
        this.allFeatures = new Array();
    }
    Features.prototype.ngAfterContentInit = function () {
        this.filtering ? this.allFeatures.push(this.filtering) : null;
        this.sorting ? this.allFeatures.push(this.sorting) : null;
        this.paging ? this.allFeatures.push(this.paging) : null;
        this.updating ? this.allFeatures.push(this.updating) : null;
        this.groupBy ? this.allFeatures.push(this.groupBy) : null;
        this.moving ? this.allFeatures.push(this.moving) : null;
        this.hiding ? this.allFeatures.push(this.hiding) : null;
        this.responsive ? this.allFeatures.push(this.responsive) : null;
        this.responsive ? this.allFeatures.push(this.responsive) : null;
        this.resizing ? this.allFeatures.push(this.resizing) : null;
        this.selection ? this.allFeatures.push(this.selection) : null;
        this.rowSelectors ? this.allFeatures.push(this.rowSelectors) : null;
        this.summaries ? this.allFeatures.push(this.summaries) : null;
        this.columnFixing ? this.allFeatures.push(this.columnFixing) : null;
        this.tooltips ? this.allFeatures.push(this.tooltips) : null;
    };
    return Features;
}());
__decorate([
    core_1.ContentChild(IgGridSortingFeature),
    __metadata("design:type", IgGridSortingFeature)
], Features.prototype, "sorting", void 0);
__decorate([
    core_1.ContentChild(IgGridFilteringFeature),
    __metadata("design:type", IgGridFilteringFeature)
], Features.prototype, "filtering", void 0);
__decorate([
    core_1.ContentChild(IgGridPagingFeature),
    __metadata("design:type", IgGridPagingFeature)
], Features.prototype, "paging", void 0);
__decorate([
    core_1.ContentChild(IgGridUpdatingFeature),
    __metadata("design:type", IgGridUpdatingFeature)
], Features.prototype, "updating", void 0);
__decorate([
    core_1.ContentChild(IgGridGroupByFeature),
    __metadata("design:type", IgGridGroupByFeature)
], Features.prototype, "groupBy", void 0);
__decorate([
    core_1.ContentChild(IgGridColumnMovingFeature),
    __metadata("design:type", IgGridColumnMovingFeature)
], Features.prototype, "moving", void 0);
__decorate([
    core_1.ContentChild(IgGridHidingFeature),
    __metadata("design:type", IgGridHidingFeature)
], Features.prototype, "hiding", void 0);
__decorate([
    core_1.ContentChild(IgGridCellMergingFeature),
    __metadata("design:type", IgGridCellMergingFeature)
], Features.prototype, "cellMerging", void 0);
__decorate([
    core_1.ContentChild(IgGridResponsiveFeature),
    __metadata("design:type", IgGridResponsiveFeature)
], Features.prototype, "responsive", void 0);
__decorate([
    core_1.ContentChild(IgGridResizingFeature),
    __metadata("design:type", IgGridResizingFeature)
], Features.prototype, "resizing", void 0);
__decorate([
    core_1.ContentChild(IgGridSelectionFeature),
    __metadata("design:type", IgGridSelectionFeature)
], Features.prototype, "selection", void 0);
__decorate([
    core_1.ContentChild(IgGridRowSelectorsFeature),
    __metadata("design:type", IgGridRowSelectorsFeature)
], Features.prototype, "rowSelectors", void 0);
__decorate([
    core_1.ContentChild(IgGridSummariesFeature),
    __metadata("design:type", IgGridSummariesFeature)
], Features.prototype, "summaries", void 0);
__decorate([
    core_1.ContentChild(IgGridColumnFixingFeature),
    __metadata("design:type", IgGridColumnFixingFeature)
], Features.prototype, "columnFixing", void 0);
__decorate([
    core_1.ContentChild(IgGridTooltipsFeature),
    __metadata("design:type", IgGridTooltipsFeature)
], Features.prototype, "tooltips", void 0);
Features = __decorate([
    core_1.Directive({
        selector: 'features'
    })
], Features);
exports.Features = Features;
var IgControlBase = (function () {
    function IgControlBase(el, renderer, differs) {
        this._opts = {};
        this._allowChangeDetection = true;
        this._evtEmmiters = {};
        this._differs = differs;
        this._widgetName = this.convertToCamelCase(el.nativeElement.nodeName.toLowerCase()); //ig-grid -> igGrid
        this._el = el.nativeElement.appendChild(document.createElement(NODES[el.nativeElement.nodeName.toLowerCase()]));
        for (var opt in jQuery.ui[this._widgetName].prototype.options) {
            Object.defineProperty(this, opt, {
                set: this.createSetter(opt),
                enumerable: true,
                configurable: true
            });
        }
        for (var propt in jQuery.ui[this._widgetName].prototype.events) {
            this[propt] = new core_1.EventEmitter();
            //cahcing the event emmitters for cases when the event name is the same as a method name.
            this._evtEmmiters[propt] = this[propt];
        }
    }
    Object.defineProperty(IgControlBase.prototype, "options", {
        set: function (v) {
            if (this._config !== undefined && this._config !== null) {
                //if the options are alrealy set recreate the component
                jQuery(this._el)[this._widgetName]("destroy");
                this._config = jQuery.extend(false, this._config, v);
                jQuery(this._el)[this._widgetName](this._config);
            }
            else {
                this._config = jQuery.extend(true, v, this._opts);
                if (this._opts.dataSource) {
                    // _config.dataSource should reference the data if the data is set as a top-level opts
                    // to allow two-way data binding
                    this._config.dataSource = this._opts.dataSource;
                }
                this._differ = this._differs.find([]).create(null);
            }
            this._opts = jQuery.extend(true, {}, this._config);
            if (this._opts.dataSource) {
                delete this._opts.dataSource;
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    IgControlBase.prototype.createSetter = function (name) {
        return function (value) {
            this._opts[name] = value;
            if (this._config) {
                this._config[name] = value;
            }
            if (jQuery.ui[this._widgetName] &&
                jQuery.ui[this._widgetName].prototype.options &&
                jQuery.ui[this._widgetName].prototype.options.hasOwnProperty(name) &&
                jQuery(this._el).data(this._widgetName)) {
                jQuery(this._el)[this._widgetName]("option", name, value);
                if (name === "dataSource" && this instanceof IgGridBase) {
                    this._dataSource = jQuery.extend(true, [], value);
                }
            }
        };
    };
    IgControlBase.prototype.ngOnInit = function () {
        var evtName;
        this._events = new Map();
        //events binding
        var that = this;
        for (var propt in jQuery.ui[this._widgetName].prototype.events) {
            evtName = this._widgetName.toLowerCase() + propt.toLowerCase();
            this._events[evtName] = propt;
            jQuery(this._el).on(evtName, function (evt, ui) {
                var emmiter = that._evtEmmiters[that._events[evt.type]];
                emmiter.emit({ event: evt, ui: ui });
            });
        }
        var propNames = Object.getOwnPropertyNames(jQuery.ui[this._widgetName].prototype);
        for (var i = 0; i < propNames.length; i++) {
            var name = propNames[i];
            if (name.indexOf("_") !== 0 && typeof jQuery.ui[this._widgetName].prototype[name] === "function") {
                Object.defineProperty(that, name, {
                    get: that.createMethodGetter(name)
                });
            }
        }
        if (this.changeDetectionInterval === undefined || this.changeDetectionInterval === null) {
            this.changeDetectionInterval = 500;
        }
        setInterval(function () {
            that._allowChangeDetection = true;
        }, this.changeDetectionInterval);
        jQuery(this._el).attr("id", this.widgetId);
        if (this._config === null || this._config === undefined) {
            //if there is no config specified in the component template use the defined top-level options for a configuration
            //by invoking the setter of options property
            this.options = this._opts;
        }
        jQuery(this._el)[this._widgetName](this._config);
    };
    IgControlBase.prototype.createMethodGetter = function (name) {
        return function () {
            var widget = jQuery(this._el).data(this._widgetName);
            return jQuery.proxy(widget[name], widget);
        };
    };
    IgControlBase.prototype.ngDoCheck = function () {
        if (this._allowChangeDetection) {
            this._allowChangeDetection = false;
            this.optionChange();
        }
    };
    IgControlBase.prototype.optionChange = function () {
        if (this._differ != null) {
            var diff = [];
            var element = jQuery(this._el);
            var i, j, valKey = this._config.valueKey, option;
            var opts = jQuery.extend(true, {}, this._config);
            if (opts.dataSource) {
                delete opts.dataSource;
            }
            if (!this.equalsDiff(opts, this._opts, diff)) {
                this._opts = jQuery.extend(true, {}, opts);
                for (i = 0; i < diff.length; i++) {
                    option = diff[i].key;
                    if (jQuery.ui[this._widgetName] &&
                        jQuery.ui[this._widgetName].prototype.options &&
                        jQuery.ui[this._widgetName].prototype.options.hasOwnProperty(option) &&
                        jQuery(this._el).data(this._widgetName)) {
                        jQuery(this._el)[this._widgetName]("option", option, diff[i].newVal);
                    }
                }
            }
        }
    };
    // Interrogation functions
    IgControlBase.prototype.isDate = function (value) {
        return Object.prototype.toString.call(value) === "[object Date]";
    };
    IgControlBase.prototype.isRegExp = function (value) {
        return Object.prototype.toString.call(value) === "[object RegExp]";
    };
    IgControlBase.prototype.isScope = function (obj) {
        return obj && obj.jQueryevalAsync && obj.jQuerywatch;
    };
    IgControlBase.prototype.isWindow = function (obj) {
        return obj && obj.document && obj.location && obj.alert && obj.setInterval;
    };
    IgControlBase.prototype.isFunction = function (value) { return typeof value === "function"; };
    IgControlBase.prototype.isArray = function (value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    };
    IgControlBase.prototype.equalsDiff = function (o1, o2, diff) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        } // NaN === NaN
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet, dirty, skipDiff = false, changedVals = [];
        if (t1 === t2) {
            if (t1 === "object") {
                if (this.isArray(o1)) {
                    if (!this.isArray(o2)) {
                        return false;
                    }
                    if ((length = o1.length) === o2.length) {
                        if (!this.isArray(diff)) {
                            skipDiff = true;
                        }
                        for (key = 0; key < length; key++) {
                            // we are comparing objects here
                            if (!this.equalsDiff(o1[key], o2[key], changedVals)) {
                                dirty = true;
                                if (!skipDiff) {
                                    diff.push({ index: key, txlog: changedVals });
                                }
                            }
                        }
                        if (dirty) {
                            return false;
                        }
                        return true;
                    }
                }
                else if (this.isDate(o1)) {
                    return this.isDate(o2) && o1.getTime() === o2.getTime();
                }
                else if (this.isRegExp(o1) && this.isRegExp(o2)) {
                    return o1.toString() === o2.toString();
                }
                else {
                    if (this.isScope(o1) || this.isScope(o2) || this.isWindow(o1) || this.isWindow(o2) || this.isArray(o2)) {
                        return false;
                    }
                    keySet = {};
                    if (!this.isArray(diff)) {
                        skipDiff = true;
                    }
                    for (key in o1) {
                        if (key.charAt(0) === "jQuery" || this.isFunction(o1[key])) {
                            continue;
                        }
                        if (!this.equalsDiff(o1[key], o2[key])) {
                            dirty = true;
                            if (!skipDiff) {
                                diff.push({ key: key, oldVal: o2[key], newVal: o1[key] });
                            }
                        }
                        keySet[key] = true;
                    }
                    for (key in o2) {
                        if (!keySet.hasOwnProperty(key) &&
                            key.charAt(0) !== "jQuery" &&
                            o2[key] !== undefined &&
                            !this.isFunction(o2[key])) {
                            return false;
                        }
                    }
                    if (dirty) {
                        return false;
                    }
                    return true;
                }
            }
        }
        return false;
    };
    IgControlBase.prototype.convertToCamelCase = function (str) {
        //convert hyphen to camelCase
        return str.replace(/-([a-z])/g, function (group) {
            return group[1].toUpperCase();
        });
    };
    return IgControlBase;
}());
exports.IgControlBase = IgControlBase;
var IgGridBase = (function (_super) {
    __extends(IgGridBase, _super);
    function IgGridBase(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgGridBase.prototype.ngOnInit = function () {
        this._dataSource = this._opts.dataSource ?
            jQuery.extend(true, [], this._opts.dataSource) :
            jQuery.extend(true, [], this._config.dataSource);
    };
    IgGridBase.prototype.ngAfterContentInit = function () {
        if (this._columns && this._columns.length) {
            if (this._config) {
                this._config["columns"] = this._columns.map(function (c) { return c._settings; });
            }
            else {
                this._opts["columns"] = this._columns.map(function (c) { return c._settings; });
            }
        }
        if (this.featuresList) {
            if (this._config) {
                this._config["features"] = this.featuresList.allFeatures.map(function (c) { return c.initSettings; });
            }
            else {
                this._opts["features"] = this.featuresList.allFeatures.map(function (c) { return c.initSettings; });
            }
        }
        _super.prototype.ngOnInit.call(this);
    };
    IgGridBase.prototype.deleteRow = function (id) {
        var element = jQuery(this._el), tr = element.find("tr[data-id='" + id + "']");
        if (tr.length > 0) {
            tr.remove();
            jQuery(this._el).data(this._widgetName).dataSource.deleteRow(id, true);
            jQuery(this._el).data(this._widgetName).dataSource._removeTransactionsByRecordId(id);
        }
    };
    IgGridBase.prototype.addRow = function (rowData, index) {
        var grid, existingDomRow = jQuery(this._el).find("tr[data-id='" + rowData[this._config.primaryKey] + "']"), pkKey = this._config.primaryKey, widgetName = this._widgetName, existingRow, t;
        if (this._widgetName === "igHierarchicalGrid") {
            widgetName = "igGrid";
        }
        grid = jQuery(this._el).data(widgetName);
        if (existingDomRow.length === 0) {
            grid.renderNewRow(rowData, rowData[pkKey]);
        }
        existingRow = grid.dataSource.findRecordByKey(rowData[pkKey]);
        if (!existingRow) {
            // add the row without affecting the original DS (scope source) 
            // TODO: trigger rowAdded event?
            grid.dataSource._addRow(rowData, index);
            //add transaction
            t = grid.dataSource._createNewRowTransaction(rowData[pkKey], rowData);
            grid.dataSource._addTransaction(t);
            grid.dataSource._removeTransactionByTransactionId(t.tid);
        }
    };
    IgGridBase.prototype.ngDoCheck = function () {
        var _this = this;
        if (this._differ != null && this._allowChangeDetection) {
            this.optionChange();
            this._allowChangeDetection = false;
            var diff = [], element = jQuery(this._el), grid = element.data(this._widgetName), td, i, j, pkKey = this._config.primaryKey, newFormattedVal, record, column;
            if (typeof this._config.dataSource === "string") {
                return;
            }
            //check for changes in collection
            this._changes = this._differ.diff(this._config.dataSource);
            if (this._config.dataSource.length !== this._dataSource.length) {
                this._dataSource = jQuery.extend(true, [], this._config.dataSource);
                if (this._changes) {
                    this._changes.forEachAddedItem(function (r) { return _this.addRow(r.item, r.currentIndex); });
                    this._changes.forEachRemovedItem(function (r) { return _this.deleteRow(r.item[pkKey]); });
                }
            }
            //check for changes in values
            if (!this.equalsDiff(this._config.dataSource, this._dataSource, diff)) {
                this._dataSource = jQuery.extend(true, [], this._config.dataSource);
                for (i = 0; i < diff.length; i++) {
                    for (j = 0; j < diff[i].txlog.length; j++) {
                        record = this._config.dataSource[diff[i].index];
                        td = grid._getCellsByColKey(element.find("tr[data-id='" + record[pkKey] + "']"), diff[i].txlog[j].key);
                        column = grid.columnByKey(diff[i].txlog[j].key);
                        if (column) {
                            if (column.template) {
                                newFormattedVal = grid._renderTemplatedCell(record, column);
                            }
                            else {
                                newFormattedVal = grid._renderCell(diff[i].txlog[j].newVal, column, record);
                            }
                            //if current cell is still in edit mode, exit it.
                            if (jQuery(td).find("input.ui-igedit-input").length > 0) {
                                element.data("igGridUpdating").endEdit();
                            }
                            jQuery(td).html(newFormattedVal);
                            grid.dataSource.updateRow(record[pkKey], record);
                            grid.dataSource._commitTransactionsByRowId(record[pkKey]);
                        }
                    }
                }
            }
        }
    };
    IgGridBase.prototype.allRows = function () { };
    ;
    return IgGridBase;
}(IgControlBase));
__decorate([
    core_1.ContentChildren(Column),
    __metadata("design:type", core_1.QueryList)
], IgGridBase.prototype, "_columns", void 0);
__decorate([
    core_1.ContentChild(Features),
    __metadata("design:type", Features)
], IgGridBase.prototype, "featuresList", void 0);
exports.IgGridBase = IgGridBase;
var IgGridComponent = (function (_super) {
    __extends(IgGridComponent, _super);
    function IgGridComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Returns the element holding the data records
     */
    IgGridComponent.prototype.widget = function () { return; };
    ;
    /**
     * Returns whether grid has non-data fixed columns(e.g. row selectors column)
     */
    IgGridComponent.prototype.hasFixedDataSkippedColumns = function () { return; };
    ;
    /**
     * Returns true if grid has at least one fixed columns(even if a non-data column - like row-selectors column)
     */
    IgGridComponent.prototype.hasFixedColumns = function () { return; };
    ;
    /**
     * Returns the current fixing direction. NOTE - use only if ColumnFixing feature is enabled
     * @return left|right
     */
    IgGridComponent.prototype.fixingDirection = function () { return; };
    ;
    /**
     * Returns whether the column with identifier colKey is fixed
     *
     * @param colKey     An identifier of the column which should be checked. It can be a key or visible index.
     */
    IgGridComponent.prototype.isFixedColumn = function (colKey) { return; };
    ;
    /**
     * Called to detect whether grid container is resized. When autoAdjustHeight is true and height of the grid is changed then the height of grid is re-set.
     */
    IgGridComponent.prototype.resizeContainer = function () { return; };
    ;
    /**
     * Returns whether the header identified by colKey is multicolumn header(has children)
     *
     * @param colKey     value of the column key
     */
    IgGridComponent.prototype.isGroupHeader = function (colKey) { return; };
    ;
    /**
     * Returns an object that contains information on the passed Dom element
     *
     * 				rowId - the id of the record associated with the element - if primaryKey is not set this will be null.
     * 				rowIndex - the index (in the DOM) of the row associated with the element.
     * 				recordIndex - index of the data record associated with this element in the current dataView.
     * 				columnObject  - the column object associated with this element ( if the element is tr this will be null)
     *
     * @param elem    The Dom element or jQuery object which can be a TD or TR element from the grid.
     */
    IgGridComponent.prototype.getElementInfo = function (elem) { return; };
    ;
    /**
     * Returns the ID of the TABLE element where data records are rendered
     */
    IgGridComponent.prototype.id = function () { return; };
    ;
    /**
     * Returns the DIV that is the topmost container of the grid widget
     */
    IgGridComponent.prototype.container = function () { return; };
    ;
    /**
     * Returns the table that contains the header cells
     */
    IgGridComponent.prototype.headersTable = function () { return; };
    ;
    /**
     * Returns the table that contains the footer cells
     */
    IgGridComponent.prototype.footersTable = function () { return; };
    ;
    /**
     * Returns the DIV that is used as a scroll container for the grid contents
     */
    IgGridComponent.prototype.scrollContainer = function () { return; };
    ;
    /**
     * Returns the DIV that is the topmost container of the fixed grid - contains fixed columns(in ColumnFixing scenario)
     */
    IgGridComponent.prototype.fixedContainer = function () { return; };
    ;
    /**
     * Returns the DIV that is the topmost container of the fixed body grid - contains fixed columns(in ColumnFixing scenario)
     */
    IgGridComponent.prototype.fixedBodyContainer = function () { return; };
    ;
    /**
     * Returns container(jQuery representation) containing fixed footer - contains fixed columns(in ColumnFixing scenario)
     */
    IgGridComponent.prototype.fixedFooterContainer = function () { return; };
    ;
    /**
     * Returns container(jQuery representation) containing fixed header - contains fixed columns(in ColumnFixing scenario)
     */
    IgGridComponent.prototype.fixedHeaderContainer = function () { return; };
    ;
    /**
     * Returns the table that contains the FIXED header cells - contains fixed columns(in ColumnFixing scenario)
     */
    IgGridComponent.prototype.fixedHeadersTable = function () { return; };
    ;
    /**
     * Returns the table that contains the footer cells - contains fixed columns(in ColumnFixing scenario)
     */
    IgGridComponent.prototype.fixedFootersTable = function () { return; };
    ;
    /**
     * Returns the cell TD element at the specified location
     *
     * @param x     The column index.
     * @param y     The row index.
     * @param isFixed     Optional parameter - if true get cell TD at the specified location from the fixed table
     */
    IgGridComponent.prototype.cellAt = function (x, y, isFixed) { return; };
    ;
    /**
     * Returns the cell TD element by row id and column key
     *
     * @param rowId     The id of the row.
     * @param columnKey     The column key.
     */
    IgGridComponent.prototype.cellById = function (rowId, columnKey) { return; };
    ;
    /**
     * Returns the fixed table - contains fixed columns(in ColumnFixing scenario). If there aren't fixed columns returns the grid table
     */
    IgGridComponent.prototype.fixedTable = function () { return; };
    ;
    /**
     * Gets all immediate children of the current grid
     */
    IgGridComponent.prototype.immediateChildrenWidgets = function () { return; };
    ;
    /**
     * Gets all children of the current grid, recursively
     */
    IgGridComponent.prototype.childrenWidgets = function () { return; };
    ;
    /**
     * Gets all children's elements of the current grid, recursively
     */
    IgGridComponent.prototype.children = function () { return; };
    ;
    /**
     * Gets all immediate children's elements of the current grid
     */
    IgGridComponent.prototype.immediateChildren = function () { return; };
    ;
    /**
     * Returns the row (TR element) at the specified index. jQuery selectors aren't used for performance reasons
     *
     * @param i     The row index.
     */
    IgGridComponent.prototype.rowAt = function (i) { return; };
    ;
    /**
     * Returns the row TR element by row id
     *
     * @param rowId     The id of the row.
     * @param isFixed     Specify search in the fixed container.
     */
    IgGridComponent.prototype.rowById = function (rowId, isFixed) { return; };
    ;
    /**
     * Returns the fixed row (TR element) at the specified index. jQuery selectors aren't used for performance reasons(in ColumnFixing scenario - only when there is at least one fixed column)
     *
     * @param i     The row index.
     */
    IgGridComponent.prototype.fixedRowAt = function (i) { return; };
    ;
    /**
     * Returns a list of all fixed TR elements holding data in the grid(in ColumnFixing scenario - only when there is at least one fixed column)
     */
    IgGridComponent.prototype.fixedRows = function () { return; };
    ;
    /**
     * Returns a list of all TR elements holding data in the grid(when there is at least one fixed column returns rows only in the UNFIXED table)
     */
    IgGridComponent.prototype.rows = function () { return; };
    ;
    /**
     * Returns all data fixed rows recursively, not only the immediate ones(in ColumnFixing scenario - only when there is at least one fixed column)
     */
    IgGridComponent.prototype.allFixedRows = function () { return; };
    ;
    /**
     * Returns all data rows recursively, not only the immediate ones(when there is at least one fixed column returns rows only in the UNFIXED table)
     */
    IgGridComponent.prototype.allRows = function () { return; };
    ;
    /**
     * Returns a column object by the specified column key
     *
     * @param key     The column key.
     */
    IgGridComponent.prototype.columnByKey = function (key) { return; };
    ;
    /**
     * Returns a column object by the specified header text. If there are multiple matches, returns the first one.
     *
     * @param text     The column header text.
     */
    IgGridComponent.prototype.columnByText = function (text) { return; };
    ;
    /**
     * Returns an array of selected cells in arbitrary order where every objects has the format { element: , row: , index: , rowIndex: , columnKey: } .
     * 				If multiple selection is disabled the function will return null.
     */
    IgGridComponent.prototype.selectedCells = function () { return; };
    ;
    /**
     * Returns an array of selected rows in arbitrary order where every object has the format { element: , index: } .
     * 				If multiple selection is disabled the function will return null.
     */
    IgGridComponent.prototype.selectedRows = function () { return; };
    ;
    /**
     * Returns the currently selected cell that has the format { element: , row: , index: , rowIndex: , columnKey: }, if any.
     * 				If multiple selection is enabled the function will return null.
     */
    IgGridComponent.prototype.selectedCell = function () { return; };
    ;
    /**
     * Returns the currently selected row that has the format { element: , index: }, if any.
     * 				If multiple selection is enabled the function will return null.
     */
    IgGridComponent.prototype.selectedRow = function () { return; };
    ;
    /**
     * Returns the currently active (focused) cell that has the format { element: , row: , index: , rowIndex: , columnKey: }, if any.
     */
    IgGridComponent.prototype.activeCell = function () { return; };
    ;
    /**
     * Returns the currently active (focused) row that has the format { element: , index: }, if any.
     */
    IgGridComponent.prototype.activeRow = function () { return; };
    ;
    /**
     * Retrieves a cell value using the row index and the column key. If a primaryKey is defined, rowId is assumed to be the row Key (not index).
     * 				If primary key is not defined, then rowId is converted to a number and is used as a row index.
     *
     * @param rowId     Row index or row key (primary key).
     * @param colKey     The column key.
     */
    IgGridComponent.prototype.getCellValue = function (rowId, colKey) { return; };
    ;
    /**
     * Returns the cell text. If colKey is a number, the index of the column is used (instead of a column name)- does not apply when using a Multi-Row Layout grid.
     * 				This is the actual text (or HTML string) for the contents of the cell.
     *
     * @param rowId     Row index or row data key (primary key)
     * @param colKey     Column key.
     */
    IgGridComponent.prototype.getCellText = function (rowId, colKey) { return; };
    ;
    /**
     * Sets a new template for a column after initialization and renders the grid if not explicitly disabled. This method will replace any existing explicitly set row template and will build one anew from the column ones.
     *
     * @param col     An identifier of the column to set template for (index or key)
     * @param tmpl     The column template to set
     * @param render     Should the grid rerender after template is set
     */
    IgGridComponent.prototype.setColumnTemplate = function (col, tmpl, render) { return; };
    ;
    /**
     * Commits all pending transactions to the client data source. Note that there won't be anything to commit on the UI, since it is updated instantly. In order to rollback the actual UI, a call to dataBind() is required.
     *
     * @param rowId     If specified, will commit only that transaction corresponding to the specified record key.
     */
    IgGridComponent.prototype.commit = function (rowId) { return; };
    ;
    /**
     * Clears the transaction log (delegates to igDataSource). Note that this does not update the UI. In case the UI must be updated, set the second parameter "updateUI" to true, which will trigger a call to dataBind() to re-render the contents.
     *
     * @param rowId     If specified, will only rollback the transactions with that row id.
     * @param updateUI     Whether to update the UI or not.
     */
    IgGridComponent.prototype.rollback = function (rowId, updateUI) { return; };
    ;
    /**
     * Returns a record by a specified key (requires that primaryKey is set in the settings).
     * 				That is a wrapper for this.dataSource.findRecordByKey(key).
     *
     * @param key     Primary key of the record
     */
    IgGridComponent.prototype.findRecordByKey = function (key) { return; };
    ;
    /**
     * Returns a standalone object (copy) that represents the committed transactions, but detached from the data source.
     * 				That is a wrapper for this.dataSource.getDetachedRecord(t).
     *
     * @param t     A transaction object.
     */
    IgGridComponent.prototype.getDetachedRecord = function (t) { return; };
    ;
    /**
     * Returns a list of all transaction objects that are pending to be committed or rolled back to the data source.
     * 				That is a wrapper for this.dataSource.pendingTransactions().
     */
    IgGridComponent.prototype.pendingTransactions = function () { return; };
    ;
    /**
     * Returns a list of all transaction objects that are either pending, or have been committed in the data source.
     * 				That is a wrapper for this.dataSource.allTransactions().
     */
    IgGridComponent.prototype.allTransactions = function () { return; };
    ;
    /**
     * Returns the accumulated transaction log as a string. The purpose of this is to be passed to URLs or used conveniently.
     * 				That is a wrapper for this.dataSource.transactionsAsString().
     */
    IgGridComponent.prototype.transactionsAsString = function () { return; };
    ;
    /**
     * Invokes an AJAX request to the updateUrl option (if specified) and passes the serialized transaction log (a serialized JSON string) as part of the POST request.
     *
     * @param success    Specifies a custom function to be called when AJAX request to the updateUrl option succeeds(optional)
     * @param error    Specifies a custom function to be called when AJAX request to the updateUrl option fails(optional)
     */
    IgGridComponent.prototype.saveChanges = function (success, error) { return; };
    ;
    /**
     * Adds a new row (TR) to the grid, by taking a data row object. Assumes the record will have the primary key.
     *
     * @param rec     Identifier/key of row. If missing, then number of rows in grid is used.
     */
    IgGridComponent.prototype.renderNewRow = function (rec) { return; };
    ;
    /**
     * If the data source points to a local JSON array of data, and it is necessary to reset it at runtime, it must be done through this API member instead of the options (options.dataSource)
     *
     * @param dataSource     New data source object.
     */
    IgGridComponent.prototype.dataSourceObject = function (dataSource) { return; };
    ;
    /**
     * Returns the total number of records in the underlying backend. If paging or filtering is enabled, this may differ from the number of records in the client-side data source.
     * 				In order for this to work, the response JSON/XML must include a property that specifies the total number of records, which name is specified by options.responseTotalRecCountKey.
     * 				This functionality is completely delegated to the data source control.
     */
    IgGridComponent.prototype.totalRecordsCount = function () { return; };
    ;
    /**
     * Causes the grid to data bind to the data source (local or remote) , and re-render all of the data as well
     *
     * @param internal
     */
    IgGridComponent.prototype.dataBind = function (internal) { return; };
    ;
    /**
     * Moves a visible column at a specified place, in front or behind a target column or at a target index
     * 			Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param column    An identifier of the column to be moved. It can be a key, a Multi-Column Header identificator, or an index in a number format. The latter is not supported when the grid contains multi-column headers.
     * @param target    An identifier of a column where the moved column should move to or an index at which the moved column should be moved to. In the case of a column identifier the column will be moved after it by default.
     * @param after    Specifies whether the column moved should be moved after or before the target column. This parameter is disregarded if there is no target column specified but a target index is used.
     * @param inDom    Specifies whether the column moving will be enacted through DOM manipulation or through rerendering of the grid.
     * @param callback    Specifies a custom function to be called when the column is moved.
     */
    IgGridComponent.prototype.moveColumn = function (column, target, after, inDom, callback) { return; };
    ;
    /**
     * Shows a hidden column. If the column is not hidden the method does nothing.
     * 				Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param column     An identifier for the column. If a number is provided it will be used as a column index. If a string is provided it will be used as a column key.
     * @param callback     Specifies a custom function to be called when the column is shown(optional)
     */
    IgGridComponent.prototype.showColumn = function (column, callback) { return; };
    ;
    /**
     * Hides a visible column. If the column is hidden the method does nothing.
     * 				Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param column     An identifier for the column. If a number is provided it will be used as a column index else if a string is provided it will be used as a column key.
     * @param callback     Specifies a custom function to be called when the column is hidden(optional)
     */
    IgGridComponent.prototype.hideColumn = function (column, callback) { return; };
    ;
    /**
     * Gets unbound values for the specified column key. If key is not specified returns all unboundvalues
     *
     * @param key     column key
     */
    IgGridComponent.prototype.getUnboundValues = function (key) { return; };
    ;
    /**
     * Sets unbound values for the unbound column with the specified key. If removeOldValues is true then values(if any) for the unbound columns are re-set with the new values
     *
     * @param key     key of the unbound column
     * @param values     array of values to be set on unbound values
     * @param removeOldValues     if true removes current unbound values(if any) for the specified column and apply the new ones specified in parameter values. Otherwise merge current values with the specified in parameter values
     */
    IgGridComponent.prototype.setUnboundValues = function (key, values, removeOldValues) { return; };
    ;
    /**
     * Sets unbound value for the unbound cell by the specified column key and row primary key.
     *
     * @param col     key of the unbound column
     * @param rowId     primary key value of the row
     * @param val     value to be set on unbound cell
     * @param notToRender     if false will re-render the row
     */
    IgGridComponent.prototype.setUnboundValueByPK = function (col, rowId, val, notToRender) { return; };
    ;
    /**
     * Returns an unbound column with the specified key. If not found returns null
     *
     * @param key    a column key
     */
    IgGridComponent.prototype.getUnboundColumnByKey = function (key) { return; };
    ;
    /**
     * Returns whether there is vertical scrollbar. Because of perfrormance issues in older Internet Explorer especially 8,9 - there is no need to check if height is not set - there is no scrollbar OR if row virtualization is enabled - it is supposed there is vertical scrollbar
     */
    IgGridComponent.prototype.hasVerticalScrollbar = function () { return; };
    ;
    /**
     * Auto resize columns that have property width set to "*" so content to be auto-fitted(not shrinked/cutted). Auto-resizing is applied ONLY for visible columns
     */
    IgGridComponent.prototype.autoSizeColumns = function () { return; };
    ;
    /**
     * Calculates the width of the column so its content to be auto-fitted to the width of the data in it(the content should NOT be shrinked/cutted)
     *
     * @param columnIndex    Visible column index
     */
    IgGridComponent.prototype.calculateAutoFitColumnWidth = function (columnIndex) { return; };
    ;
    /**
     * Get visible index by specified column key. If column is not found or is hidden then returns -1.
     * 				Note: Method does not count column groups (Multi-Column Headers).
     *
     * @param columnKey     columnKey
     * @param includeDataSkip     Optional parameter - if set to true include non data columns(like expander column, row selectors column, etc.) in calculations
     */
    IgGridComponent.prototype.getVisibleIndexByKey = function (columnKey, includeDataSkip) { return; };
    ;
    /**
     * When called the method re-renders the whole grid(also rebinds to the data source) and renders the cols object
     *
     * @param cols an array of column objects
     */
    IgGridComponent.prototype.renderMultiColumnHeader = function (cols) { return; };
    ;
    /**
     * Scroll to the specified row or specified position(in pixels)
     *
     * @param scrollerPosition     An identifier of the vertical scroll position. When it is string then it is interpreted as pixels otherwise it is the row number
     */
    IgGridComponent.prototype.virtualScrollTo = function (scrollerPosition) { return; };
    ;
    /**
     * Returns column object and visible index for the table cell(TD) which is passed as argument
     *
     * @param $td     cell(TD) - either DOM TD element or jQuery object
     */
    IgGridComponent.prototype.getColumnByTD = function ($td) { return; };
    ;
    /**
     * Destroy is part of the jQuery UI widget API and does the following:
     * 				1. Remove custom CSS classes that were added.
     * 				2. Unwrap any wrapping elements such as scrolling divs and other containers.
     * 				3. Unbind all events that were bound.
     *
     * @param notToCallDestroy
     */
    IgGridComponent.prototype.destroy = function (notToCallDestroy) { return; };
    ;
    return IgGridComponent;
}(IgGridBase));
IgGridComponent = __decorate([
    core_1.Component({
        "selector": "ig-grid",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "autoAdjustHeight", "avgRowHeight", "avgColumnWidth", "defaultColumnWidth", "autoGenerateColumns", "virtualization", "virtualizationMode", "requiresDataBinding", "rowVirtualization", "columnVirtualization", "virtualizationMouseWheelStep", "adjustVirtualHeights", "templatingEngine", "columns", "dataSource", "dataSourceUrl", "dataSourceType", "responseDataKey", "responseTotalRecCountKey", "requestType", "responseContentType", "showHeader", "showFooter", "fixedHeaders", "fixedFooters", "caption", "features", "tabIndex", "localSchemaTransform", "primaryKey", "serializeTransactionLog", "autoCommit", "aggregateTransactions", "autoFormat", "renderCheckboxes", "updateUrl", "restSettings", "alternateRowStyles", "autofitLastColumn", "enableHoverStyles", "enableUTCDates", "mergeUnboundColumns", "jsonpRequest", "enableResizeContainerCheck", "featureChooserIconDisplay", "scrollSettings"],
        outputs: ["cellClick", "cellRightClick", "dataBinding", "dataBound", "rendering", "rendered", "dataRendering", "dataRendered", "headerRendering", "headerRendered", "footerRendering", "footerRendered", "headerCellRendered", "rowsRendering", "rowsRendered", "schemaGenerated", "columnsCollectionModified", "requestError", "created", "destroyed"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgGridComponent);
exports.IgGridComponent = IgGridComponent;
var IgTreeGridComponent = (function (_super) {
    __extends(IgTreeGridComponent, _super);
    function IgTreeGridComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgTreeGridComponent.prototype.deleteRow = function (id) {
        var element = jQuery(this._el), tr = element.find("tr[data-id='" + id + "']"), dataLevel = tr.attr("aria-level");
        if (tr.length > 0) {
            element.data(this._widgetName).dataSource.deleteRow(id, true);
            element.data(this._widgetName).dataSource._removeTransactionsByRecordId(id);
            var trs = tr.nextUntil("tr[data-level=" + dataLevel + "]");
            if (trs.length === 0) {
                trs = tr.nextAll("tr[data-level]");
            }
            tr.remove();
            trs.remove();
        }
    };
    // ngDoCheck() {
    // 	if (this._differ != null && this._allowChangeDetection) {
    // 		this.optionChange();
    // 		this._allowChangeDetection = false;
    // 		var diff = [],
    // 			element = jQuery(this._el),
    // 			grid = element.data(this._widgetName),
    // 			colIndex, td, i, j, pkKey = this._config.primaryKey, newFormattedVal, record, column;
    // 		//check for changes in collection
    // 		this._changes = this._differ.diff(this._config.dataSource);
    // 		if (this._config.dataSource.length !== this._dataSource.length) {
    // 			this._dataSource = jQuery.extend(true, [], this._config.dataSource);
    // 			if (this._changes) {
    // 				this._changes.forEachAddedItem(r => this.addRow(r.item, r.currentIndex));
    // 				this._changes.forEachRemovedItem(r => this.deleteRow(r.item[pkKey]))
    // 			}
    // 		}
    // 		//check for changes in values
    // 		if (!this.equalsDiff(this._config.dataSource, this._dataSource, diff)) {
    // 			this._dataSource = jQuery.extend(true, [], this._config.dataSource);
    // 			for (i = 0; i < diff.length; i++) {
    // 				for (j = 0; j < diff[i].txlog.length; j++) {
    // 					colIndex = element.data(this._widgetName)._getCellIndexByColumnKey(diff[i].txlog[j].key);
    // 					record = this._config.dataSource[diff[i].index];
    // 					td = element.find("tr[data-id='" + record[pkKey] + "']").children().get(colIndex);
    // 					column = element.data(this._widgetName).columnByKey(diff[i].txlog[j].key);
    // 					if (column) {
    // 						if (column.template) {
    // 							newFormattedVal = grid._renderTemplatedCell(record, column);
    // 						} else {
    // 							newFormattedVal = grid._renderCell(diff[i].txlog[j].newVal, column, record);
    // 						}
    // 						jQuery(td).html(newFormattedVal);
    // 						grid.dataSource.updateRow(record[pkKey], record);
    // 						grid.dataSource._commitTransactionsByRowId(record[pkKey]);
    // 					} else if (diff[i].txlog[j].key === this._config.childDataKey) {
    // 						//we have an hierarchical data source and one of the nested collections has changed.
    // 						grid.dataBind();
    // 					}
    // 				}
    // 			}
    // 		}
    // 	}
    // }
    /**
     * Clears the transaction log (delegates to igDataSource). Note that this does not update the UI. In case the UI must be updated, set the second parameter "updateUI" to true, which will trigger a call to dataBind() to re-render the contents.
     *
     * @param rowId     If specified, will only rollback the transactions with that row id.
     * @param updateUI     Whether to update the UI or not.
     */
    IgTreeGridComponent.prototype.rollback = function (rowId, updateUI) { return; };
    ;
    /**
     * Causes the treegrid to data bind to the data source (local or remote) , and re-render all of the data
     */
    IgTreeGridComponent.prototype.dataBind = function () { return; };
    ;
    /**
     * Toggle row by specified row or row identifier
     *
     * @param row     jQuery table row object or a row id.
     * @param callback     Specifies a custom function to be called when row is expanded/collapsed. The callback has 4 arguments- a reference to the current context(this), object that holds 2 properties(unfixedRow - DOM representation of the unfixed row, fixedRow - DOM representation of the fixed row, if there is no fixed columns it is undefined), reference to the dataRecord, expand - specifies whether row is expanded
     */
    IgTreeGridComponent.prototype.toggleRow = function (row, callback) { return; };
    ;
    /**
     * Expands a parent row by specified row or row identifier
     *
     * @param row     jQuery table row object or a row id.
     * @param callback     Specifies a custom function to be called when row is expanded/collapsed. The callback has 4 arguments- a reference to the current context(this), object that holds 2 properties(unfixedRow - DOM representation of the unfixed row, fixedRow - DOM representation of the fixed row, if there is no fixed columns it is undefined), reference to the dataRecord, expand - specifies whether row is expanded
     */
    IgTreeGridComponent.prototype.expandRow = function (row, callback) { return; };
    ;
    /**
     * Collapses a parent row by specified row or row identifier
     *
     * @param row     jQuery table row object, raw DOM row object or a row id.
     * @param callback     Specifies a custom function to be called when row is expanded/collapsed. The callback has 4 arguments- a reference to the current context(this), object that holds 2 properties(unfixedRow - DOM representation of the unfixed row, fixedRow - DOM representation of the fixed row, if there is no fixed columns it is undefined), reference to the dataRecord, expand - specifies whether row is expanded
     */
    IgTreeGridComponent.prototype.collapseRow = function (row, callback) { return; };
    ;
    /**
     * Adds a new row (TR) to the grid as a child of a specific row, by taking a data row object. Assumes the record will have the primary key.
     *
     * @param rec     The data row JavaScript object.
     * @param parentId     Identifier/key of the targeted parent row. If missing, then the new row is rendered to the bottom of the grid.
     */
    IgTreeGridComponent.prototype.renderNewChild = function (rec, parentId) { return; };
    ;
    /**
     * Destroys igTreeGrid
     */
    IgTreeGridComponent.prototype.destroy = function () { return; };
    ;
    return IgTreeGridComponent;
}(IgGridBase));
IgTreeGridComponent = __decorate([
    core_1.Component({
        selector: "ig-tree-grid",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "autoAdjustHeight", "avgRowHeight", "avgColumnWidth", "defaultColumnWidth", "autoGenerateColumns", "virtualization", "virtualizationMode", "requiresDataBinding", "rowVirtualization", "columnVirtualization", "virtualizationMouseWheelStep", "adjustVirtualHeights", "templatingEngine", "columns", "dataSource", "dataSourceUrl", "dataSourceType", "responseDataKey", "responseTotalRecCountKey", "requestType", "responseContentType", "showHeader", "showFooter", "fixedHeaders", "fixedFooters", "caption", "features", "tabIndex", "localSchemaTransform", "primaryKey", "serializeTransactionLog", "autoCommit", "aggregateTransactions", "autoFormat", "renderCheckboxes", "updateUrl", "restSettings", "alternateRowStyles", "autofitLastColumn", "enableHoverStyles", "enableUTCDates", "mergeUnboundColumns", "jsonpRequest", "enableResizeContainerCheck", "featureChooserIconDisplay", "scrollSettings", "indentation", "initialIndentationLevel", "showExpansionIndicator", "expandTooltipText", "collapseTooltipText", "foreignKey", "initialExpandDepth", "foreignKeyRootValue", "renderExpansionIndicatorColumn", "renderFirstDataCellFunction", "childDataKey", "renderExpansionCellFunction", "enableRemoteLoadOnDemand", "dataSourceSettings"],
        outputs: ["cellClick", "cellRightClick", "dataBinding", "dataBound", "rendering", "rendered", "dataRendering", "dataRendered", "headerRendering", "headerRendered", "footerRendering", "footerRendered", "headerCellRendered", "rowsRendering", "rowsRendered", "schemaGenerated", "columnsCollectionModified", "requestError", "created", "destroyed", "rowExpanding", "rowExpanded", "rowCollapsing", "rowCollapsed"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgTreeGridComponent);
exports.IgTreeGridComponent = IgTreeGridComponent;
var IgHierarchicalGridComponent = (function (_super) {
    __extends(IgHierarchicalGridComponent, _super);
    function IgHierarchicalGridComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgHierarchicalGridComponent.prototype.deleteRow = function (id) {
        var element = jQuery(this._el), tr = element.find("tr[data-id='" + id + "']"), childContainer = tr.next("tr[data-container]");
        if (tr.length > 0) {
            tr.remove();
            childContainer.remove();
            element.data("igGrid").dataSource.deleteRow(id, true);
            element.data("igGrid").dataSource._removeTransactionsByRecordId(id);
        }
    };
    IgHierarchicalGridComponent.prototype.ngDoCheck = function () {
        var _this = this;
        this.optionChange();
        if (this._differ != null && this._allowChangeDetection) {
            this._allowChangeDetection = false;
            var diff = [], element = jQuery(this._el), colIndex, td, i, j, pkKey = this._config.primaryKey, newFormattedVal, record, column, mainGrid = element.data("igGrid"), data = this._config.dataSource;
            //check for changes in collection
            this._changes = this._differ.diff(this._config.dataSource);
            if (this._config.dataSource.length !== this._dataSource.length) {
                this._dataSource = jQuery.extend(true, [], this._config.dataSource);
                if (this._changes) {
                    this._changes.forEachAddedItem(function (r) { return _this.addRow(r.item, r.currentIndex); });
                    this._changes.forEachRemovedItem(function (r) { return _this.deleteRow(r.item[pkKey]); });
                }
            }
            //check for changes in data source values
            if (!this.equalsDiff(this._config.dataSource, this._dataSource, diff)) {
                this._dataSource = jQuery.extend(true, [], this._config.dataSource);
                for (i = 0; i < diff.length; i++) {
                    for (j = 0; j < diff[i].txlog.length; j++) {
                        var childGrid = element.data(this._widgetName).allChildrenWidgets().filter(function (indx) {
                            var parentRow = jQuery(this.element).closest('tr[data-container]').prev();
                            var parentGridPK = parentRow.closest(".ui-iggrid-table").data("igGrid").options.primaryKey;
                            return (this.options.childrenDataProperty === diff[i].txlog[j].key ||
                                parentRow.next("[data-container]").find("table[role='grid']").attr("id").contains("_" + diff[i].txlog[j].key + "_"))
                                && parentRow.attr("data-id") == data[diff[i].index][parentGridPK];
                        });
                        if (childGrid.length > 0) {
                            jQuery(childGrid).each(function () {
                                this.dataBind();
                            });
                        }
                        else {
                            colIndex = mainGrid._getCellIndexByColumnKey(diff[i].txlog[j].key);
                            record = this._config.dataSource[diff[i].index];
                            td = element.find("tr[data-id='" + record[pkKey] + "']").children().get(colIndex);
                            column = mainGrid.columnByKey(diff[i].txlog[j].key);
                            if (column) {
                                if (column.template) {
                                    newFormattedVal = mainGrid._renderTemplatedCell(record, column);
                                }
                                else {
                                    newFormattedVal = mainGrid._renderCell(diff[i].txlog[j].newVal, column, record);
                                }
                                jQuery(td).html(newFormattedVal);
                                mainGrid.dataSource.updateRow(record[pkKey], record);
                                mainGrid.dataSource._commitTransactionsByRowId(record[pkKey]);
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * Data binds the hierarchical grid. No child grids will be created or rendered by default, unless there is initialExpandDepth >= 0 set.
     */
    IgHierarchicalGridComponent.prototype.dataBind = function () { return; };
    ;
    /**
     * Returns the element of the root grid (igGrid)
     */
    IgHierarchicalGridComponent.prototype.root = function () { return; };
    ;
    /**
     * Returns the widget object of the root grid (igGrid)
     */
    IgHierarchicalGridComponent.prototype.rootWidget = function () { return; };
    ;
    /**
     * Returns a flat list of all child grid elements (recursive)
     */
    IgHierarchicalGridComponent.prototype.allChildren = function () { return; };
    ;
    /**
     * Expands or collapses (toggles) a parent row
     * 				Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param element     accepts a dom element, or a jquery wrapped dom element that should be a TR and should specify a parent row
     * @param callback     Specifies a custom function to be called when parent row is toggled(optional). Takes 2 arguments - first is hierarchical grid object, second is the row element that was toggled
     */
    IgHierarchicalGridComponent.prototype.toggle = function (element, callback) { return; };
    ;
    /**
     * Expands (toggles) a parent row
     * 				Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param id     accepts a dom element, or a jquery wrapped dom element that should be a TR and should specify a parent row
     * @param callback     Specifies a custom function to be called when parent row is expanded(optional). Takes 2 arguments first is hierarchical grid object, second is the row element that was expanded
     */
    IgHierarchicalGridComponent.prototype.expand = function (id, callback) { return; };
    ;
    /**
     * Collapses a parent row
     * 				Note: This method is asynchronous which means that it returns immediately and any subsequent code will execute in parallel. This may lead to runtime errors. To avoid them put the subsequent code in the callback parameter provided by the method.
     *
     * @param id     accepts a dom element, or a jquery wrapped dom element that should be a TR and should specify a parent row
     * @param callback     Specifies a custom function to be called when parent row is expanded(optional). Takes 2 arguments - first is hierarchical grid object, second is the row element that was collapsed
     */
    IgHierarchicalGridComponent.prototype.collapse = function (id, callback) { return; };
    ;
    /**
     * Checks if a parent row is currently collapsed
     *
     * @param element     accepts a dom element, or a jquery wrapped dom element that should be a TR and should specify a parent row
     */
    IgHierarchicalGridComponent.prototype.collapsed = function (element) { return; };
    ;
    /**
     * Checks if a parent row is populated with data
     *
     * @param element     accepts a dom element, or a jquery wrapped dom element that should be a TR and should specify a parent row
     */
    IgHierarchicalGridComponent.prototype.populated = function (element) { return; };
    ;
    /**
     * Commits pending transactions to the client data source for main and all child grids.
     */
    IgHierarchicalGridComponent.prototype.commit = function () { return; };
    ;
    /**
     * Clears the transaction log (delegates to igDataSource). Note that this does not update the UI. In case the UI must be updated, set the second parameter "updateUI" to true, which will trigger a call to dataBind() to re-render the contents.
     *
     * @param rebind     Whether to perform a rebind.
     */
    IgHierarchicalGridComponent.prototype.rollback = function (rebind) { return; };
    ;
    /**
     * Posts to the settings.updateUrl using $.ajax, by serializing the changes as url params
     *
     * @param success    Specifies a custom function to be called when AJAX request to the updateUrl option succeeds(optional)
     * @param error    Specifies a custom function to be called when AJAX request to the updateUrl option fails(optional)
     */
    IgHierarchicalGridComponent.prototype.saveChanges = function (success, error) { return; };
    ;
    /**
     * Destroys the hierarchical grid by recursively destroying all child grids
     */
    IgHierarchicalGridComponent.prototype.destroy = function () { return; };
    ;
    return IgHierarchicalGridComponent;
}(IgGridBase));
IgHierarchicalGridComponent = __decorate([
    core_1.Component({
        selector: "ig-hierarchical-grid",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "initialDataBindDepth", "initialExpandDepth", "odata", "rest", "maxDataBindDepth", "defaultChildrenDataProperty", "autoGenerateLayouts", "expandCollapseAnimations", "expandColWidth", "pathSeparator", "animationDuration", "expandTooltip", "collapseTooltip", "columnLayouts", "width", "height", "autoAdjustHeight", "avgRowHeight", "avgColumnWidth", "defaultColumnWidth", "autoGenerateColumns", "virtualization", "virtualizationMode", "requiresDataBinding", "rowVirtualization", "columnVirtualization", "virtualizationMouseWheelStep", "adjustVirtualHeights", "templatingEngine", "columns", "dataSource", "dataSourceUrl", "dataSourceType", "responseDataKey", "responseTotalRecCountKey", "requestType", "responseContentType", "showHeader", "showFooter", "fixedHeaders", "fixedFooters", "caption", "features", "tabIndex", "localSchemaTransform", "primaryKey", "serializeTransactionLog", "autoCommit", "aggregateTransactions", "autoFormat", "renderCheckboxes", "updateUrl", "restSettings", "alternateRowStyles", "autofitLastColumn", "enableHoverStyles", "enableUTCDates", "mergeUnboundColumns", "jsonpRequest", "enableResizeContainerCheck", "featureChooserIconDisplay", "scrollSettings"],
        outputs: ["rowExpanding", "rowExpanded", "rowCollapsing", "rowCollapsed", "childrenPopulating", "childrenPopulated", "childGridRendered", "childGridCreating", "childGridCreated", "cellClick", "cellRightClick", "dataBinding", "dataBound", "rendering", "rendered", "dataRendering", "dataRendered", "headerRendering", "headerRendered", "footerRendering", "footerRendered", "headerCellRendered", "rowsRendering", "rowsRendered", "schemaGenerated", "columnsCollectionModified", "requestError", "created", "destroyed"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgHierarchicalGridComponent);
exports.IgHierarchicalGridComponent = IgHierarchicalGridComponent;
var IgComboComponent = (function (_super) {
    __extends(IgComboComponent, _super);
    function IgComboComponent(model, el, renderer, differs) {
        var _this = _super.call(this, el, renderer, differs) || this;
        _this.model = model;
        _this.onChange = function (_) {
        };
        _this.onTouched = function () {
        };
        if (model) {
            model.valueAccessor = _this;
            _this._model = model;
        }
        return _this;
    }
    IgComboComponent.prototype.ngOnInit = function () {
        var that = this;
        _super.prototype.ngOnInit.call(this);
        jQuery(this._el).on(this._widgetName.toLowerCase() + "selectionchanged", function (evt, ui) {
            var items = ui.items;
            if (items.length > 0 && that._model) {
                that._model.viewToModelUpdate(items[0].data[that._config.valueKey]);
            }
        });
        this._dataSource = jQuery.extend(true, [], this._config.dataSource);
        //manually call writeValue, because the LifeCycle has been changed and writeValue is executed before ngOnInit
        if (this._model) {
            this.writeValue(this._model.value);
        }
    };
    IgComboComponent.prototype.writeValue = function (value) {
        if (!!jQuery(this._el).data(this._widgetName)) {
            jQuery(this._el)[this._widgetName]("value", value);
        }
    };
    IgComboComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    IgComboComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    IgComboComponent.prototype.ngDoCheck = function () {
        if (this._differ != null && this._allowChangeDetection) {
            this.optionChange();
            this._allowChangeDetection = false;
            var diff = [];
            var element = jQuery(this._el);
            var i, j, valKey = this._config.valueKey, record, item;
            //check for changes in collection
            this._changes = this._differ.diff(this._config.dataSource);
            if (this._config.dataSource && this._config.dataSource.length !== this._dataSource.length) {
                this._dataSource = jQuery.extend(true, [], this._config.dataSource);
                if (this._changes) {
                    this._changes.forEachAddedItem(function (r) { return element.data("igCombo").dataBind(); });
                    this._changes.forEachRemovedItem(function (r) { return element.data("igCombo").dataBind(); });
                    if (this.model && this.model.value) {
                        this.writeValue(this.model.value);
                    }
                }
            }
            if (!this.equalsDiff(this._config.dataSource, this._dataSource, diff)) {
                this._dataSource = jQuery.extend(true, [], this._config.dataSource);
                for (i = 0; i < diff.length; i++) {
                    for (j = 0; j < diff[i].txlog.length; j++) {
                        record = this._config.dataSource[diff[i].index];
                        item = element.data("igCombo").itemsFromIndex(diff[i].index);
                        element.data("igCombo")._updateItem(item.element, record);
                        if (element.data("igCombo").isSelected(item.element)) {
                            //should update the input
                            element.data("igCombo")._updateInputValues(false);
                        }
                    }
                }
            }
        }
    };
    /**
     * Performs databinding on the combo box. The [databinding](ui.igcombo#events:dataBinding) and [dataBound](ui.igcombo#events:dataBound) events are always raised.
     */
    IgComboComponent.prototype.dataBind = function () { return; };
    ;
    /**
     * Forces an update of the igCombo value according to the current text in the igCombo input.
     *
     * 				The refresh is primarily intended to be used with [allowCustomValue](ui.igcombo#options:allowCustomValue) set to true.
     * 				The refresh will take the current text and, if no selection is applied, will set it as igCombo value provided that [allowCustomValue](ui.igcombo#options:allowCustomValue) true.
     */
    IgComboComponent.prototype.refreshValue = function () { return; };
    ;
    /**
     * Gets the associated data of an item by value matching it's [valueKey](ui.igcombo#options:valueKey) property.
     *
     * @param value Value matching the valueKey property of item to be tested if it is selected
     */
    IgComboComponent.prototype.dataForValue = function (value) { return; };
    ;
    /**
     * Gets the associated data of li element in the combo.
     *
     * @param $element jQuery element of item in the drop down list
     */
    IgComboComponent.prototype.dataForElement = function ($element) { return; };
    ;
    /**
     * Gets object/s containing data and list item in the combo by element/s.
     *
     * @param $element jQuery object with drop down list item element or elements
     */
    IgComboComponent.prototype.itemsFromElement = function ($element) { return; };
    ;
    /**
     * Gets object/s containing data and list item in the combo by value/s.
     *
     * @param value Value of item in the drop down list or array with values.
     */
    IgComboComponent.prototype.itemsFromValue = function (value) { return; };
    ;
    /**
     * Gets object/s containing data and list item in the combo by index/es.
     *
     * @param index Index or array of indexes of items in the drop down list
     */
    IgComboComponent.prototype.itemsFromIndex = function (index) { return; };
    ;
    /**
     * Gets array with data and objects representing li elements in combo box.
     */
    IgComboComponent.prototype.items = function () { return; };
    ;
    /**
     * Gets array with objects representing the filtered li elements in combo box.
     */
    IgComboComponent.prototype.filteredItems = function () { return; };
    ;
    /**
     * Gets array with objects representing selected li elements in combo box.
     */
    IgComboComponent.prototype.selectedItems = function () { return; };
    ;
    /**
     * Triggers filtering.
     *
     * @param texts Filter by string, or array of strings.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [filtering](ui.igcombo#events:filtering) and [filtered](ui.igcombo#events:filtered) events.
     */
    IgComboComponent.prototype.filter = function (texts, event) { return; };
    ;
    /**
     * Clears filtering.
     *
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [filtering](ui.igcombo#events:filtering) and [filtered](ui.igcombo#events:filtered) events.
     */
    IgComboComponent.prototype.clearFiltering = function (event) { return; };
    ;
    /**
     * Opens the drop-down.
     *
     * @param callback Specifies callback function to be executed when open animation is completed.
     * @param focusCombo Set to false to not focus combo"s text input after the drop down is opened. By default the combo's input is focused.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [dropDownOpening](ui.igcombo#events:dropDownOpening) and [dropDownOpened](ui.igcombo#events:dropDownOpened) events.
     */
    IgComboComponent.prototype.openDropDown = function (callback, focusCombo, event) { return; };
    ;
    /**
     * Closes the drop down.
     *
     * @param callback Specifies callback function to be executed when close animation is completed.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [dropDownClosing](ui.igcombo#events:dropDownClosing) and [dropDownClosed](ui.igcombo#events:dropDownClosed) events.
     */
    IgComboComponent.prototype.closeDropDown = function (callback, event) { return; };
    ;
    /**
     * Clears the input text, resets highlighting, filtering and selection.
     *
     * @param options     Object with set of options controlling the behavior of this api method.
     focusCombo (boolean): Set to true to focus combo after clearing the input.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
     */
    IgComboComponent.prototype.clearInput = function (options, event) { return; };
    ;
    /**
     * Verifies whether a specified value is selected.
     *
     * @param value Value matching the [valueKey](ui.igcombo#options:valueKey) property of item to be tested if it is selected
     */
    IgComboComponent.prototype.isValueSelected = function (value) { return; };
    ;
    /**
     * Verifies whether the li representing the data source's record at the specified index is selected.
     *
     * @param index Index of data source record
     */
    IgComboComponent.prototype.isIndexSelected = function (index) { return; };
    ;
    /**
     * Selects list item/items from the drop-down list by specified value or array of values. When called witout params will return the value of the selected item or if [multiSelection](ui.igcombo#options:multiSelection) is enabled array of selected values.
     *
     * @param value Value or array of values matching the valueKey property of item/items to be selected
     * @param options Object with set of options controlling the behavior of this api method.
                    closeDropDown (boolean): Set to true to close the drop down list after the selection.
                    focusCombo (boolean): Set to true to focus combo after the selection.
                    additive (boolean): Set to true to select the item without losing other selection. Works only when multi selection is enabled.
                    keepFiltering (boolean): Set to true to keep filtering after the selection. By default the filtering is cleared.
                    keepInputText (boolean): Set to true to keep input text unchanged after the selection. By default input text is updated.
                    keepHighlighting (boolean): Set to true to keep highlighting unchanged after the selection. By default highlighting is removed.
                    keepNavItem (boolean): Set to true to keep current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
                    keepScrollPosition (boolean): Set to true to keep current scroll position. By default the scroll position will change so that the last selected item is visible.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
     */
    IgComboComponent.prototype.value = function (value, options, event) { return; };
    ;
    /**
     * Selects a list item from the drop-down list.
     *
     * @param $items jQuery object with item or items to be selected.
     * @param options Object with set of options controlling the behavior of this api method.
                    closeDropDown (boolean): Set to true to close the drop down list after the selection.
                    focusCombo (boolean): Set to true to focus combo after the selection.
                    additive (boolean): Set to true to select the item without losing other selection. Works only when multi selection is enabled.
                    keepFiltering (boolean): Set to true to keep filtering after the selection. By default the filtering is cleared.
                    keepInputText (boolean): Set to true to keep input text unchanged after the selection. By default input text is updated.
                    keepHighlighting (boolean): Set to true to keep highlighting unchanged after the selection. By default highlighting is removed.
                    keepNavItem (boolean): Set to true to keep current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
                    keepScrollPosition (boolean): Set to true to keep current scroll position. By default the scroll position will change so that the last selected item is visible.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
     */
    IgComboComponent.prototype.select = function ($items, options, event) { return; };
    ;
    /**
     * Gets/Sets selected item/s from the drop-down list by specified index.
     *
     * @param index Index or array of indexes of items to be selected
     * @param options Object with set of options controlling the behavior of this api method.
                    closeDropDown (boolean): Set to true to close the drop down list after the selection.
                    focusCombo (boolean): Set to true to focus combo after the selection.
                    additive (boolean): Set to true to select the item without losing other selection. Works only when multi selection is enabled.
                    keepFiltering (boolean): Set to true to keep filtering after the selection. By default the filtering is cleared.
                    keepInputText (boolean): Set to true to keep input text unchanged after the selection. By default input text is updated.
                    keepHighlighting (boolean): Set to true to keep highlighting unchanged after the selection. By default highlighting is removed.
                    keepNavItem (boolean): Set to true to keep current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
                    keepScrollPosition (boolean): Set to true to keep current scroll position. By default the scroll position will change so that the last selected item is visible.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
     */
    IgComboComponent.prototype.index = function (index, options, event) { return; };
    ;
    /**
     * Selects all items from the drop-down list.
     *
     * @param options Object with set of options controlling the behavior of this api method.
                    closeDropDown (boolean): Set to true to close the drop down list after the selection.
                    focusCombo (boolean): Set to true to focus combo after the selection.
                    keepFiltering (boolean): Set to true to keep filtering after the selection. By default the filtering is cleared.
                    keepInputText (boolean): Set to true to keep input text unchanged after the selection. By default input text is updated.
                    keepHighlighting (boolean): Set to true to keep highlighting unchanged after the selection. By default highlighting is removed.
                    keepNavItem (boolean): Set to true to keep current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
                    keepScrollPosition (boolean): Set to true to keep current scroll position. By default the scroll position will change so that the last selected item is visible.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
     */
    IgComboComponent.prototype.selectAll = function (options, event) { return; };
    ;
    /**
     * Deselects a list item from the drop down list by value.
     *
     * @param value Value or array of values matching the [valueKey](ui.igcombo#options:valueKey) property of item/items to be deselected
     * @param options Object with set of options controlling the behavior of this api method.
                    focusCombo (boolean): Set to true to focus combo after the deselection.
                    keepInputText (boolean): Set to true to keep input text unchanged after the deselection. By default input text is updated.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
     */
    IgComboComponent.prototype.deselectByValue = function (value, options, event) { return; };
    ;
    /**
     * Deselects a list item from the drop down list.
     *
     * @param $items jQuery object with item or items to be deselected
     * @param options Object with set of options controlling the behavior of this api method.
                    focusCombo (boolean): Set to true to focus combo after the deselection.
                    keepInputText (boolean): Set to true to keep input text unchanged after the deselection. By default input text is updated.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
     */
    IgComboComponent.prototype.deselect = function ($items, options, event) { return; };
    ;
    /**
     * Deselects a list item from the drop down list by index.
     *
     * @param index Index or array of indexes of items to be selected
     * @param options Object with set of options controlling the behavior of this api method.
                    focusCombo (boolean): Set to true to focus combo after the deselection.
                    keepInputText (boolean): Set to true to keep input text unchanged after the deselection. By default input text is updated.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
     */
    IgComboComponent.prototype.deselectByIndex = function (index, options, event) { return; };
    ;
    /**
     * Deselects all selected items from the drop down list.
     *
     * @param options Object with set of options controlling the behavior of this api method.
                    focusCombo (boolean): Set to true to focus combo after the deselection.
                    keepInputText (boolean): Set to true to keep input text unchanged after the deselection. By default input text is updated.
     * @param event Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
     */
    IgComboComponent.prototype.deselectAll = function (options, event) { return; };
    ;
    /**
     * Gets/Sets index of active item in list.
     *
     * @param index New active index for list. In order to clear active item, use -1.
     * @return number|object Returns index of active item in list or -1, if parameter is undefined. Otherwise, it returns reference to this igCombo.
     */
    IgComboComponent.prototype.activeIndex = function (index) { return; };
    ;
    /**
     * Gets/Sets text in text input field.
     *
     * @param text New text value for combo's input field.
     * @return string|object If parameter is undefined, then current text in field is returned. Otherwise, it returns reference to this igCombo.
     */
    IgComboComponent.prototype.text = function (text) { return; };
    ;
    /**
     * Gets/Sets scrollTop attribute of html element, which scrolls drop-down list of items.
     *
     * @param value New value for scroll top in list. Note: if list is closed and new value is provided, then openDropDown() is called automatically.
     * @return number|object If parameter is undefined, then scrollTop is returned. Otherwise, it returns reference to this igCombo.
     */
    IgComboComponent.prototype.listScrollTop = function (value) { return; };
    ;
    /**
     * Gets jQuery objects representing all rendered list items in the combo drop down list.
     */
    IgComboComponent.prototype.listItems = function () { return; };
    ;
    /**
     * Gets jQuery object of the outer element of the combo.
     */
    IgComboComponent.prototype.comboWrapper = function () { return; };
    ;
    /**
     * Gets jQuery object of the drop down associated with this combo widget
     */
    IgComboComponent.prototype.dropDown = function () { return; };
    ;
    /**
     * Gets jQuery object of the container that holds the list with items.
     */
    IgComboComponent.prototype.list = function () { return; };
    ;
    /**
     * Gets jQuery object of the text input associated with this combo widget.
     */
    IgComboComponent.prototype.textInput = function () { return; };
    ;
    /**
     * Gets jQuery object of the value input associated with this combo widget.
     */
    IgComboComponent.prototype.valueInput = function () { return; };
    ;
    /**
     * Gets reference to [igValidator](ui.igvalidator) used by igCombo.
     *
     * @param destroy Request to destroy validator.
     */
    IgComboComponent.prototype.validator = function (destroy) { return; };
    ;
    /**
     * Trigger validation.
     */
    IgComboComponent.prototype.validate = function () { return; };
    ;
    /**
     * Returns boolean representing whether the combo drop down list is opened.
     */
    IgComboComponent.prototype.dropDownOpened = function () { return; };
    ;
    /**
     * Repositions drop down under combo input. Has effect only when the drop down is attached to body.
     */
    IgComboComponent.prototype.positionDropDown = function () { return; };
    ;
    /**
     * Destroys the igCombo widget.
     */
    IgComboComponent.prototype.destroy = function () { return; };
    ;
    return IgComboComponent;
}(IgControlBase));
IgComboComponent = __decorate([
    core_1.Component({
        selector: "ig-combo",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "dropDownWidth", "dataSource", "dataSourceType", "dataSourceUrl", "responseTotalRecCountKey", "responseDataKey", "responseDataType", "responseContentType", "requestType", "valueKey", "textKey", "itemTemplate", "headerTemplate", "footerTemplate", "inputName", "animationShowDuration", "animationHideDuration", "dropDownAttachedToBody", "filteringType", "filterExprUrlKey", "filteringCondition", "filteringLogic", "noMatchFoundText", "loadOnDemandSettings", "visibleItemsCount", "placeHolder", "mode", "virtualization", "multiSelection", "grouping", "validatorOptions", "highlightMatchesMode", "caseSensitive", "autoSelectFirstMatch", "autoComplete", "allowCustomValue", "closeDropDownOnBlur", "delayInputChangeProcessing", "tabIndex", "dropDownOnFocus", "closeDropDownOnSelect", "selectItemBySpaceKey", "initialSelectedItems", "preventSubmitOnEnter", "format", "suppressKeyboard", "enableClearButton", "dropDownButtonTitle", "clearButtonTitle", "dropDownOrientation"],
        outputs: ["rendered", "dataBinding", "dataBound", "filtering", "filtered", "itemsRendering", "itemsRendered", "dropDownOpening", "dropDownOpened", "dropDownClosing", "dropDownClosed", "selectionChanging", "selectionChanged"]
    }),
    __param(0, core_1.Optional()),
    __metadata("design:paramtypes", [forms_1.NgModel, core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgComboComponent);
exports.IgComboComponent = IgComboComponent;
var IgEditorBase = (function (_super) {
    __extends(IgEditorBase, _super);
    function IgEditorBase(el, renderer, differs, model) {
        var _this = _super.call(this, el, renderer, differs) || this;
        _this.model = model;
        _this.onChange = function (_) {
        };
        _this.onTouched = function () {
        };
        if (model) {
            model.valueAccessor = _this;
            _this._model = model;
        }
        return _this;
    }
    IgEditorBase.prototype.ngOnInit = function () {
        var that = this;
        _super.prototype.ngOnInit.call(this);
        if (this._model) {
            jQuery(this._el).on(this._widgetName.toLowerCase() + "valuechanged", function (evt, ui) {
                that.onChange(ui.newValue);
            });
            if (this._widgetName === "igTextEditor") {
                jQuery(this._el).on(this._widgetName.toLowerCase() + "textchanged", function (evt, ui) {
                    that.onChange(ui.text);
                });
            }
            jQuery(this._el).on(this._widgetName.toLowerCase() + "blur", function (evt, ui) {
                that.onTouched();
            });
            //manually call writeValue, because the LifeCycle has been changed and writeValue is executed before ngOnInit
            this.writeValue(this._model.value);
        }
    };
    IgEditorBase.prototype.writeValue = function (value) {
        if (!!jQuery(this._el).data(this._widgetName) && value !== null) {
            jQuery(this._el)[this._widgetName]("value", value);
        }
    };
    IgEditorBase.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    IgEditorBase.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return IgEditorBase;
}(IgControlBase));
IgEditorBase = __decorate([
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel])
], IgEditorBase);
exports.IgEditorBase = IgEditorBase;
//Editors
var IgCheckboxEditorComponent = (function (_super) {
    __extends(IgCheckboxEditorComponent, _super);
    function IgCheckboxEditorComponent(el, renderer, differs, model) {
        var _this = _super.call(this, el, renderer, differs, model) || this;
        _this.model = model;
        return _this;
    }
    /**
     * Checks if the value in the editor is valid. Note: This function will not trigger automatic notifications.
     */
    IgCheckboxEditorComponent.prototype.isValid = function () { return; };
    ;
    /**
     * Gets/Sets Current checked state/Value of the igCheckboxEditor that will be submitted by the HTML form.
     * 				1. If the [value](ui.igcheckboxeditor#options:value) option IS NOT defined, then 'value' method will match the checked state of the editor.
     * 				This option is used when the checkbox is intended to operate as a Boolean editor. In that case the return type is bool.
     * 				2. If the [value](ui.igcheckboxeditor#options:value) option IS defined, then 'value' method will return the value that will be submitted when the editor is checked and the form is submitted.
     * 				To get checked state regardless of the 'value' option, use $(".selector").igCheckboxEditor("option", "checked");
     *
     * @param newValue
     */
    IgCheckboxEditorComponent.prototype.value = function (newValue) { return; };
    ;
    /**
     * Toggles the state of the checkbox.
     */
    IgCheckboxEditorComponent.prototype.toggle = function () { return; };
    ;
    return IgCheckboxEditorComponent;
}(IgEditorBase));
IgCheckboxEditorComponent = __decorate([
    core_1.Component({
        selector: "ig-checkbox-editor",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "value", "tabIndex", "allowNullValue", "nullValue", "inputName", "readOnly", "validatorOptions", "checked", "size", "iconClass"],
        outputs: ["rendering", "rendered", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "blur", "focus", "keydown", "keypress", "keyup", "valueChanging", "valueChanged"]
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel])
], IgCheckboxEditorComponent);
exports.IgCheckboxEditorComponent = IgCheckboxEditorComponent;
var IgCurrencyEditorComponent = (function (_super) {
    __extends(IgCurrencyEditorComponent, _super);
    function IgCurrencyEditorComponent(el, renderer, differs, model) {
        var _this = _super.call(this, el, renderer, differs, model) || this;
        _this.model = model;
        return _this;
    }
    /**
     * Gets/sets a string that is used as the currency symbol shown with the number in the input. The value provided as a param is propagated to the currencySymbol option and thus has the same priority as the option.
     *
     * @param symbol     New currency symbol.
     */
    IgCurrencyEditorComponent.prototype.currencySymbol = function (symbol) { return; };
    ;
    return IgCurrencyEditorComponent;
}(IgEditorBase));
IgCurrencyEditorComponent = __decorate([
    core_1.Component({
        selector: "ig-currency-editor",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "value", "tabIndex", "allowNullValue", "nullValue", "inputName", "readOnly", "validatorOptions", "buttonType", "listItems", "listWidth", "listItemHoverDuration", "dropDownAttachedToBody", "dropDownAnimationDuration", "visibleItemsCount", "includeKeys", "excludeKeys", "textAlign", "placeHolder", "selectionOnFocus", "textMode", "spinWrapAround", "isLimitedToListValues", "revertIfNotValid", "preventSubmitOnEnter", "dropDownOrientation", "maxLength", "dropDownOnReadOnly", "toUpper", "toLower", "locale", "suppressNotifications", "regional", "negativeSign", "negativePattern", "decimalSeparator", "groupSeparator", "groups", "maxDecimals", "minDecimals", "dataMode", "minValue", "maxValue", "spinDelta", "scientificFormat", "positivePattern", "currencySymbol"],
        outputs: ["rendering", "rendered", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "blur", "focus", "keydown", "keypress", "keyup", "valueChanging", "valueChanged", "dropDownListOpening", "dropDownListOpened", "dropDownListClosing", "dropDownListClosed", "dropDownItemSelecting", "dropDownItemSelected", "textChanged"]
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel])
], IgCurrencyEditorComponent);
exports.IgCurrencyEditorComponent = IgCurrencyEditorComponent;
var IgDateEditorComponent = (function (_super) {
    __extends(IgDateEditorComponent, _super);
    function IgDateEditorComponent(el, renderer, differs, model) {
        var _this = _super.call(this, el, renderer, differs, model) || this;
        _this.model = model;
        return _this;
    }
    /**
     * Gets/Sets editor value.
     *
     * 				Note! This option doesn't use the displayInputFormat to extract the date
     *
     * @param newValue     New editor value. Date object can be set as value. String value can be passed and the editor will use the javascript Date object constructor to create date object and will use it for the comparison. MVC date format can be used too. For example Date(/"thicks"/).
     */
    IgDateEditorComponent.prototype.value = function (newValue) { return; };
    ;
    /**
     * Gets selected date as a date object. This method can be used when dataMode is set as either displayModeText or editModeText.
     * 			In such cases the value() method will not return date object and getSelectedDate() can be used to replace that functionality.
     */
    IgDateEditorComponent.prototype.getSelectedDate = function () { return; };
    ;
    /**
     * Sets selected date. This method can be used when dataMode is set as either displayModeText or editModeText.
     * 			In such cases the value() cannot accept a date object as a new value and getSelectedDate() can be used to replace that functionality.
     *
     * @param date
     */
    IgDateEditorComponent.prototype.selectDate = function (date) { return; };
    ;
    /**
     * Increases the date or time period, depending on the current cursor position.
     *
     * @param delta     The increase delta.
     */
    IgDateEditorComponent.prototype.spinUp = function (delta) { return; };
    ;
    /**
     * Decreases the date or time period, depending on the current cursor position.
     *
     * @param delta     The decrease delta.
     */
    IgDateEditorComponent.prototype.spinDown = function (delta) { return; };
    ;
    /**
     * Returns a reference to the spin up UI element of the editor.
     */
    IgDateEditorComponent.prototype.spinUpButton = function () { return; };
    ;
    /**
     * Returns a reference to the spin down UI element of the editor.
     */
    IgDateEditorComponent.prototype.spinDownButton = function () { return; };
    ;
    /**
     * Checks if the value in the editor is valid. Note: This function will not trigger automatic notifications.
     */
    IgDateEditorComponent.prototype.isValid = function () { return; };
    ;
    IgDateEditorComponent.prototype.dropDownButton = function () { return; };
    ;
    IgDateEditorComponent.prototype.dropDownContainer = function () { return; };
    ;
    IgDateEditorComponent.prototype.dropDownVisible = function () { return; };
    ;
    IgDateEditorComponent.prototype.findListItemIndex = function () { return; };
    ;
    IgDateEditorComponent.prototype.getSelectedListItem = function () { return; };
    ;
    IgDateEditorComponent.prototype.selectedListIndex = function () { return; };
    ;
    return IgDateEditorComponent;
}(IgEditorBase));
IgDateEditorComponent = __decorate([
    core_1.Component({
        selector: "ig-date-editor",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "value", "tabIndex", "allowNullValue", "nullValue", "inputName", "readOnly", "validatorOptions", "buttonType", "listItems", "listWidth", "listItemHoverDuration", "dropDownAttachedToBody", "dropDownAnimationDuration", "visibleItemsCount", "includeKeys", "excludeKeys", "textAlign", "placeHolder", "selectionOnFocus", "textMode", "spinWrapAround", "isLimitedToListValues", "revertIfNotValid", "preventSubmitOnEnter", "dropDownOrientation", "maxLength", "dropDownOnReadOnly", "toUpper", "toLower", "locale", "suppressNotifications", "regional", "inputMask", "dataMode", "unfilledCharsPrompt", "padChar", "emptyChar", "minValue", "maxValue", "dateDisplayFormat", "dateInputFormat", "spinDelta", "limitSpinToCurrentField", "enableUTCDates", "centuryThreshold", "yearShift"],
        outputs: ["rendering", "rendered", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "blur", "focus", "keydown", "keypress", "keyup", "valueChanging", "valueChanged", "dropDownListOpening", "dropDownListOpened", "dropDownListClosing", "dropDownListClosed", "dropDownItemSelecting", "dropDownItemSelected", "textChanged"]
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel])
], IgDateEditorComponent);
exports.IgDateEditorComponent = IgDateEditorComponent;
var IgDatePickerComponent = (function (_super) {
    __extends(IgDatePickerComponent, _super);
    function IgDatePickerComponent(el, renderer, differs, model) {
        var _this = _super.call(this, el, renderer, differs, model) || this;
        _this.model = model;
        return _this;
    }
    /**
     * Returns a reference to the jQuery calendar used as a picker selector
     */
    IgDatePickerComponent.prototype.getCalendar = function () { return; };
    ;
    IgDatePickerComponent.prototype.dropDownContainer = function () { return; };
    ;
    IgDatePickerComponent.prototype.findListItemIndex = function () { return; };
    ;
    IgDatePickerComponent.prototype.getSelectedListItem = function () { return; };
    ;
    IgDatePickerComponent.prototype.selectedListIndex = function () { return; };
    ;
    /**
     * Shows the drop down list.
     */
    IgDatePickerComponent.prototype.showDropDown = function () { return; };
    ;
    /**
     * Hides the drop down list.
     */
    IgDatePickerComponent.prototype.hideDropDown = function () { return; };
    ;
    /**
     * Returns a reference to the calendar button UI element of the editor.
     */
    IgDatePickerComponent.prototype.dropDownButton = function () { return; };
    ;
    /**
     * Returns the visibility state of the calendar.
     */
    IgDatePickerComponent.prototype.dropDownVisible = function () { return; };
    ;
    /**
     * Destroys the widget
     */
    IgDatePickerComponent.prototype.destroy = function () { return; };
    ;
    return IgDatePickerComponent;
}(IgEditorBase));
IgDatePickerComponent = __decorate([
    core_1.Component({
        selector: "ig-date-picker",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "value", "tabIndex", "allowNullValue", "nullValue", "inputName", "readOnly", "validatorOptions", "buttonType", "listItems", "listWidth", "listItemHoverDuration", "dropDownAttachedToBody", "dropDownAnimationDuration", "visibleItemsCount", "includeKeys", "excludeKeys", "textAlign", "placeHolder", "selectionOnFocus", "textMode", "spinWrapAround", "isLimitedToListValues", "revertIfNotValid", "preventSubmitOnEnter", "dropDownOrientation", "maxLength", "dropDownOnReadOnly", "toUpper", "toLower", "locale", "suppressNotifications", "regional", "inputMask", "dataMode", "unfilledCharsPrompt", "padChar", "emptyChar", "minValue", "maxValue", "dateDisplayFormat", "dateInputFormat", "spinDelta", "limitSpinToCurrentField", "enableUTCDates", "centuryThreshold", "yearShift", "datepickerOptions"],
        outputs: ["rendering", "rendered", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "blur", "focus", "keydown", "keypress", "keyup", "valueChanging", "valueChanged", "dropDownListOpening", "dropDownListOpened", "dropDownListClosing", "dropDownListClosed", "dropDownItemSelecting", "dropDownItemSelected", "textChanged", "itemSelected"]
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel])
], IgDatePickerComponent);
exports.IgDatePickerComponent = IgDatePickerComponent;
var IgMaskEditorComponent = (function (_super) {
    __extends(IgMaskEditorComponent, _super);
    function IgMaskEditorComponent(el, renderer, differs, model) {
        var _this = _super.call(this, el, renderer, differs, model) || this;
        _this.model = model;
        return _this;
    }
    /**
     * Gets/Sets mask editor value.
     *
     * @param newValue     New mask editor value.
     */
    IgMaskEditorComponent.prototype.value = function (newValue) { return; };
    ;
    IgMaskEditorComponent.prototype.dropDownContainer = function () { return; };
    ;
    IgMaskEditorComponent.prototype.showDropDown = function () { return; };
    ;
    IgMaskEditorComponent.prototype.hideDropDown = function () { return; };
    ;
    IgMaskEditorComponent.prototype.dropDownButton = function () { return; };
    ;
    IgMaskEditorComponent.prototype.spinUpButton = function () { return; };
    ;
    IgMaskEditorComponent.prototype.spinDownButton = function () { return; };
    ;
    IgMaskEditorComponent.prototype.dropDownVisible = function () { return; };
    ;
    IgMaskEditorComponent.prototype.findListItemIndex = function () { return; };
    ;
    IgMaskEditorComponent.prototype.selectedListIndex = function () { return; };
    ;
    IgMaskEditorComponent.prototype.getSelectedListItem = function () { return; };
    ;
    IgMaskEditorComponent.prototype.spinUp = function () { return; };
    ;
    IgMaskEditorComponent.prototype.spinDown = function () { return; };
    ;
    /**
     * Checks if the value in the editor is valid. Note: This function will not trigger automatic notifications.
     */
    IgMaskEditorComponent.prototype.isValid = function () { return; };
    ;
    return IgMaskEditorComponent;
}(IgEditorBase));
IgMaskEditorComponent = __decorate([
    core_1.Component({
        selector: "ig-mask-editor",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "value", "tabIndex", "allowNullValue", "nullValue", "inputName", "readOnly", "validatorOptions", "buttonType", "listItems", "listWidth", "listItemHoverDuration", "dropDownAttachedToBody", "dropDownAnimationDuration", "visibleItemsCount", "includeKeys", "excludeKeys", "textAlign", "placeHolder", "selectionOnFocus", "textMode", "spinWrapAround", "isLimitedToListValues", "revertIfNotValid", "preventSubmitOnEnter", "dropDownOrientation", "maxLength", "dropDownOnReadOnly", "toUpper", "toLower", "locale", "suppressNotifications", "regional", "inputMask", "dataMode", "unfilledCharsPrompt", "padChar", "emptyChar"],
        outputs: ["rendering", "rendered", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "blur", "focus", "keydown", "keypress", "keyup", "valueChanging", "valueChanged", "dropDownListOpening", "dropDownListOpened", "dropDownListClosing", "dropDownListClosed", "dropDownItemSelecting", "dropDownItemSelected", "textChanged"]
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel])
], IgMaskEditorComponent);
exports.IgMaskEditorComponent = IgMaskEditorComponent;
var IgNumericEditorComponent = (function (_super) {
    __extends(IgNumericEditorComponent, _super);
    function IgNumericEditorComponent(el, renderer, differs, model) {
        var _this = _super.call(this, el, renderer, differs, model) || this;
        _this.model = model;
        return _this;
    }
    /**
     * Gets/Sets editor value.
     *
     * @param newValue     New editor value.
     */
    IgNumericEditorComponent.prototype.value = function (newValue) { return; };
    ;
    /**
     * Finds index of list item by text that matches with the search parameters.
     *
     * @param number     The text to search for.
     */
    IgNumericEditorComponent.prototype.findListItemIndex = function (number) { return; };
    ;
    IgNumericEditorComponent.prototype.getSelectedText = function () { return; };
    ;
    IgNumericEditorComponent.prototype.getSelectionStart = function () { return; };
    ;
    IgNumericEditorComponent.prototype.getSelectionEnd = function () { return; };
    ;
    /**
     * Increments value in editor according to the parameter.
     *
     * @param delta     Increments value.
     */
    IgNumericEditorComponent.prototype.spinUp = function (delta) { return; };
    ;
    /**
     * Decrements value in editor according to the parameter.
     *
     * @param delta     Decrement value.
     */
    IgNumericEditorComponent.prototype.spinDown = function (delta) { return; };
    ;
    /**
     * Moves the hovered index to the item that appears above the current one in the list.
     */
    IgNumericEditorComponent.prototype.selectListIndexUp = function () { return; };
    ;
    /**
     * Moves the hovered index to the item that appears above the current one in the list.
     */
    IgNumericEditorComponent.prototype.selectListIndexDown = function () { return; };
    ;
    /**
     * Gets current regional.
     */
    IgNumericEditorComponent.prototype.getRegionalOption = function () { return; };
    ;
    return IgNumericEditorComponent;
}(IgEditorBase));
IgNumericEditorComponent = __decorate([
    core_1.Component({
        selector: "ig-numeric-editor",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "value", "tabIndex", "allowNullValue", "nullValue", "inputName", "readOnly", "validatorOptions", "buttonType", "listItems", "listWidth", "listItemHoverDuration", "dropDownAttachedToBody", "dropDownAnimationDuration", "visibleItemsCount", "includeKeys", "excludeKeys", "textAlign", "placeHolder", "selectionOnFocus", "textMode", "spinWrapAround", "isLimitedToListValues", "revertIfNotValid", "preventSubmitOnEnter", "dropDownOrientation", "maxLength", "dropDownOnReadOnly", "toUpper", "toLower", "locale", "suppressNotifications", "regional", "negativeSign", "negativePattern", "decimalSeparator", "groupSeparator", "groups", "maxDecimals", "minDecimals", "dataMode", "minValue", "maxValue", "spinDelta", "scientificFormat"],
        outputs: ["rendering", "rendered", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "blur", "focus", "keydown", "keypress", "keyup", "valueChanging", "valueChanged", "dropDownListOpening", "dropDownListOpened", "dropDownListClosing", "dropDownListClosed", "dropDownItemSelecting", "dropDownItemSelected", "textChanged"]
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel])
], IgNumericEditorComponent);
exports.IgNumericEditorComponent = IgNumericEditorComponent;
var IgPercentEditorComponent = (function (_super) {
    __extends(IgPercentEditorComponent, _super);
    function IgPercentEditorComponent(el, renderer, differs, model) {
        var _this = _super.call(this, el, renderer, differs, model) || this;
        _this.model = model;
        return _this;
    }
    /**
     * Paste text at location of the caret or over the current selection. Best used during editing, as the method will instead set the text as value (modified by the [displayFactor](ui.igpercenteditor#options:displayFactor)) if the editor is not focused.
     * 				Note: the method raises the [textChanged](ui.igpercenteditor#events:textChanged) event.
     *
     * @param string     The string to be inserted.
     */
    IgPercentEditorComponent.prototype.insert = function (string) { return; };
    ;
    /**
     * Gets/Sets a string that is used as the percent symbol shown with the number in the input. The value provided as a param is propagated to the [percentSymbol](ui.igpercenteditor#options:percentSymbol) option and thus has the same priority as the option.
     *
     * @param symbol     New percent symbol.
     */
    IgPercentEditorComponent.prototype.percentSymbol = function (symbol) { return; };
    ;
    return IgPercentEditorComponent;
}(IgEditorBase));
IgPercentEditorComponent = __decorate([
    core_1.Component({
        selector: "ig-percent-editor",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "value", "tabIndex", "allowNullValue", "nullValue", "inputName", "readOnly", "validatorOptions", "buttonType", "listItems", "listWidth", "listItemHoverDuration", "dropDownAttachedToBody", "dropDownAnimationDuration", "visibleItemsCount", "includeKeys", "excludeKeys", "textAlign", "placeHolder", "selectionOnFocus", "textMode", "spinWrapAround", "isLimitedToListValues", "revertIfNotValid", "preventSubmitOnEnter", "dropDownOrientation", "maxLength", "dropDownOnReadOnly", "toUpper", "toLower", "locale", "suppressNotifications", "regional", "negativeSign", "negativePattern", "decimalSeparator", "groupSeparator", "groups", "maxDecimals", "minDecimals", "dataMode", "minValue", "maxValue", "spinDelta", "scientificFormat", "positivePattern", "percentSymbol", "displayFactor"],
        outputs: ["rendering", "rendered", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "blur", "focus", "keydown", "keypress", "keyup", "valueChanging", "valueChanged", "dropDownListOpening", "dropDownListOpened", "dropDownListClosing", "dropDownListClosed", "dropDownItemSelecting", "dropDownItemSelected", "textChanged"]
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel])
], IgPercentEditorComponent);
exports.IgPercentEditorComponent = IgPercentEditorComponent;
var IgTextEditorComponent = (function (_super) {
    __extends(IgTextEditorComponent, _super);
    function IgTextEditorComponent(el, renderer, differs, model) {
        var _this = _super.call(this, el, renderer, differs, model) || this;
        _this.model = model;
        return _this;
    }
    /**
     * Gets the visible text in the editor.
     */
    IgTextEditorComponent.prototype.displayValue = function () { return; };
    ;
    /**
     * Gets reference to jquery object which is used as container of drop-down list.
     */
    IgTextEditorComponent.prototype.dropDownContainer = function () { return; };
    ;
    /**
     * Shows the drop down list.
     */
    IgTextEditorComponent.prototype.showDropDown = function () { return; };
    ;
    /**
     * Hides the drop down list.
     */
    IgTextEditorComponent.prototype.hideDropDown = function () { return; };
    ;
    /**
     * Returns a reference to the drop-down button UI element of the editor.
     */
    IgTextEditorComponent.prototype.dropDownButton = function () { return; };
    ;
    /**
     * Returns if the drop-down list is visible.
     */
    IgTextEditorComponent.prototype.dropDownVisible = function () { return; };
    ;
    /**
     * Returns a reference to the clear button UI element of the editor.
     */
    IgTextEditorComponent.prototype.clearButton = function () { return; };
    ;
    /**
     * Finds index of list item by text that matches with the search parameters.
     *
     * @param text     The text to search for in the drop down list.
     * @param matchType     The rule that is applied for searching the text.
     */
    IgTextEditorComponent.prototype.findListItemIndex = function (text, matchType) { return; };
    ;
    /**
     * Gets the index of the selected list item. Sets selected item by index.
     *
     * @param index     The index of the item that needs to be selected.
     */
    IgTextEditorComponent.prototype.selectedListIndex = function (index) { return; };
    ;
    /**
     * Gets the selected list item.
     */
    IgTextEditorComponent.prototype.getSelectedListItem = function () { return; };
    ;
    /**
     * Gets the selected text in the editor.
     */
    IgTextEditorComponent.prototype.getSelectedText = function () { return; };
    ;
    /**
     * Gets the start index of the selected text in the editor.
     */
    IgTextEditorComponent.prototype.getSelectionStart = function () { return; };
    ;
    /**
     * Gets the end index of the selected text in the editor.
     */
    IgTextEditorComponent.prototype.getSelectionEnd = function () { return; };
    ;
    /**
     * Inserts the text at the location of the caret or over the current selection. If the editor is focused the method will insert the text over the current selection. If the editor is not focused the method will set the text as value of the editor.
     * 				Note: The method raises [textChanged](ui.igtexteditor#events:textChanged) event.
     *
     * @param string     The string to be inserted.
     */
    IgTextEditorComponent.prototype.insert = function (string) { return; };
    ;
    /**
     * Selects the text between start and end indices in the editor. If the parameters are equal, then the method sets location of caret. The method has effect only when the editor has focus.
     *
     * @param start     Start of the selection.
     * @param end     End of the selection.
     */
    IgTextEditorComponent.prototype.select = function (start, end) { return; };
    ;
    /**
     * Hovers the previous item in the drop-down list if the list is opened.
     */
    IgTextEditorComponent.prototype.spinUp = function () { return; };
    ;
    /**
     * Hovers the next item in the drop-down list if the list is opened.
     */
    IgTextEditorComponent.prototype.spinDown = function () { return; };
    ;
    /**
     * Returns a reference to the spin up UI element of the editor.
     */
    IgTextEditorComponent.prototype.spinUpButton = function () { return; };
    ;
    /**
     * Returns a reference to the spin down UI element of the editor.
     */
    IgTextEditorComponent.prototype.spinDownButton = function () { return; };
    ;
    return IgTextEditorComponent;
}(IgEditorBase));
IgTextEditorComponent = __decorate([
    core_1.Component({
        selector: "ig-text-editor",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "value", "tabIndex", "allowNullValue", "nullValue", "inputName", "readOnly", "validatorOptions", "buttonType", "listItems", "listWidth", "listItemHoverDuration", "dropDownAttachedToBody", "dropDownAnimationDuration", "visibleItemsCount", "includeKeys", "excludeKeys", "textAlign", "placeHolder", "selectionOnFocus", "textMode", "spinWrapAround", "isLimitedToListValues", "revertIfNotValid", "preventSubmitOnEnter", "dropDownOrientation", "maxLength", "dropDownOnReadOnly", "toUpper", "toLower", "locale", "suppressNotifications"],
        outputs: ["rendering", "rendered", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "blur", "focus", "keydown", "keypress", "keyup", "valueChanging", "valueChanged", "dropDownListOpening", "dropDownListOpened", "dropDownListClosing", "dropDownListClosed", "dropDownItemSelecting", "dropDownItemSelected", "textChanged"]
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel])
], IgTextEditorComponent);
exports.IgTextEditorComponent = IgTextEditorComponent;
var IgTreeComponent = (function (_super) {
    __extends(IgTreeComponent, _super);
    function IgTreeComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgTreeComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this._dataSource = jQuery.extend(true, [], this._config.dataSource);
    };
    IgTreeComponent.prototype.ngDoCheck = function () {
        if (this._differ != null && this._allowChangeDetection) {
            this.optionChange();
            this._allowChangeDetection = false;
            var diff = [];
            var element = jQuery(this._el);
            var i, j, valKey = this._config.valueKey, record, item;
            //check for changes in collection
            this._changes = this._differ.diff(this._config.dataSource);
            if (this._config.dataSource.length !== this._dataSource.length) {
                this._dataSource = jQuery.extend(true, [], this._config.dataSource);
                if (this._changes) {
                    this._changes.forEachAddedItem(function (r) { return element.igTree("dataBind"); });
                    this._changes.forEachRemovedItem(function (r) { return element.igTree("dataBind"); });
                }
            }
            if (!this.equalsDiff(this._config.dataSource, this._dataSource, diff)) {
                this._dataSource = jQuery.extend(true, [], this._config.dataSource);
                element.igTree("dataBind");
            }
        }
    };
    /**
     * Performs databinding on the igTree.
     */
    IgTreeComponent.prototype.dataBind = function () { return; };
    ;
    /**
     * Toggles the checkstate of a node if checkboxMode is not set to off, otherwise does nothing.
     *
     * @param node     Specifies the node element the checkbox of which would be toggled.
     * @param event     Indicates the browser event which triggered this action, if this is not an API call.
     */
    IgTreeComponent.prototype.toggleCheckstate = function (node, event) { return; };
    ;
    /**
     * Toggles the collapse/expand state for the specified node.
     *
     * @param node     Specifies the node element the checkbox of which would be toggled.
     * @param event     Indicates the browser event which triggered this action, if this is not an API call.
     */
    IgTreeComponent.prototype.toggle = function (node, event) { return; };
    ;
    /**
     * Expands the tree down to the specified node and selects the node if specified.
     *
     * @param node     Specifies the node element down to which the tree would be expanded.
     * @param toSelect     Specifies the whether to select the node after expanding to it.
     */
    IgTreeComponent.prototype.expandToNode = function (node, toSelect) { return; };
    ;
    /**
     * Expands the specified node.
     *
     * @param node     Specifies the node element to expand.
     */
    IgTreeComponent.prototype.expand = function (node) { return; };
    ;
    /**
     * Collapses the specified node.
     *
     * @param node     Specifies the node element to collapse.
     */
    IgTreeComponent.prototype.collapse = function (node) { return; };
    ;
    /**
     * Retrieves the parent node element of the specified node element.
     *
     * @param node     Specifies the jQuery selected node element to collapse.
     */
    IgTreeComponent.prototype.parentNode = function (node) { return; };
    ;
    /**
     * Retrieves the jQuery element of the node with the specified path.
     *
     * @param nodePath     Specifies the path to the required node.
     */
    IgTreeComponent.prototype.nodeByPath = function (nodePath) { return; };
    ;
    /**
     * Retrieves the jQuery element of the node with the specified value.
     *
     * @param value     Specifies the value of the required node.
     */
    IgTreeComponent.prototype.nodesByValue = function (value) { return; };
    ;
    /**
     * Retrieves all the node objects for the nodes that have their checkboxes checked.
     */
    IgTreeComponent.prototype.checkedNodes = function () { return; };
    ;
    /**
     * Retrieves all the node objects for the nodes that have their checkboxes unchecked.
     */
    IgTreeComponent.prototype.uncheckedNodes = function () { return; };
    ;
    /**
     * Retrieves all the node objects for the nodes that have their checkboxes partially checked.
     */
    IgTreeComponent.prototype.partiallyCheckedNodes = function () { return; };
    ;
    /**
     * Selects a node.
     *
     * @param node     Specifies the node element to be selected.
     * @param event     Indicates the browser event which triggered this action, if this is not an API call.
     */
    IgTreeComponent.prototype.select = function (node, event) { return; };
    ;
    /**
     * Deselects the specified node.
     *
     * @param node     Specifies the node element to be deselected.
     */
    IgTreeComponent.prototype.deselect = function (node) { return; };
    ;
    /**
     * Deselects all the selected nodes.
     */
    IgTreeComponent.prototype.clearSelection = function () { return; };
    ;
    /**
     * Retrieves the node object for the selected node.
     */
    IgTreeComponent.prototype.selectedNode = function () { return; };
    ;
    /**
     * Retrieves all node objects with the specified text (case sensitive).
     *
     * @param text     The text to search for.
     * @param parent     The node element to start the search from. If not specified then search would start from the root of the tree.
     */
    IgTreeComponent.prototype.findNodesByText = function (text, parent) { return; };
    ;
    /**
     * Retrieves all node objects for the immediate children of the specified parent with the specified text (case sensitive).
     *
     * @param text     The text to search for.
     * @param parent     The node element the children of which would be searched.
     */
    IgTreeComponent.prototype.findImmediateNodesByText = function (text, parent) { return; };
    ;
    /**
     * Retrieves the n-th jQuery node element child of the specified parent.
     *
     * @param index     Specifies the index the node at which to be retrieved.
     * @param parent     The parent node element to start the search from.
     */
    IgTreeComponent.prototype.nodeByIndex = function (index, parent) { return; };
    ;
    /**
     * Retrieves a node object for the specified node element.
     *
     * @param element     Specifies the node element.
     */
    IgTreeComponent.prototype.nodeFromElement = function (element) { return; };
    ;
    /**
     * Retrieves a node object collection of the immediate children of the provided node element.
     *
     * @param parent     Specifies the node element.
     */
    IgTreeComponent.prototype.children = function (parent) { return; };
    ;
    /**
     * Retrieves a node object collection of the immediate children of the node with the provided path.
     *
     * @param path     Specifies the path of the node the children of which are to be retrieved.
     */
    IgTreeComponent.prototype.childrenByPath = function (path) { return; };
    ;
    /**
     * Returns true if the provided node element is selected and false otherwise.
     *
     * @param node     Specifies the node element.
     */
    IgTreeComponent.prototype.isSelected = function (node) { return; };
    ;
    /**
     * Returns true if the provided node element is expanded and false otherwise.
     *
     * @param node     Specifies the node element.
     */
    IgTreeComponent.prototype.isExpanded = function (node) { return; };
    ;
    /**
     * Returns true if the provided node element has its checkbox checkstate checked and false otherwise.
     *
     * @param node     Specifies the node element.
     */
    IgTreeComponent.prototype.isChecked = function (node) { return; };
    ;
    /**
     * Returns the specified node checkstate.
     *
     * @param node     Specifies the node element.
     */
    IgTreeComponent.prototype.checkState = function (node) { return; };
    ;
    /**
     * Adds a new array of nodes to the tree. New nodes are appended to the root or to a specified parent node, at a specified index.
     *
     * @param node     Specifies the data used to create the new nodeс.
     * @param parent     Specifies the element of the parent node the nodes are to be appended to.
     * @param nodeIndex     Specifies the index at which the nodes to be inserted.
     */
    IgTreeComponent.prototype.addNode = function (node, parent, nodeIndex) { return; };
    ;
    /**
     * Removes the node with with the specified path and all of its children.
     *
     * @param path     Specifies the path of the node to be removed.
     */
    IgTreeComponent.prototype.removeAt = function (path) { return; };
    ;
    /**
     * Removing all the nodes with the specified value.
     *
     * @param value     Specifies the value of the nodes to be removed.
     */
    IgTreeComponent.prototype.removeNodesByValue = function (value) { return; };
    ;
    /**
     * Performs a UI update on the provided node element with the provided data.
     *
     * @param element     Specifies the node to be updated.
     * @param data     Specifies the new data item the node would update according to.
     */
    IgTreeComponent.prototype.applyChangesToNode = function (element, data) { return; };
    ;
    /**
     * Returns the transaction log stack.
     */
    IgTreeComponent.prototype.transactionLog = function () { return; };
    ;
    /**
     * Returns the data for the node with specified path.
     *
     * @param path     Specifies the node path for which the data is returned.
     */
    IgTreeComponent.prototype.nodeDataFor = function (path) { return; };
    ;
    /**
     * Destructor for the igTree widget.
     */
    IgTreeComponent.prototype.destroy = function () { return; };
    ;
    return IgTreeComponent;
}(IgControlBase));
IgTreeComponent = __decorate([
    core_1.Component({
        selector: "ig-tree",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "checkboxMode", "singleBranchExpand", "hotTracking", "parentNodeImageUrl", "parentNodeImageClass", "parentNodeImageTooltip", "leafNodeImageUrl", "leafNodeImageClass", "leafNodeImageTooltip", "animationDuration", "pathSeparator", "dataSource", "dataSourceUrl", "dataSourceType", "responseDataKey", "responseDataType", "requestType", "responseContentType", "initialExpandDepth", "loadOnDemand", "bindings", "defaultNodeTarget", "dragAndDrop", "updateUrl", "dragAndDropSettings"],
        outputs: ["dataBinding", "dataBound", "rendering", "rendered", "selectionChanging", "selectionChanged", "nodeCheckstateChanging", "nodeCheckstateChanged", "nodePopulating", "nodePopulated", "nodeCollapsing", "nodeCollapsed", "nodeExpanding", "nodeExpanded", "nodeClick", "nodeDoubleClick", "dragStart", "drag", "dragStop", "nodeDropping", "nodeDropped"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgTreeComponent);
exports.IgTreeComponent = IgTreeComponent;
var IgContentControlBase = (function (_super) {
    __extends(IgContentControlBase, _super);
    function IgContentControlBase(el, renderer, differs) {
        var _this = _super.call(this, el, renderer, differs) || this;
        _this.childNodes = el.nativeElement.childNodes;
        return _this;
    }
    IgContentControlBase.prototype.ngOnInit = function () {
        jQuery(this._el).append(this.childNodes);
        _super.prototype.ngOnInit.call(this);
    };
    return IgContentControlBase;
}(IgControlBase));
exports.IgContentControlBase = IgContentControlBase;
var IgDialogComponent = (function (_super) {
    __extends(IgDialogComponent, _super);
    function IgDialogComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Destroys the igDialog and moves the target element to its original parent.
     */
    IgDialogComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Gets/Sets the state of the editor.
     * 				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
     *
     * @param state     New state.
     */
    IgDialogComponent.prototype.state = function (state) { return; };
    ;
    /**
     * Gets reference to the dynamically created DIV element which represents the dialog.
     */
    IgDialogComponent.prototype.mainElement = function () { return; };
    ;
    /**
     * Closes the dialog if it is opened.
     * 				Notes:
     * 				1. If the state of the dialog changes, then stateChanging and stateChanged events are raised.
     * 				2. That method does not change minimized or maximized state of the dialog.
     * 				It means that method "open" will open the dialog and keep previous minimized or maximized state.
     *
     * @param e     Browser event: internal use only.
     */
    IgDialogComponent.prototype.close = function (e) { return; };
    ;
    /**
     * Opens the dialog if it is closed. Notes:
     * 				1. If the state of the dialog changes, then stateChanging and stateChanged events are raised.
     * 				2. That method does not change minimized or maximized state of the dialog. It means that if the dialog was in minimized or maximized stated when closed by "close" method, then the dialog will open in minimized or maximized state respectively.
     */
    IgDialogComponent.prototype.open = function () { return; };
    ;
    /**
     * Minimizes the dialog if it is not minimized.
     * 				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
     */
    IgDialogComponent.prototype.minimize = function () { return; };
    ;
    /**
     * Maximizes the dialog if it is not maximized.
     * 				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
     */
    IgDialogComponent.prototype.maximize = function () { return; };
    ;
    /**
     * Sets the normal state for the dialog if it was maximized or minimized.
     * 				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
     */
    IgDialogComponent.prototype.restore = function () { return; };
    ;
    /**
     * Pins the dialog if it is not pinned.
     * 				When the dialog is pinned, then the html element of the dialog is moved to the original container where the target element was located and position:absolute is removed.
     * 				The pinned dialog does not support modal state, maximized state and it can not be moved.
     * 				Notes:
     * 				1. If the parent element of the original target-element is invisible, then the pinned dialog becomes invisible as well.
     * 				2. If the state of the dialog changes, then stateChanging and stateChanged events are raised.
     */
    IgDialogComponent.prototype.pin = function () { return; };
    ;
    /**
     * Unpins the dialog if it is pinned.
     * 				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
     */
    IgDialogComponent.prototype.unpin = function () { return; };
    ;
    /**
     * Gets a reference to the top modal dialog.
     */
    IgDialogComponent.prototype.getTopModal = function () { return; };
    ;
    /**
     * Checks if the dialog is modal and if it is currently active.
     */
    IgDialogComponent.prototype.isTopModal = function () { return; };
    ;
    /**
     * Moves a not modal dialog to the top.
     *
     * @param e     Original event of browser.
     */
    IgDialogComponent.prototype.moveToTop = function (e) { return; };
    ;
    /**
     * Retrieves the igDialog content container or sets its content to be the new content provided.
     *
     * @param newContent     The new html content provided as a string. If the parameter is provided then the method acts as a setter.
     */
    IgDialogComponent.prototype.content = function (newContent) { return; };
    ;
    return IgDialogComponent;
}(IgContentControlBase));
IgDialogComponent = __decorate([
    core_1.Component({
        selector: "ig-dialog",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "mainElement", "state", "pinned", "closeOnEscape", "showCloseButton", "showMaximizeButton", "showMinimizeButton", "showPinButton", "pinOnMinimized", "imageClass", "headerText", "showHeader", "showFooter", "footerText", "dialogClass", "container", "height", "width", "minHeight", "minWidth", "maxHeight", "maxWidth", "draggable", "position", "resizable", "tabIndex", "openAnimation", "closeAnimation", "zIndex", "modal", "trackFocus", "closeButtonTitle", "minimizeButtonTitle", "maximizeButtonTitle", "pinButtonTitle", "unpinButtonTitle", "restoreButtonTitle", "temporaryUrl", "enableHeaderFocus", "enableDblclick"],
        outputs: ["stateChanging", "stateChanged", "animationEnded", "focus", "blur"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgDialogComponent);
exports.IgDialogComponent = IgDialogComponent;
var IgSplitterComponent = (function (_super) {
    __extends(IgSplitterComponent, _super);
    function IgSplitterComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Returns the element that represents this widget.
     */
    IgSplitterComponent.prototype.widget = function () { return; };
    ;
    /**
     * Expand the specified panel by index.
     *
     * @param index Specifies the index of the panel to expand.
     */
    IgSplitterComponent.prototype.expandAt = function (index) { return; };
    ;
    /**
     * Collapse the specified panel.
     *
     * @param index Specifies the index of the panel to collapse.
     */
    IgSplitterComponent.prototype.collapseAt = function (index) { return; };
    ;
    /**
     * Retrieves the jQuery element of the first panel.
     */
    IgSplitterComponent.prototype.firstPanel = function () { return; };
    ;
    /**
     * Retrieves the jQuery element of the second panel.
     */
    IgSplitterComponent.prototype.secondPanel = function () { return; };
    ;
    /**
     * Refresh splitter layout, use this method to re-render the splitter if some changes to the layout are applied.
     */
    IgSplitterComponent.prototype.refreshLayout = function () { return; };
    ;
    /**
     * You can set new size of the first panel after the splitter is rendered.
     *
     * @param size Specifies the new size of the first panel.
     */
    IgSplitterComponent.prototype.setFirstPanelSize = function (size) { return; };
    ;
    /**
     * You can set new size of the second panel after the splitter is rendered.
     *
     * @param size Specifies the new size of the second panel.
     */
    IgSplitterComponent.prototype.setSecondPanelSize = function (size) { return; };
    ;
    /**
     * Destroys the igSplitter widget
     */
    IgSplitterComponent.prototype.destroy = function () { return; };
    ;
    return IgSplitterComponent;
}(IgContentControlBase));
IgSplitterComponent = __decorate([
    core_1.Component({
        selector: "ig-splitter",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "orientation", "panels", "dragDelta", "resizeOtherSplitters"],
        outputs: ["collapsed", "expanded", "resizeStarted", "resizing", "resizeEnded", "layoutRefreshing", "layoutRefreshed"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgSplitterComponent);
exports.IgSplitterComponent = IgSplitterComponent;
var IgLayoutManagerComponent = (function (_super) {
    __extends(IgLayoutManagerComponent, _super);
    function IgLayoutManagerComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Triggers recalculation of the layout dimensions. Layouts may not need to be reflowed manually, if their sizes are in percentages (i.e. they are responsive by default)
     *                     this can be particularly useful with a grid layout, when the container has percentage sizes, but items are calculated in pixels and positioned absolutely in the container.
     *
     * @param forceReflow Indicates whether the reflow should be forced. Useful in cases where the items size and position was changed manually.
     * @param animationDuration The animation duration to be used for this reflow only. Supported only for Grid Layout mode.
     * @param event Indicates the browser even which triggered this action (not API).
     */
    IgLayoutManagerComponent.prototype.reflow = function (forceReflow, animationDuration, event) { return; };
    ;
    /**
     * Destroy is part of the jQuery UI widget API and does the following:
     *                     1. Remove custom CSS classes that were added.
     *                     2. Remove any elements that were added at widget's initialization and after that, which didn't below to the original markup
     *                     3. Unbind all events that were bound.
     */
    IgLayoutManagerComponent.prototype.destroy = function () { return; };
    ;
    return IgLayoutManagerComponent;
}(IgContentControlBase));
IgLayoutManagerComponent = __decorate([
    core_1.Component({
        selector: "ig-layout-manager",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "borderLayout", "gridLayout", "height", "itemCount", "items", "layoutMode", "width"],
        outputs: ["internalResized", "internalResizing", "itemRendered", "itemRendering", "rendered"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgLayoutManagerComponent);
exports.IgLayoutManagerComponent = IgLayoutManagerComponent;
var IgTileManagerComponent = (function (_super) {
    __extends(IgTileManagerComponent, _super);
    function IgTileManagerComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Maximizes a given tile.
     *
     * @param $tileToMaximize Specifies the jQuery object of the tile element to be maximized.
     * @param animDuration Specifies the animation duration for this maximizing.
     * @param event Indicates the browser even which triggered this action (not API).
     */
    IgTileManagerComponent.prototype.maximize = function ($tileToMaximize, animDuration, event) { return; };
    ;
    /**
     * Minimizes the maximized tile. Has no effect if no maximized tile is present.
     *
     * @param animDuration Specifies the animation duration for this minimize.
     * @param event Indicates the browser even which triggered this action (not API).
     */
    IgTileManagerComponent.prototype.minimize = function (animDuration, event) { return; };
    ;
    /**
     * Returns the maximized tile or null if such is not present.
     * @return object|null Returns the maximized tile or null if such is not present.
     */
    IgTileManagerComponent.prototype.maximizedTile = function () { return; };
    ;
    /**
     * Returns an array with the tiles in minimized state or null if such are not present.
     * @return object|null Returns an array with the tiles in minimized state or null if such are not present.
     */
    IgTileManagerComponent.prototype.minimizedTiles = function () { return; };
    ;
    /**
     * Returns the splitter associated with this tile manager or
     *                 null if the tile manager was instantiated with maximizedTileIndex.
     * @return object|null Returns the splitter associated with this tile manager or null if the tile manager was instantiated with maximizedTileIndex.
     */
    IgTileManagerComponent.prototype.splitter = function () { return; };
    ;
    /**
     * Returns the [layout manager](ui.iglayoutmanager) associated with current tile manager.
     */
    IgTileManagerComponent.prototype.layoutManager = function () { return; };
    ;
    /**
     * Reflow the tile manager. Rearranging the tiles to fit in the container
     *
     * @param forceReflow Indicates whether the reflow should be forced. Useful in cases where the items size and position was changed manually.
     * @param animationDuration The animation duration to be used for this reflow only.
     * @param event Indicates the browser even which triggered this action (not API).
     */
    IgTileManagerComponent.prototype.reflow = function (forceReflow, animationDuration, event) { return; };
    ;
    /**
     * Returns the element that represents this widget.
     */
    IgTileManagerComponent.prototype.widget = function () { return; };
    ;
    /**
     * Causes the TileManager to data bind to the data source (local or remote) , and re-render all of the data as well.
     */
    IgTileManagerComponent.prototype.dataBind = function () { return; };
    ;
    /**
     * Deletes the widget instance (client object). It is no longer accessible and all its event handlers stop working. Destroys all child widgets. Removes auto-generated HTML content, which is outside the widget, e.g. detached popups, dropdowns, etc.
     */
    IgTileManagerComponent.prototype.destroy = function () { return; };
    ;
    return IgTileManagerComponent;
}(IgContentControlBase));
IgTileManagerComponent = __decorate([
    core_1.Component({
        selector: "ig-tile-manager",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "columnWidth", "columnHeight", "cols", "rows", "marginLeft", "marginTop", "rearrangeItems", "items", "dataSource", "minimizedState", "maximizedState", "maximizedTileIndex", "rightPanelCols", "rightPanelTilesWidth", "rightPanelTilesHeight", "showRightPanelScroll", "splitterOptions", "preventMaximizingSelector", "animationDuration", "dataSourceUrl", "responseDataKey", "responseDataType", "dataSourceType", "requestType", "responseContentType"],
        outputs: ["dataBinding", "dataBound", "rendering", "rendered", "tileRendering", "tileRendered", "tileMaximizing", "tileMaximized", "tileMinimizing", "tileMinimized"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgTileManagerComponent);
exports.IgTileManagerComponent = IgTileManagerComponent;
var IgHtmlEditorComponent = (function (_super) {
    __extends(IgHtmlEditorComponent, _super);
    function IgHtmlEditorComponent(el, renderer, differs, model, zone) {
        var _this = _super.call(this, el, renderer, differs) || this;
        _this.model = model;
        _this.zone = zone;
        _this.onChange = function (_) {
        };
        _this.onTouched = function () {
        };
        if (model) {
            model.valueAccessor = _this;
            _this._zone = zone;
            _this._model = model;
        }
        return _this;
    }
    IgHtmlEditorComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        var that = this;
        if (this._model) {
            var iframe = jQuery(this._el).find("iframe")[0].contentWindow.document;
            jQuery(iframe).find("body[contenteditable=true]").on("keyup", function (evt, ui) {
                that._model.viewToModelUpdate(jQuery(evt.target).html());
                that._zone.run(function () {
                    that._model.viewToModelUpdate(jQuery(evt.target).html());
                });
            });
        }
    };
    IgHtmlEditorComponent.prototype.writeValue = function (value) {
        if (!!jQuery(this._el).data(this._widgetName) && value !== null && value !== jQuery(this._el)[this._widgetName]("getContent", "html")) {
            jQuery(this._el)[this._widgetName]("setContent", value, "html");
        }
    };
    IgHtmlEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    IgHtmlEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Returns the element on which the widget was instantiated
     */
    IgHtmlEditorComponent.prototype.widget = function () { return; };
    ;
    /**
     * Resizes the height of the workspace
     */
    IgHtmlEditorComponent.prototype.resizeWorkspace = function () { return; };
    ;
    /**
     * Gets the content of the html editor.
     *
     * @param format Returns the content as html or plain text. Values can be "text" or "html".
     */
    IgHtmlEditorComponent.prototype.getContent = function (format) { return; };
    ;
    /**
     * Sets the content of the html editor.
     *
     * @param content The content which will be set.
     * @param format The content type: "text" or "html".
     */
    IgHtmlEditorComponent.prototype.setContent = function (content, format) { return; };
    ;
    /**
     * Destroys the widget.
     */
    IgHtmlEditorComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Executes htmleditor commands.
     *
     * @param actionName The command name.
     * @param args Additional parameter for the command.
     */
    IgHtmlEditorComponent.prototype.executeAction = function (actionName, args) { return; };
    ;
    /**
     * Returns true/false if the editor contents were modified or not.
     */
    IgHtmlEditorComponent.prototype.isDirty = function () { return; };
    ;
    /**
     * Returns the window object associated with the Html Editor's content editable area
     */
    IgHtmlEditorComponent.prototype.contentWindow = function () { return; };
    ;
    /**
     * Returns the document object associated with the Html Editor's content editable area
     */
    IgHtmlEditorComponent.prototype.contentDocument = function () { return; };
    ;
    /**
     * Returns the content editable associated with this Html Editor
     */
    IgHtmlEditorComponent.prototype.contentEditable = function () { return; };
    ;
    /**
     * Returns Selection object that represent the current selection in the content editable
     */
    IgHtmlEditorComponent.prototype.selection = function () { return; };
    ;
    /**
     * Returns Range object that represent the current range in the content editable
     */
    IgHtmlEditorComponent.prototype.range = function () { return; };
    ;
    /**
     * Inserts the provided content at the position of the caret.
     *
     * @param element Accepts html string, DOM element or a jQuery object.
     */
    IgHtmlEditorComponent.prototype.insertAtCaret = function (element) { return; };
    ;
    return IgHtmlEditorComponent;
}(IgControlBase));
IgHtmlEditorComponent = __decorate([
    core_1.Component({
        selector: "ig-html-editor",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "showFormattingToolbar", "showTextToolbar", "showInsertObjectToolbar", "showCopyPasteToolbar", "width", "height", "toolbarSettings", "customToolbars", "inputName", "value"],
        outputs: ["rendered", "rendering", "actionExecuting", "actionExecuted", "toolbarCollapsing", "toolbarCollapsed", "toolbarExpanding", "toolbarExpanded", "cut", "copy", "paste", "undo", "redo", "workspaceResized"]
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers, forms_1.NgModel, core_1.NgZone])
], IgHtmlEditorComponent);
exports.IgHtmlEditorComponent = IgHtmlEditorComponent;
var IgValidatorComponent = (function (_super) {
    __extends(IgValidatorComponent, _super);
    function IgValidatorComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgValidatorComponent.prototype.ngOnInit = function () {
        var evtName;
        this._el = jQuery(document).find("#" + this.widgetId);
        jQuery(this._el)[this._widgetName](this._config);
        this._events = new Map();
        //events binding
        var that = this;
        for (var propt in jQuery.ui[this._widgetName].prototype.events) {
            evtName = this._widgetName.toLowerCase() + propt.toLowerCase();
            this._events[evtName] = propt;
            jQuery(this._el).on(evtName, function (evt, ui) {
                that[that._events[evt.type]].emit({ event: evt, ui: ui });
            });
        }
    };
    /**
     * Trigger validation and show errors for invalid fields.
     *
     * @param field    Optional field object, its selector or zero-based index to check. Only has effect with fields collection and skips other fields.
     */
    IgValidatorComponent.prototype.validate = function (field) { return; };
    ;
    /**
     * Trigger validation but do not display error messages.
     *
     * @param field    Optional field object, its selector or zero-based index to check. Only has effect with fields collection and skips other fields.
     */
    IgValidatorComponent.prototype.isValid = function (field) { return; };
    ;
    /**
     * Hide any possible message(s) (either messageTarget or igNotifier).
     * 			Note: When the validator has a fields colleciton, not passing a field will hide messages on all fields.
     *
     * @param field    Optional field object, its selector or zero-based index to hide message for.
     */
    IgValidatorComponent.prototype.hide = function (field) { return; };
    ;
    /**
     * Gets all current error messages for invalid field(s). Note that this method does not valdiate and states and messages are only updated on validation, so
     * 			this can be used on formValidated event or after validate/isValid method calls.
     *
     * @param field    Optional field object, selector or zero-based index for a single field to get error message for.
     */
    IgValidatorComponent.prototype.getErrorMessages = function (field) { return; };
    ;
    /**
     * Check for currently displayed message(s). Takes an optional field.
     * 			Note: When the validator has a fields colleciton, not passing a field will return a cumulative true even if just one field has a visible message.
     *
     * @param field    Optional field object, selector or zero-based index for a single field to get error message for.
     */
    IgValidatorComponent.prototype.isMessageDisplayed = function (field) { return; };
    ;
    /**
     * Gets the notifier for the igValidator or for a single filed.
     *
     * @param field    Optional field object, its selector or zero-based index to get notifier for.
     */
    IgValidatorComponent.prototype.notifier = function (field) { return; };
    ;
    /**
     * Adds an new input to the fields collection and initializes it with the validator. Note: Additional fields are only accepted if the validator has been created with the collection.
     *
     * @param field    An object with the field selector and options.
     */
    IgValidatorComponent.prototype.addField = function (field) { return; };
    ;
    /**
     * Removes an input from the fields collection.
     *
     * @param field    The field object to remove, its zero-based index or selector.
     */
    IgValidatorComponent.prototype.removeField = function (field) { return; };
    ;
    /**
     * Updates a field in the validator collection. Used to reinitialize field in case a control has been created after the validator or to pass in new options.
     *
     * @param field    The field object to update, its zero-based index or selector.
     * @param fieldOptions    New options to apply to the field.
     */
    IgValidatorComponent.prototype.updateField = function (field, fieldOptions) { return; };
    ;
    /**
     * Destroys the validator widget.
     */
    IgValidatorComponent.prototype.destroy = function () { return; };
    ;
    return IgValidatorComponent;
}(IgControlBase));
IgValidatorComponent = __decorate([
    core_1.Component({
        selector: "ig-validator",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "onchange", "onblur", "onsubmit", "required", "number", "date", "email", "lengthRange", "valueRange", "creditCard", "pattern", "messageTarget", "errorMessage", "successMessage", "threshold", "equalTo", "custom", "fields", "notificationOptions", "requiredIndication", "optionalIndication"],
        outputs: ["validating", "validated", "success", "error", "errorShowing", "errorHiding", "errorShown", "errorHidden", "successShowing", "successHiding", "successShown", "successHidden", "formValidating", "formValidated", "formError", "formSuccess"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgValidatorComponent);
exports.IgValidatorComponent = IgValidatorComponent;
//Pivot Grids
var IgPivotDataSelectorComponent = (function (_super) {
    __extends(IgPivotDataSelectorComponent, _super);
    function IgPivotDataSelectorComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Updates the data source.
     */
    IgPivotDataSelectorComponent.prototype.update = function () { return; };
    ;
    /**
     * Destroy is part of the jQuery UI widget API and does the following:
     *                 1. Remove custom CSS classes that were added.
     *                 2. Unwrap any wrapping elements such as scrolling divs and other containers.
     *                 3. Unbind all events that were bound.
     */
    IgPivotDataSelectorComponent.prototype.destroy = function () { return; };
    ;
    return IgPivotDataSelectorComponent;
}(IgControlBase));
IgPivotDataSelectorComponent = __decorate([
    core_1.Component({
        selector: "ig-pivot-data-selector",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "dataSource", "dataSourceOptions", "deferUpdate", "dragAndDropSettings", "dropDownParent", "disableRowsDropArea", "disableColumnsDropArea", "disableMeasuresDropArea", "disableFiltersDropArea", "customMoveValidation"],
        outputs: ["dataSelectorRendered", "dataSourceInitialized", "dataSourceUpdated", "deferUpdateChanged", "dragStart", "drag", "dragStop", "metadataDropping", "metadataDropped", "metadataRemoving", "metadataRemoved", "filterDropDownOpening", "filterDropDownOpened", "filterMembersLoaded", "filterDropDownOk", "filterDropDownClosing", "filterDropDownClosed"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgPivotDataSelectorComponent);
exports.IgPivotDataSelectorComponent = IgPivotDataSelectorComponent;
var IgPivotGridComponent = (function (_super) {
    __extends(IgPivotGridComponent, _super);
    function IgPivotGridComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Returns the igGrid instance used to render the OLAP data.
     */
    IgPivotGridComponent.prototype.grid = function () { return; };
    ;
    /**
     * Triggers an update on the data source and the igPivotGrid.
     */
    IgPivotGridComponent.prototype.updateGrid = function () { return; };
    ;
    /**
     * Expands a member from the data source and returns true if the expand succeeds. If the data source has a pending update, the method will return false. Note that igPivotGrid to will display the expanded result after the data source is updated.
     *
     * @param tupleLocation The name of the parent axis - 'columnAxis' or 'rowAxis'.
     * @param tupleIndex The index of the containing tuple. This index should correspond to the position of the tuple in the original unsorted result of the data source.
     * @param memberIndex The index of the member in the tuple. This index should correspond to the position of the member in the original unsorted result of the data source.
     * @param shouldUpdate A flag indicating whether the data source should be updated after the expand.
     */
    IgPivotGridComponent.prototype.expandTupleMember = function (tupleLocation, tupleIndex, memberIndex, shouldUpdate) { return; };
    ;
    /**
     * Collapses a member from the data source and returns true if the collapse succeeds. If the data source has a pending update, the method will return false. Note that igPivotGrid to will display the expanded result after the data source is updated.
     *
     * @param tupleLocation The name of the parent axis - 'columnAxis' or 'rowAxis'.
     * @param tupleIndex The index of the containing tuple. This index should correspond to the position of the tuple in the original unsorted result of the data source.
     * @param memberIndex The index of the member in the tuple. This index should correspond to the position of the member in the original unsorted result of the data source.
     * @param shouldUpdate A flag indicating whether the data source should be updated after the expand.
     */
    IgPivotGridComponent.prototype.collapseTupleMember = function (tupleLocation, tupleIndex, memberIndex, shouldUpdate) { return; };
    ;
    /**
     * Returns an array with the applied sort directions on the igPivotGrid's columns. The returned array contains objects with the following properties:
     *             memberNames: The names of the members in the tuple.
     *             tupleIndex: The index of the tuple on the column axis in the original unsorted result.
     *             sortDirection: The direction of the sort - ascending or descending.
     */
    IgPivotGridComponent.prototype.appliedColumnSortDirections = function () { return; };
    ;
    /**
     * Returns an array with the applied level sort direction items, which were used for the sorting of the header cells. The returned array contains objects with the following properties:
     *             levelUniqueName: Specifies the unique name of the level, which was sorted.
     *             sortDirection: The direction of the header sort - ascending or descending.
     */
    IgPivotGridComponent.prototype.appliedLevelSortDirections = function () { return; };
    ;
    /**
     * Destroy is part of the jQuery UI widget API and does the following:
     *             1. Remove custom CSS classes that were added.
     *             2. Unwrap any wrapping elements such as scrolling divs and other containers.
     *             3. Unbind all events that were bound.
     */
    IgPivotGridComponent.prototype.destroy = function () { return; };
    ;
    return IgPivotGridComponent;
}(IgControlBase));
IgPivotGridComponent = __decorate([
    core_1.Component({
        selector: "ig-pivot-grid",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "dataSource", "dataSourceOptions", "deferUpdate", "isParentInFrontForColumns", "isParentInFrontForRows", "compactColumnHeaders", "compactRowHeaders", "rowHeadersLayout", "compactColumnHeaderIndentation", "compactRowHeaderIndentation", "rowHeaderLinkGroupIndentation", "treeRowHeaderIndentation", "defaultRowHeaderWidth", "allowSorting", "firstSortDirection", "allowHeaderRowsSorting", "allowHeaderColumnsSorting", "levelSortDirections", "defaultLevelSortBehavior", "firstLevelSortDirection", "gridOptions", "dragAndDropSettings", "dropDownParent", "disableRowsDropArea", "disableColumnsDropArea", "disableMeasuresDropArea", "disableFiltersDropArea", "hideRowsDropArea", "hideColumnsDropArea", "hideMeasuresDropArea", "hideFiltersDropArea", "customMoveValidation"],
        outputs: ["dataSourceInitialized", "dataSourceUpdated", "pivotGridHeadersRendered", "pivotGridRendered", "tupleMemberExpanding", "tupleMemberExpanded", "tupleMemberCollapsing", "tupleMemberCollapsed", "sorting", "sorted", "headersSorting", "headersSorted", "dragStart", "drag", "dragStop", "metadataDropping", "metadataDropped", "metadataRemoving", "metadataRemoved", "filterDropDownOpening", "filterDropDownOpened", "filterMembersLoaded", "filterDropDownOk", "filterDropDownClosing", "filterDropDownClosed"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgPivotGridComponent);
exports.IgPivotGridComponent = IgPivotGridComponent;
//Charts
var IgDataChartComponent = (function (_super) {
    __extends(IgDataChartComponent, _super);
    function IgDataChartComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgDataChartComponent.prototype.option = function () { return; };
    ;
    /**
     * Returns the element holding the chart.
     */
    IgDataChartComponent.prototype.widget = function () { return; };
    ;
    /**
     * Returns the ID of parent element holding the chart.
     */
    IgDataChartComponent.prototype.id = function () { return; };
    ;
    /**
     * Exports the chart to a PNG image.
     *
     * @param width     The width of the image.
     * @param height     The height of the image.
     */
    IgDataChartComponent.prototype.exportImage = function (width, height) { return; };
    ;
    /**
     * Destroys the widget.
     */
    IgDataChartComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Notify the chart that styles it draws colors from may have been updated.
     */
    IgDataChartComponent.prototype.styleUpdated = function () { return; };
    ;
    /**
     * Resets the zoom level of the chart to default.
     */
    IgDataChartComponent.prototype.resetZoom = function () { return; };
    ;
    /**
     * Adds a new item to the data source and notifies the chart.
     *
     * @param item     The item that we want to add to the data source.
     * @param targetName     The name of the series or axis bound to the data source. This is required only when the data is bound to series or axis. If the data is bound to dataSource of igDataChart, the second parameter should not be set.
     */
    IgDataChartComponent.prototype.addItem = function (item, targetName) { return; };
    ;
    /**
     * Inserts a new item to the data source and notifies the chart.
     *
     * @param item     the new item that we want to insert in the data source.
     * @param index     The index in the data source where the new item will be inserted.
     * @param targetName     The name of the series or axis bound to the data source.
     */
    IgDataChartComponent.prototype.insertItem = function (item, index, targetName) { return; };
    ;
    /**
     * Deletes an item from the data source and notifies the chart.
     *
     * @param index     The index in the data source from where the item will be been removed.
     * @param targetName     The name of the series or axis bound to the data source. This is required only when the data is bound to series or axis. If the data is bound to dataSource of igDataChart, the second parameter should not be set.
     */
    IgDataChartComponent.prototype.removeItem = function (index, targetName) { return; };
    ;
    /**
     * Updates an item in the data source and notifies the chart.
     *
     * @param index     The index of the item in the data source that we want to change.
     * @param item     The new item object that will be set in the data source.
     * @param targetName     The name of the series or axis bound to the data source.
     */
    IgDataChartComponent.prototype.setItem = function (index, item, targetName) { return; };
    ;
    /**
     * Notifies the chart that an item has been set in an associated data source.
     *
     * @param dataSource     The data source in which the change happened.
     * @param index     The index in the items source that has been changed.
     * @param newItem     the new item that has been set in the collection.
     * @param oldItem     the old item that has been overwritten in the collection.
     */
    IgDataChartComponent.prototype.notifySetItem = function (dataSource, index, newItem, oldItem) { return; };
    ;
    /**
     * Notifies the chart that the items have been cleared from an associated data source.
     * 				It's not necessary to notify more than one target of a change if they share the same items source.
     *
     * @param dataSource     The data source in which the change happened.
     */
    IgDataChartComponent.prototype.notifyClearItems = function (dataSource) { return; };
    ;
    /**
     * Notifies the target axis or series that an item has been inserted at the specified index in its data source.
     * 				It's not necessary to notify more than one target of a change if they share the same items source.
     *
     * @param dataSource     The data source in which the change happened.
     * @param index     The index in the items source where the new item has been inserted.
     * @param newItem     the new item that has been set in the collection.
     */
    IgDataChartComponent.prototype.notifyInsertItem = function (dataSource, index, newItem) { return; };
    ;
    /**
     * Notifies the target axis or series that an item has been removed from the specified index in its data source.
     * 				It's not necessary to notify more than one target of a change if they share the same items source.
     *
     * @param dataSource     The data source in which the change happened.
     * @param index     The index in the items source from where the old item has been removed.
     * @param oldItem     the old item that has been removed from the collection.
     */
    IgDataChartComponent.prototype.notifyRemoveItem = function (dataSource, index, oldItem) { return; };
    ;
    /**
     * Notifies the target axis or series that it should scroll the requested data item into view.
     *
     * @param targetName     The name of the axis or series notify.
     * @param item     The data item to bring into view, if possible.
     */
    IgDataChartComponent.prototype.scrollIntoView = function (targetName, item) { return; };
    ;
    /**
     * Notifies the target axis that it should scale the requested value into chart space from axis space.
     * 				For example you can use this method if you want to find where value 50 of the x axis stands scaled to chart's width.
     *
     * @param targetName     The name of the axis to notify.
     * @param unscaledValue     The value in axis space to translate into chart space.
     */
    IgDataChartComponent.prototype.scaleValue = function (targetName, unscaledValue) { return; };
    ;
    /**
     * Notifies the target axis that it should unscale the requested value into axis space from chart space.
     * 				For example you can use this method if you want to find what is the value of x axis unscaled from 0 width of the chart.
     *
     * @param targetName     The name of the axis to notify.
     * @param scaledValue     The value in chart space to translate into axis space.
     */
    IgDataChartComponent.prototype.unscaleValue = function (targetName, scaledValue) { return; };
    ;
    /**
     * For the target axis, if using enhanced interval management and precise interval fitting, this will reset the cached maximum label width, and recalculate using the current labels.
     *
     * @param targetName     The name of the axis to notify.
     */
    IgDataChartComponent.prototype.resetCachedEnhancedInterval = function (targetName) { return; };
    ;
    /**
     * Notifies the target series that something that affects its visual properties has changed and the visual output needs a repaint.
     *
     * @param targetName     The name of the series to notify.
     */
    IgDataChartComponent.prototype.notifyVisualPropertiesChanged = function (targetName) { return; };
    ;
    /**
     * Forces any pending deferred work to render on the chart before continuing
     */
    IgDataChartComponent.prototype.flush = function () { return; };
    ;
    /**
     * Exports visual data from the chart to aid in unit testing
     */
    IgDataChartComponent.prototype.exportVisualData = function () { return; };
    ;
    /**
     * Gets the actual minimum value of the target numeric or date time axis
     *
     * @param targetName    The name of the axis from which to get the minimum value.
     */
    IgDataChartComponent.prototype.getActualMinimumValue = function (targetName) { return; };
    ;
    /**
     * Gets the actual maximum value of the target numeric or date time axis
     *
     * @param targetName    The name of the axis from which to get the maximum value.
     */
    IgDataChartComponent.prototype.getActualMaximumValue = function (targetName) { return; };
    ;
    /**
     * Gets the actual interval of the target numeric or date time axis
     *
     * @param targetName    The name of the axis from which to get the interval.
     */
    IgDataChartComponent.prototype.getActualInterval = function (targetName) { return; };
    ;
    /**
     * Creates a print preview page with the chart, hiding all other elements on the page.
     */
    IgDataChartComponent.prototype.print = function () { return; };
    ;
    /**
     * Indicates that a series should render, even though no option has been modified that would normally cause it to refresh.
     *
     * @param targetName     The name of the series to render.
     * @param animate     Whether the change should be animated, if possible.
     */
    IgDataChartComponent.prototype.renderSeries = function (targetName, animate) { return; };
    ;
    /**
     * Gets the item item index associated with the specified world position.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     */
    IgDataChartComponent.prototype.getItemIndex = function (targetName, worldPoint) { return; };
    ;
    /**
     * Gets the item that is the best match for the specified world coordinates.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     */
    IgDataChartComponent.prototype.getItem = function (targetName, worldPoint) { return; };
    ;
    /**
     * For a category plotted series, gets the current width of the items within the categories. This only returns a value if the items have some form of width (e.g. columns, bars, etc.) otherwise 0 is returned.
     *
     * @param targetName    The name of the series to target.
     */
    IgDataChartComponent.prototype.getItemSpan = function (targetName) { return; };
    ;
    /**
     * If possible, will return the best available main value of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesValue = function (targetName, worldPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available value bounding box within the series that has the best value match for the world position provided.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     */
    IgDataChartComponent.prototype.getSeriesValueBoundingBox = function (targetName, worldPoint) { return; };
    ;
    /**
     * If possible, will return the best available value fine grained bounding boxes within the series that have the best value match for the world position provided.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     */
    IgDataChartComponent.prototype.getSeriesValueFineGrainedBoundingBoxes = function (targetName, worldPoint) { return; };
    ;
    /**
     * If possible, will return the best available main value position of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesValuePosition = function (targetName, worldPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available main value position of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The series pixel position (in the form {x: [number], y: [number]} that represents a position within the pixel space of the series.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesValuePositionFromSeriesPixel = function (targetName, seriesPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available main value of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The series pixel position (in the form {x: [number], y: [number]} ) that represents a position in the pixel space of the series.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesValueFromSeriesPixel = function (targetName, seriesPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available value bounding box within the series that has the best value match for the given series pixel coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The series pixel position (in the form {x: [number], y: [number]} ) that represents a position in the pixel space of the series.
     */
    IgDataChartComponent.prototype.getSeriesValueBoundingBoxFromSeriesPixel = function (targetName, seriesPoint) { return; };
    ;
    /**
     * If possible, will return the best available value fine grained bounding boxes within the series that have the best value match for series pixel position provided.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The series pixel position (in the form {x: [number], y: [number]} ) that represents a position in the pixel space of the series.
     */
    IgDataChartComponent.prototype.getSeriesValueFineGrainedBoundingBoxesFromSeriesPixel = function (targetName, worldPoint) { return; };
    ;
    /**
     * If possible, will return the best available high value of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesHighValue = function (targetName, worldPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available high value position of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesHighValuePosition = function (targetName, worldPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available high value position of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The series pixel position (in the form {x: [number], y: [number]} that represents a position within the pixel space of the series.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesHighValuePositionFromSeriesPixel = function (targetName, seriesPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available high value of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The series pixel position (in the form {x: [number], y: [number]} ) that represents a position in the pixel space of the series.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesHighValueFromSeriesPixel = function (targetName, seriesPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available low value of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesLowValue = function (targetName, worldPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available low value position of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesLowValuePosition = function (targetName, worldPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available low value position of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The series pixel position (in the form {x: [number], y: [number]} that represents a position within the pixel space of the series.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesLowValuePositionFromSeriesPixel = function (targetName, seriesPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * If possible, will return the best available low value of the series for a given world coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The series pixel position (in the form {x: [number], y: [number]} ) that represents a position in the pixel space of the series.
     * @param useInterpolation    If true, interpolation should be used to get in-between values, rather than only the actual values in the data set.
     * @param skipUnknowns    If true, unknown values should be skipped.
     */
    IgDataChartComponent.prototype.getSeriesLowValueFromSeriesPixel = function (targetName, seriesPoint, useInterpolation, skipUnknowns) { return; };
    ;
    /**
     * Gets the item item index associated with the specified series pixel coordinate.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The world position (in the form {x: [number from 0 to 1], y: [number from 0 to 1]} ) that represents a position in the space of the axes.
     */
    IgDataChartComponent.prototype.getItemIndexFromSeriesPixel = function (targetName, seriesPoint) { return; };
    ;
    /**
     * Gets the item that is the best match for the specified world coordinates.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The series pixel position (in the form {x: [number], y: [number]} ) that represents a position in the pixel space of the series.
     */
    IgDataChartComponent.prototype.getItemFromSeriesPixel = function (targetName, seriesPoint) { return; };
    ;
    /**
     * Gets the category offset for a series, if applicable.
     *
     * @param targetName    The name of the series to target.
     */
    IgDataChartComponent.prototype.getSeriesOffsetValue = function (targetName) { return; };
    ;
    /**
     * Gets the category width for a series, if applicable.
     *
     * @param targetName    The name of the series to target.
     */
    IgDataChartComponent.prototype.getSeriesCategoryWidth = function (targetName) { return; };
    ;
    /**
     * Replays the transition in animation for a series, if applicable.
     *
     * @param targetName    The name of the series to target.
     */
    IgDataChartComponent.prototype.replayTransitionIn = function (targetName) { return; };
    ;
    /**
     * Simulates a hover interaction over a given point in the viewport of a series.
     *
     * @param targetName    The name of the series to target.
     * @param seriesPoint    The point at which to hover. Should have an x property with type number and a y property with type number.
     */
    IgDataChartComponent.prototype.simulateHover = function (targetName, seriesPoint) { return; };
    ;
    /**
     * Moves the cursor point of the target annotation layer to the desired world coordinates.
     *
     * @param targetName    The name of the series to target.
     * @param worldPoint    The point to which to move the cursor. Should have an x property with type number and a y property with type number.
     */
    IgDataChartComponent.prototype.moveCursorPoint = function (targetName, worldPoint) { return; };
    ;
    /**
     * Manually starts a tiled zoom if one isn't already running.
     */
    IgDataChartComponent.prototype.startTiledZoomingIfNecessary = function () { return; };
    ;
    /**
     * Manually ends a tiled zoom if one is running.
     */
    IgDataChartComponent.prototype.endTiledZoomingIfRunning = function () { return; };
    ;
    /**
     * Clears the tile zoom tile cache so that new tiles will be generated. Only applies if the viewer is using a tile based zoom.
     */
    IgDataChartComponent.prototype.clearTileZoomCache = function () { return; };
    ;
    return IgDataChartComponent;
}(IgControlBase));
IgDataChartComponent = __decorate([
    core_1.Component({
        selector: "ig-data-chart",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "isPagePanningAllowed", "syncChannel", "synchronizeVertically", "synchronizeHorizontally", "crosshairPoint", "windowRect", "horizontalZoomable", "verticalZoomable", "windowResponse", "windowRectMinWidth", "overviewPlusDetailPaneVisibility", "crosshairVisibility", "plotAreaBackground", "defaultInteraction", "dragModifier", "panModifier", "previewRect", "windowPositionHorizontal", "windowPositionVertical", "windowScaleHorizontal", "windowScaleVertical", "circleMarkerTemplate", "triangleMarkerTemplate", "pyramidMarkerTemplate", "squareMarkerTemplate", "diamondMarkerTemplate", "pentagonMarkerTemplate", "hexagonMarkerTemplate", "tetragramMarkerTemplate", "pentagramMarkerTemplate", "hexagramMarkerTemplate", "topMargin", "leftMargin", "rightMargin", "bottomMargin", "autoMarginWidth", "autoMarginHeight", "isSquare", "gridMode", "brushes", "markerBrushes", "outlines", "markerOutlines", "width", "height", "size", "dataSource", "dataSourceUrl", "dataSourceType", "responseDataKey", "isSurfaceInteractionDisabled", "animateSeriesWhenAxisRangeChanges", "title", "subtitle", "titleTextStyle", "titleTopMargin", "titleLeftMargin", "titleRightMargin", "titleBottomMargin", "subtitleTextStyle", "subtitleTopMargin", "subtitleLeftMargin", "subtitleRightMargin", "subtitleBottomMargin", "titleTextColor", "subtitleTextColor", "titleHorizontalAlignment", "subtitleHorizontalAlignment", "highlightingTransitionDuration", "useTiledZooming", "preferHigherResolutionTiles", "pixelScalingRatio", "zoomTileCacheSize", "contentHitTestMode", "legend", "axes", "series", "theme"],
        outputs: ["tooltipShowing", "tooltipShown", "tooltipHiding", "tooltipHidden", "browserNotSupported", "seriesCursorMouseMove", "seriesMouseLeftButtonDown", "seriesMouseLeftButtonUp", "seriesMouseMove", "seriesMouseEnter", "seriesMouseLeave", "windowRectChanged", "gridAreaRectChanged", "refreshCompleted", "axisRangeChanged", "typicalBasedOn", "progressiveLoadStatusChanged", "assigningCategoryStyle", "assigningCategoryMarkerStyle"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgDataChartComponent);
exports.IgDataChartComponent = IgDataChartComponent;
var IgPieChartComponent = (function (_super) {
    __extends(IgPieChartComponent, _super);
    function IgPieChartComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgPieChartComponent.prototype.option = function () { return; };
    ;
    /**
     * Adds a new item to the data source and notifies the chart.
     *
     * @param item     the new item that will be added to the data source.
     */
    IgPieChartComponent.prototype.addItem = function (item) { return; };
    ;
    /**
     * Inserts a new item to the data source and notifies the chart.
     *
     * @param item     the new item that will be inserted in the data source.
     * @param index     The index in the data source where the new item will be inserted.
     */
    IgPieChartComponent.prototype.insertItem = function (item, index) { return; };
    ;
    /**
     * Deletes an item from the data source and notifies the chart.
     *
     * @param index     The index in the data source from where the item will be been removed.
     */
    IgPieChartComponent.prototype.removeItem = function (index) { return; };
    ;
    /**
     * Updates an item in the data source and notifies the chart.
     *
     * @param index     The index in the data source that we want to change.
     * @param item     the new item that we want to set in the data source.
     */
    IgPieChartComponent.prototype.setItem = function (index, item) { return; };
    ;
    /**
     * Exports the chart to a PNG image.
     *
     * @param width     The width of the image.
     * @param height     The height of the image.
     */
    IgPieChartComponent.prototype.exportImage = function (width, height) { return; };
    ;
    /**
     * Destroys the widget.
     */
    IgPieChartComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Returns the ID of parent element holding the chart.
     */
    IgPieChartComponent.prototype.id = function () { return; };
    ;
    /**
     * Returns the element holding the chart.
     */
    IgPieChartComponent.prototype.widget = function () { return; };
    ;
    /**
     * Creates a print preview page with the chart, hiding all other elements on the page.
     */
    IgPieChartComponent.prototype.print = function () { return; };
    ;
    /**
     * Exports visual data from the pie chart to aid in unit testing
     */
    IgPieChartComponent.prototype.exportVisualData = function () { return; };
    ;
    return IgPieChartComponent;
}(IgControlBase));
IgPieChartComponent = __decorate([
    core_1.Component({
        selector: "ig-pie-chart",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "dataSource", "dataSourceUrl", "dataSourceType", "responseDataKey", "valueMemberPath", "labelMemberPath", "dataValue", "dataLabel", "labelsPosition", "labelOuterColor", "labelInnerColor", "selectionMode", "selectedItem", "selectedItems", "leaderLineVisibility", "leaderLineType", "leaderLineMargin", "othersCategoryThreshold", "formatLabel", "othersCategoryStyle", "othersCategoryType", "othersCategoryText", "explodedRadius", "radiusFactor", "allowSliceSelection", "allowSliceExplosion", "explodedSlices", "selectedSlices", "showTooltip", "tooltipTemplate", "legend", "labelExtent", "startAngle", "sweepDirection", "selectedStyle", "brushes", "outlines", "legendItemTemplate", "legendItemBadgeTemplate", "textStyle", "theme"],
        outputs: ["tooltipShowing", "tooltipShown", "tooltipHiding", "tooltipHidden", "browserNotSupported", "sliceClick", "labelClick", "selectedItemChanging", "selectedItemChanged", "selectedItemsChanging", "selectedItemsChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgPieChartComponent);
exports.IgPieChartComponent = IgPieChartComponent;
var IgDoughnutChartComponent = (function (_super) {
    __extends(IgDoughnutChartComponent, _super);
    function IgDoughnutChartComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Adds a new series to the doughnut chart.
     *
     * @param seriesObj     The series object to be added.
     */
    IgDoughnutChartComponent.prototype.addSeries = function (seriesObj) { return; };
    ;
    /**
     * Removes the specified series from the doughnut chart.
     *
     * @param seriesObj     The series object identifying the series to be removed.
     */
    IgDoughnutChartComponent.prototype.removeSeries = function (seriesObj) { return; };
    ;
    /**
     * Updates the series with the specified name with the specified new property values.
     *
     * @param value     The series object identifying the series to be updated.
     */
    IgDoughnutChartComponent.prototype.updateSeries = function (value) { return; };
    ;
    /**
     * Returns the center of the doughnut chart.
     */
    IgDoughnutChartComponent.prototype.getCenterCoordinates = function () { return; };
    ;
    /**
     * Returns the radius of the chart's hole.
     */
    IgDoughnutChartComponent.prototype.getHoleRadius = function () { return; };
    ;
    /**
     * Returns information about how the doughnut chart is rendered.
     */
    IgDoughnutChartComponent.prototype.exportVisualData = function () { return; };
    ;
    /**
     * Causes all of the series that have pending changes e.g. by changed property values to be rendered immediately.
     */
    IgDoughnutChartComponent.prototype.flush = function () { return; };
    ;
    /**
     * Destroys the widget.
     */
    IgDoughnutChartComponent.prototype.destroy = function () { return; };
    ;
    return IgDoughnutChartComponent;
}(IgControlBase));
IgDoughnutChartComponent = __decorate([
    core_1.Component({
        selector: "ig-doughnut-chart",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "tooltipTemplate", "maxRecCount", "dataSource", "dataSourceType", "dataSourceUrl", "responseTotalRecCountKey", "responseDataKey", "series", "allowSliceSelection", "isSurfaceInteractionDisabled", "allowSliceExplosion", "innerExtent", "selectedStyle"],
        outputs: ["dataBinding", "dataBound", "updateTooltip", "hideTooltip", "tooltipShowing", "tooltipShown", "tooltipHiding", "tooltipHidden", "browserNotSupported", "sliceClick", "holeDimensionsChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgDoughnutChartComponent);
exports.IgDoughnutChartComponent = IgDoughnutChartComponent;
var IgFunnelChartComponent = (function (_super) {
    __extends(IgFunnelChartComponent, _super);
    function IgFunnelChartComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Gets array of selected slice items.
     *
     * @param selection     Array or selected slice items.
     * @return array|object     If parameter is undefined, then array of selected items is returned. Otherwise, it returns reference to igFunnelChart.
     */
    IgFunnelChartComponent.prototype.selectedSliceItems = function (selection) { return; };
    ;
    /**
     * Gets sets array of indexes of selected slices.
     *
     * @param selection     Array or selected slice indexes.
     * @return array|object     If parameter is undefined, then array of selected indexes is returned. Otherwise, it returns reference to igFunnelChart.
     */
    IgFunnelChartComponent.prototype.selectedSliceIndexes = function (selection) { return; };
    ;
    /**
     * Checks if slice is selected.
     *
     * @param slice     Index of slice or reference to slice-data-item.
     */
    IgFunnelChartComponent.prototype.isSelected = function (slice) { return; };
    ;
    /**
     * Toggles selected state of slice.
     *
     * @param slice     Index of slice or reference to slice-data-item.
     */
    IgFunnelChartComponent.prototype.toggleSelection = function (slice) { return; };
    ;
    IgFunnelChartComponent.prototype.exportVisualData = function () { return; };
    ;
    /**
     * Destroys widget.
     */
    IgFunnelChartComponent.prototype.destroy = function () { return; };
    ;
    return IgFunnelChartComponent;
}(IgControlBase));
IgFunnelChartComponent = __decorate([
    core_1.Component({
        selector: "ig-funnel-chart",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "tooltipTemplate", "maxRecCount", "dataSource", "dataSourceType", "dataSourceUrl", "responseTotalRecCountKey", "responseDataKey", "bezierPoints", "legend", "valueMemberPath", "brushes", "outlines", "bottomEdgeWidth", "innerLabelMemberPath", "outerLabelMemberPath", "innerLabelVisibility", "outerLabelVisibility", "outerLabelAlignment", "funnelSliceDisplay", "formatInnerLabel", "formatOuterLabel", "transitionDuration", "isInverted", "useBezierCurve", "allowSliceSelection", "useUnselectedStyle", "selectedSliceStyle", "unselectedSliceStyle", "legendItemBadgeTemplate", "useOuterLabelsForLegend", "textStyle", "outerLabelTextStyle", "outlineThickness", "pixelScalingRatio", "outerLabelTextColor", "textColor"],
        outputs: ["dataBinding", "dataBound", "updateTooltip", "hideTooltip", "sliceClicked"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgFunnelChartComponent);
exports.IgFunnelChartComponent = IgFunnelChartComponent;
var IgRadialGaugeComponent = (function (_super) {
    __extends(IgRadialGaugeComponent, _super);
    function IgRadialGaugeComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Returns a string containing the names of all the ranges delimited with a \n symbol.
     */
    IgRadialGaugeComponent.prototype.getRangeNames = function () { return; };
    ;
    /**
     * Adds a new range to the radial gauge.
     *
     * @param value
     */
    IgRadialGaugeComponent.prototype.addRange = function (value) { return; };
    ;
    /**
     * Removes a specified range.
     *
     * @param value
     */
    IgRadialGaugeComponent.prototype.removeRange = function (value) { return; };
    ;
    /**
     * Updates the range.
     *
     * @param value
     */
    IgRadialGaugeComponent.prototype.updateRange = function (value) { return; };
    ;
    /**
     * Clears the ranges in the radial gauge.
     */
    IgRadialGaugeComponent.prototype.clearRanges = function () { return; };
    ;
    /**
     * Scales a value on the gauge's main scale to an angle around the center point of the gauge, in radians.
     *
     * @param value
     */
    IgRadialGaugeComponent.prototype.scaleValue = function (value) { return; };
    ;
    /**
     * Unscales a value from an angle in radians to the represented value along the main scale of the gauge.
     *
     * @param value
     */
    IgRadialGaugeComponent.prototype.unscaleValue = function (value) { return; };
    ;
    /**
     * Gets the value for the main scale of the gauge for a given point within the bounds of the gauge.
     *
     * @param x
     * @param y
     */
    IgRadialGaugeComponent.prototype.getValueForPoint = function (x, y) { return; };
    ;
    /**
     * Gets the point on the gauge for a given scale value and extent.
     *
     * @param value
     * @param extent
     */
    IgRadialGaugeComponent.prototype.getPointForValue = function (value, extent) { return; };
    ;
    /**
     * Returns true if the main gauge needle bounding box contains the point provided, otherwise false.
     *
     * @param x
     * @param y
     */
    IgRadialGaugeComponent.prototype.needleContainsPoint = function (x, y) { return; };
    ;
    /**
     * Exports the visual data for the radial gauge.
     */
    IgRadialGaugeComponent.prototype.exportVisualData = function () { return; };
    ;
    /**
     * Flushes the gauge.
     */
    IgRadialGaugeComponent.prototype.flush = function () { return; };
    ;
    /**
     * Destroys widget.
     */
    IgRadialGaugeComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Returns true if the style was updated for the radial gauge.
     */
    IgRadialGaugeComponent.prototype.styleUpdated = function () { return; };
    ;
    return IgRadialGaugeComponent;
}(IgControlBase));
IgRadialGaugeComponent = __decorate([
    core_1.Component({
        selector: "ig-radial-gauge",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "ranges", "rangeBrushes", "rangeOutlines", "minimumValue", "maximumValue", "interval", "centerX", "centerY", "value", "scaleStartAngle", "scaleEndAngle", "scaleSweepDirection", "transitionDuration", "transitionEasingFunction", "needleBrush", "needleOutline", "needleStartExtent", "needleEndExtent", "needleShape", "needleStartWidthRatio", "needleEndWidthRatio", "needleBaseFeatureWidthRatio", "needleBaseFeatureExtent", "needlePointFeatureWidthRatio", "needlePointFeatureExtent", "needlePivotWidthRatio", "needlePivotInnerWidthRatio", "needlePivotShape", "scaleStartExtent", "needlePivotBrush", "needlePivotOutline", "needleStrokeThickness", "needlePivotStrokeThickness", "scaleEndExtent", "labelExtent", "labelInterval", "tickStartExtent", "tickEndExtent", "tickStrokeThickness", "tickBrush", "fontBrush", "minorTickStartExtent", "minorTickEndExtent", "minorTickStrokeThickness", "minorTickBrush", "minorTickCount", "scaleBrush", "backingBrush", "backingOutline", "backingStrokeThickness", "backingOuterExtent", "backingOversweep", "scaleOversweep", "scaleOversweepShape", "backingCornerRadius", "backingInnerExtent", "backingShape", "radiusMultiplier", "duplicateLabelOmissionStrategy", "isNeedleDraggingEnabled", "isNeedleDraggingConstrained", "font", "transitionProgress", "pixelScalingRatio"],
        outputs: ["formatLabel", "alignLabel", "valueChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgRadialGaugeComponent);
exports.IgRadialGaugeComponent = IgRadialGaugeComponent;
var IgZoombarComponent = (function (_super) {
    __extends(IgZoombarComponent, _super);
    function IgZoombarComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Destroys the Zoombar widget
     */
    IgZoombarComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Returns the main zoombar element
     */
    IgZoombarComponent.prototype.widget = function () { return; };
    ;
    /**
     * Returns the ID of the element the zoombar is initialized on
     */
    IgZoombarComponent.prototype.id = function () { return; };
    ;
    /**
     * Returns the DIV that is the topmost container of the zoombar widget
     */
    IgZoombarComponent.prototype.container = function () { return; };
    ;
    /**
     * Returns the element the clone widget is initialized on
     */
    IgZoombarComponent.prototype.clone = function () { return; };
    ;
    /**
     * Gets or sets the current zoom window
     *
     * @param left     The left parameter of the new zoom window in percentages
     * @param width     The width parameter of the new zoom window in percentages
     */
    IgZoombarComponent.prototype.zoom = function (left, width) { return; };
    ;
    return IgZoombarComponent;
}(IgControlBase));
IgZoombarComponent = __decorate([
    core_1.Component({
        selector: "ig-zoombar",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "target", "clone", "width", "height", "zoomAction", "zoomWindowMoveDistance", "defaultZoomWindow", "zoomWindowMinWidth", "hoverStyleAnimationDuration", "windowPanDuration", "tabIndex"],
        outputs: ["zoomChanging", "zoomChanged", "providerCreated", "windowDragStarting", "windowDragStarted", "windowDragging", "windowDragEnding", "windowDragEnded", "windowResizing", "windowResized"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgZoombarComponent);
exports.IgZoombarComponent = IgZoombarComponent;
var IgMapComponent = (function (_super) {
    __extends(IgMapComponent, _super);
    function IgMapComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgMapComponent.prototype.option = function () { return; };
    ;
    /**
     * Destroys the widget.
     */
    IgMapComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Returns the ID of parent element holding the map.
     */
    IgMapComponent.prototype.id = function () { return; };
    ;
    /**
     * Exports the map to a PNG image.
     *
     * @param width The width of the image.
     * @param height The height of the image.
     */
    IgMapComponent.prototype.exportImage = function (width, height) { return; };
    ;
    /**
     * Notify the map that styles it draws colors from may have been updated.
     */
    IgMapComponent.prototype.styleUpdated = function () { return; };
    ;
    /**
     * Resets the zoom level of the map to default.
     */
    IgMapComponent.prototype.resetZoom = function () { return; };
    ;
    /**
     * Adds a new item to the data source and notifies the map.
     *
     * @param item     The item that we want to add to the data source.
     * @param targetName     The name of the series bound to the data source.
     */
    IgMapComponent.prototype.addItem = function (item, targetName) { return; };
    ;
    /**
     * Inserts a new item to the data source and notifies the map.
     *
     * @param item     the new item that we want to insert in the data source.
     * @param index     The index in the data source where the new item will be inserted.
     * @param targetName     The name of the series bound to the data source.
     */
    IgMapComponent.prototype.insertItem = function (item, index, targetName) { return; };
    ;
    /**
     * Deletes an item from the data source and notifies the map.
     *
     * @param index     The index in the data source from where the item will be been removed.
     * @param targetName     The name of the series bound to the data source.
     */
    IgMapComponent.prototype.removeItem = function (index, targetName) { return; };
    ;
    /**
     * Updates an item in the data source and notifies the map.
     *
     * @param index     The index of the item in the data source that we want to change.
     * @param item     The new item object that will be set in the data source.
     * @param targetName     The name of the series bound to the data source.
     */
    IgMapComponent.prototype.setItem = function (index, item, targetName) { return; };
    ;
    /**
     * Notifies the the map that an item has been set in an associated data source.
     *
     * @param dataSource The data source in which the change happened.
     * @param index The index in the items source that has been changed.
     * @param newItem the new item that has been set in the collection.
     * @param oldItem the old item that has been overwritten in the collection.
     */
    IgMapComponent.prototype.notifySetItem = function (dataSource, index, newItem, oldItem) { return; };
    ;
    /**
     * Notifies the the map that the items have been cleared from an associated data source.
     *                 It's not necessary to notify more than one target of a change if they share the same items source.
     *
     * @param dataSource The data source in which the change happened.
     */
    IgMapComponent.prototype.notifyClearItems = function (dataSource) { return; };
    ;
    /**
     * Notifies the the target series that an item has been inserted at the specified index in its data source.
     *                 It's not necessary to notify more than one target of a change if they share the same items source.
     *
     * @param dataSource The data source in which the change happened.
     * @param index The index in the items source where the new item has been inserted.
     * @param newItem the new item that has been set in the collection.
     */
    IgMapComponent.prototype.notifyInsertItem = function (dataSource, index, newItem) { return; };
    ;
    /**
     * Notifies the the target series that an item has been removed from the specified index in its data source.
     *                 It's not necessary to notify more than one target of a change if they share the same items source.
     *
     * @param dataSource The data source in which the change happened.
     * @param index The index in the items source from where the old item has been removed.
     * @param oldItem the old item that has been removed from the collection.
     */
    IgMapComponent.prototype.notifyRemoveItem = function (dataSource, index, oldItem) { return; };
    ;
    /**
     * Notifies the target series or axis that it should scroll the requested data item into view.
     *
     * @param targetName The name of the series or axis notify.
     * @param item The data item to bring into view, if possible.
     */
    IgMapComponent.prototype.scrollIntoView = function (targetName, item) { return; };
    ;
    /**
     * Either xAxis or yAxis (longitude or latitude) that it should scale the requested value into map space from axis space.
     * 				For example you can use this method if you want to find where longitude 50 stands scaled to map's width.
     *
     * @param targetName Either xAxis or yAxis to notify.
     * @param unscaledValue The value in axis space to translate into map space.
     */
    IgMapComponent.prototype.scaleValue = function (targetName, unscaledValue) { return; };
    ;
    /**
     * Either xAxis or yAxis (longitude or latitude) that it should unscale the requested value into axis space from map space.
     * 				For example you can use this method if you want to find what is the longitude unscaled from 0 width of the map.
     *
     * @param targetName Either xAxis or yAxis to notify.
     * @param scaledValue The value in map space to translate into axis space.
     */
    IgMapComponent.prototype.unscaleValue = function (targetName, scaledValue) { return; };
    ;
    /**
     * Manually starts a tiled zoom if one isn't already running.
     */
    IgMapComponent.prototype.startTiledZoomingIfNecessary = function () { return; };
    ;
    /**
     * Manually ends a tiled zoom if one is running.
     */
    IgMapComponent.prototype.endTiledZoomingIfRunning = function () { return; };
    ;
    /**
     * Clears the tile zoom tile cache so that new tiles will be generated. Only applies if the viewer is using a tile based zoom..
     */
    IgMapComponent.prototype.clearTileZoomCache = function () { return; };
    ;
    /**
     * Forces any pending deferred work to render on the map before continuing
     */
    IgMapComponent.prototype.flush = function () { return; };
    ;
    /**
     * Exports visual data from the map to aid in unit testing
     */
    IgMapComponent.prototype.exportVisualData = function () { return; };
    ;
    /**
     * Gets the actual minimum value of the target xAxis or yAxis
     *
     * @param targetName
     */
    IgMapComponent.prototype.getActualMinimumValue = function (targetName) { return; };
    ;
    /**
     * Gets the actual maximum value of the target xAxis or yAxis
     *
     * @param targetName
     */
    IgMapComponent.prototype.getActualMaximumValue = function (targetName) { return; };
    ;
    /**
     * Notifies the map that the container was resized
     */
    IgMapComponent.prototype.notifyContainerResized = function () { return; };
    ;
    /**
     * Zoom in to the geographic region specified, when possible (may need to wait fior map to be initialized).
     *
     * @param rect The geographic area rectangle.
     */
    IgMapComponent.prototype.zoomToGeographic = function (rect) { return; };
    ;
    /**
     * Given the current plot area of the control and a geographic region, get the WindowRect that would encompass that geographic region.
     *
     * @param rect The geographic area rectangle.
     */
    IgMapComponent.prototype.getGeographicFromZoom = function (rect) { return; };
    ;
    /**
     * Given the current plot area of the control and a geographic region, get the WindowRect that would encompass that geographic region.
     *
     * @param rect The geographic area rectangle.
     */
    IgMapComponent.prototype.getZoomFromGeographic = function (rect) { return; };
    ;
    /**
     * Creates a print preview page with the map, hiding all other elements on the page.
     */
    IgMapComponent.prototype.print = function () { return; };
    ;
    /**
     * Indicates that a series should render, even though no option has been modified that would normally cause it to refresh.
     *
     * @param targetName     The name of the series to render.
     * @param animate     Whether the change should be animated, if possible.
     */
    IgMapComponent.prototype.renderSeries = function (targetName, animate) { return; };
    ;
    return IgMapComponent;
}(IgControlBase));
IgMapComponent = __decorate([
    core_1.Component({
        selector: "ig-map",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "dataSource", "dataSourceUrl", "dataSourceType", "responseDataKey", "autoMarginWidth", "autoMarginHeight", "crosshairVisibility", "crosshairPoint", "plotAreaBackground", "defaultInteraction", "dragModifier", "panModifier", "previewRect", "windowRect", "zoomable", "windowScale", "windowResponse", "windowRectMinWidth", "windowPositionHorizontal", "windowPositionVertical", "circleMarkerTemplate", "triangleMarkerTemplate", "pyramidMarkerTemplate", "squareMarkerTemplate", "diamondMarkerTemplate", "pentagonMarkerTemplate", "hexagonMarkerTemplate", "tetragramMarkerTemplate", "pentagramMarkerTemplate", "hexagramMarkerTemplate", "overviewPlusDetailPaneBackgroundImageUri", "useTiledZooming", "preferHigherResolutionTiles", "zoomTileCacheSize", "backgroundContent", "series", "theme"],
        outputs: ["tooltipShowing", "tooltipShown", "tooltipHiding", "tooltipHidden", "browserNotSupported", "seriesCursorMouseMove", "seriesMouseLeftButtonDown", "seriesMouseLeftButtonUp", "seriesMouseMove", "seriesMouseEnter", "seriesMouseLeave", "windowRectChanged", "gridAreaRectChanged", "refreshCompleted", "triangulationStatusChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgMapComponent);
exports.IgMapComponent = IgMapComponent;
var IgSparklineComponent = (function (_super) {
    __extends(IgSparklineComponent, _super);
    function IgSparklineComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgSparklineComponent.prototype.destroy = function () { return; };
    ;
    return IgSparklineComponent;
}(IgControlBase));
IgSparklineComponent = __decorate([
    core_1.Component({
        selector: "ig-sparkline",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "tooltipTemplate", "maxRecCount", "dataSource", "dataSourceType", "dataSourceUrl", "responseTotalRecCountKey", "responseDataKey", "brush", "negativeBrush", "markerBrush", "negativeMarkerBrush", "firstMarkerBrush", "lastMarkerBrush", "highMarkerBrush", "lowMarkerBrush", "trendLineBrush", "horizontalAxisBrush", "verticalAxisBrush", "normalRangeFill", "horizontalAxisVisibility", "verticalAxisVisibility", "markerVisibility", "negativeMarkerVisibility", "firstMarkerVisibility", "lastMarkerVisibility", "lowMarkerVisibility", "highMarkerVisibility", "normalRangeVisibility", "displayNormalRangeInFront", "markerSize", "firstMarkerSize", "lastMarkerSize", "highMarkerSize", "lowMarkerSize", "negativeMarkerSize", "lineThickness", "valueMemberPath", "labelMemberPath", "trendLineType", "trendLinePeriod", "trendLineThickness", "normalRangeMinimum", "normalRangeMaximum", "displayType", "unknownValuePlotting", "verticalAxisLabel", "horizontalAxisLabel", "formatLabel", "pixelScalingRatio"],
        outputs: ["dataBinding", "dataBound", "updateTooltip", "hideTooltip"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgSparklineComponent);
exports.IgSparklineComponent = IgSparklineComponent;
var IgBulletGraphComponent = (function (_super) {
    __extends(IgBulletGraphComponent, _super);
    function IgBulletGraphComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Returns a string containing the names of all the ranges delimited with a \n symbol.
     */
    IgBulletGraphComponent.prototype.getRangeNames = function () { return; };
    ;
    /**
     * Adds a new range to the bullet graph.
     *
     * @param value     The range object to be added.
     */
    IgBulletGraphComponent.prototype.addRange = function (value) { return; };
    ;
    /**
     * Removes a range from the bullet graph.
     *
     * @param value     A JS object with properties set as follows: name: nameOfTheRangeToRemove, remove: true
     */
    IgBulletGraphComponent.prototype.removeRange = function (value) { return; };
    ;
    /**
     * Updates the specified range of the bullet graph.
     *
     * @param value     The range object to be updated.
     */
    IgBulletGraphComponent.prototype.updateRange = function (value) { return; };
    ;
    /**
     * Returns information about how the bullet graph is rendered.
     */
    IgBulletGraphComponent.prototype.exportVisualData = function () { return; };
    ;
    /**
     * Causes all pending changes of the bullet graph e.g. by changed property values to be rendered immediately.
     */
    IgBulletGraphComponent.prototype.flush = function () { return; };
    ;
    /**
     * Destroys widget.
     */
    IgBulletGraphComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Re-polls the css styles for the widget. Use this method when the css styles have been modified.
     */
    IgBulletGraphComponent.prototype.styleUpdated = function () { return; };
    ;
    return IgBulletGraphComponent;
}(IgControlBase));
IgBulletGraphComponent = __decorate([
    core_1.Component({
        selector: "ig-bullet-graph",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "ranges", "rangeToolTipTemplate", "valueToolTipTemplate", "targetValueToolTipTemplate", "orientation", "rangeBrushes", "rangeOutlines", "minimumValue", "maximumValue", "targetValue", "targetValueName", "value", "valueName", "rangeInnerExtent", "rangeOuterExtent", "valueInnerExtent", "valueOuterExtent", "interval", "ticksPostInitial", "ticksPreTerminal", "labelInterval", "labelExtent", "labelsPostInitial", "labelsPreTerminal", "minorTickCount", "tickStartExtent", "tickEndExtent", "tickStrokeThickness", "tickBrush", "fontBrush", "valueBrush", "valueOutline", "valueStrokeThickness", "minorTickStartExtent", "minorTickEndExtent", "minorTickStrokeThickness", "minorTickBrush", "isScaleInverted", "backingBrush", "backingOutline", "backingStrokeThickness", "backingInnerExtent", "backingOuterExtent", "scaleStartExtent", "scaleEndExtent", "targetValueBrush", "targetValueBreadth", "targetValueInnerExtent", "targetValueOuterExtent", "targetValueOutline", "targetValueStrokeThickness", "transitionDuration", "showToolTipTimeout", "showToolTip", "font", "pixelScalingRatio"],
        outputs: ["formatLabel", "alignLabel"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgBulletGraphComponent);
exports.IgBulletGraphComponent = IgBulletGraphComponent;
var IgLinearGaugeComponent = (function (_super) {
    __extends(IgLinearGaugeComponent, _super);
    function IgLinearGaugeComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Returns a string containing the names of all the ranges delimited with a \n symbol.
     */
    IgLinearGaugeComponent.prototype.getRangeNames = function () { return; };
    ;
    /**
     * Adds a new range to the linear gauge.
     *
     * @param value     The range object to be added.
     */
    IgLinearGaugeComponent.prototype.addRange = function (value) { return; };
    ;
    /**
     * Removes a range from the linear gauge.
     *
     * @param value     A JS object with properties set as follows: name: nameOfTheRangeToRemove, remove: true
     */
    IgLinearGaugeComponent.prototype.removeRange = function (value) { return; };
    ;
    /**
     * Updates the specified range of the linear gauge.
     *
     * @param value     The range object to be updated.
     */
    IgLinearGaugeComponent.prototype.updateRange = function (value) { return; };
    ;
    /**
     * Gets the value for the main scale of the gauge for a given point within the bounds of the gauge.
     *
     * @param x
     * @param y
     */
    IgLinearGaugeComponent.prototype.getValueForPoint = function (x, y) { return; };
    ;
    /**
     * Returns true if the main gauge needle bounding box contains the point provided, otherwise false.
     *
     * @param x The x coordinate of the point.
     * @param y The y coordinate of the point.
     */
    IgLinearGaugeComponent.prototype.needleContainsPoint = function (x, y) { return; };
    ;
    /**
     * Returns information about how the linear gauge is rendered.
     */
    IgLinearGaugeComponent.prototype.exportVisualData = function () { return; };
    ;
    /**
     * Causes all pending changes of the linear gauge e.g. by changed property values to be rendered immediately.
     */
    IgLinearGaugeComponent.prototype.flush = function () { return; };
    ;
    /**
     * Destroys widget.
     */
    IgLinearGaugeComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Re-polls the css styles for the widget. Use this method when the css styles have been modified.
     */
    IgLinearGaugeComponent.prototype.styleUpdated = function () { return; };
    ;
    return IgLinearGaugeComponent;
}(IgControlBase));
IgLinearGaugeComponent = __decorate([
    core_1.Component({
        selector: "ig-linear-gauge",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "ranges", "rangeToolTipTemplate", "needleToolTipTemplate", "orientation", "rangeBrushes", "rangeOutlines", "minimumValue", "maximumValue", "value", "needleShape", "needleName", "rangeInnerExtent", "scaleInnerExtent", "rangeOuterExtent", "scaleOuterExtent", "needleInnerExtent", "needleOuterExtent", "needleInnerBaseWidth", "needleOuterBaseWidth", "needleInnerPointWidth", "needleOuterPointWidth", "needleInnerPointExtent", "needleOuterPointExtent", "interval", "ticksPostInitial", "ticksPreTerminal", "labelInterval", "labelExtent", "labelsPostInitial", "labelsPreTerminal", "minorTickCount", "tickStartExtent", "tickEndExtent", "tickStrokeThickness", "tickBrush", "fontBrush", "needleBreadth", "needleBrush", "needleOutline", "needleStrokeThickness", "minorTickStartExtent", "minorTickEndExtent", "minorTickStrokeThickness", "minorTickBrush", "isScaleInverted", "backingBrush", "backingOutline", "backingStrokeThickness", "backingInnerExtent", "backingOuterExtent", "scaleStartExtent", "scaleEndExtent", "scaleBrush", "scaleOutline", "scaleStrokeThickness", "isNeedleDraggingEnabled", "transitionDuration", "showToolTipTimeout", "showToolTip", "font", "pixelScalingRatio"],
        outputs: ["formatLabel", "alignLabel", "valueChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgLinearGaugeComponent);
exports.IgLinearGaugeComponent = IgLinearGaugeComponent;
var IgQRCodeBarcodeComponent = (function (_super) {
    __extends(IgQRCodeBarcodeComponent, _super);
    function IgQRCodeBarcodeComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Returns information about how the barcode is rendered.
     */
    IgQRCodeBarcodeComponent.prototype.exportVisualData = function () { return; };
    ;
    /**
     * Causes all pending changes of the barcode e.g. by changed property values to be rendered immediately.
     */
    IgQRCodeBarcodeComponent.prototype.flush = function () { return; };
    ;
    /**
     * Destroys widget.
     */
    IgQRCodeBarcodeComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Re-polls the css styles for the widget. Use this method when the css styles have been modified.
     */
    IgQRCodeBarcodeComponent.prototype.styleUpdated = function () { return; };
    ;
    return IgQRCodeBarcodeComponent;
}(IgControlBase));
IgQRCodeBarcodeComponent = __decorate([
    core_1.Component({
        selector: "ig-q-r-code-barcode",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "backingBrush", "backingOutline", "backingStrokeThickness", "barBrush", "fontBrush", "font", "data", "errorMessageText", "stretch", "barsFillMode", "widthToHeightRatio", "xDimension", "errorCorrectionLevel", "sizeVersion", "encodingMode", "eciNumber", "eciHeaderDisplayMode", "fnc1Mode", "applicationIndicator"],
        outputs: ["errorMessageDisplaying", "dataChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgQRCodeBarcodeComponent);
exports.IgQRCodeBarcodeComponent = IgQRCodeBarcodeComponent;
//Others
var IgUploadComponent = (function (_super) {
    __extends(IgUploadComponent, _super);
    function IgUploadComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Return jquery object of fileupload container - html DOM element
     */
    IgUploadComponent.prototype.container = function () { return; };
    ;
    /**
     * Returns the current widget element
     */
    IgUploadComponent.prototype.widget = function () { return; };
    ;
    /**
     * Hide finished files
     */
    IgUploadComponent.prototype.clearAll = function () { return; };
    ;
    /**
     * Append additional data field to formData(before submitting it to the server). Usually this function is used in the handler of the event onFormDataSubmit. If the browser supports HTML5 file API formData is instance of FormData, otherwise(like IE10 and older) formData is jQuery representation of the <form> that should be submitted to the server
     *
     * @param formData    If the browser supports HTML5 file API formData is instance of FormData, otherwise(like IE10 and older) formData is jQuery representation of the <form> that should be submitted to the server
     * @param field    Data field that should be appended to the formData. The object has 2 properties - value and name. If the browser supports HTML5 the data field is appended to the formData object. Otherwise it is appended as input hidden field to the <form>
     */
    IgUploadComponent.prototype.addDataField = function (formData, field) { return; };
    ;
    /**
     * Append additional data fields to formData(before submitting it to the server). Usually this function is used in the handler of the event onFormDataSubmit. If the browser supports HTML5 file API formData is instance of FormData, otherwise(like IE10 and older) formData is jQuery representation of the <form> that should be submitted to the server
     *
     * @param formData    If the browser supports HTML5 file API formData is instance of FormData, otherwise(like IE10 and older) formData is jQuery representation of the <form> that should be submitted to the server
     * @param fields    Array of data fields that should be appended to the formData. Each data field is object with 2 properties - value and name. If the browser supports HTML5 these data fields are added to the formData. Otherwise each of these data field is appended as input hidden field to the <form>
     */
    IgUploadComponent.prototype.addDataFields = function (formData, fields) { return; };
    ;
    /**
     * Start uploading file as submitting form with the specified formNumber.
     *
     * @param formNumber    id of the upload form
     */
    IgUploadComponent.prototype.startUpload = function (formNumber) { return; };
    ;
    /**
     * Cancel upload for the specified file id
     * 			 formNumber - id of the file to be canceled
     *
     * @param formNumber    id of the form which should be cancelled
     */
    IgUploadComponent.prototype.cancelUpload = function (formNumber) { return; };
    ;
    /**
     * Destroy the widget
     */
    IgUploadComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Returns the information about uploading files - all files uploaded/uploading/pending
     */
    IgUploadComponent.prototype.getFileInfoData = function () { return; };
    ;
    /**
     * Cancel all uploading and pending files
     */
    IgUploadComponent.prototype.cancelAll = function () { return; };
    ;
    /**
     * Returns the information about the file by specified file identifier. It could be file which is uploading/uploaded or uploading is not started. If there isn"t file with the specified file id returns null
     *
     * @param fileIndex    unique identifier of the file
     */
    IgUploadComponent.prototype.getFileInfo = function (fileIndex) { return; };
    ;
    return IgUploadComponent;
}(IgControlBase));
IgUploadComponent = __decorate([
    core_1.Component({
        selector: "ig-upload",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "autostartupload", "labelUploadButton", "labelAddButton", "labelClearAllButton", "labelSummaryTemplate", "labelSummaryProgressBarTemplate", "labelShowDetails", "labelHideDetails", "labelSummaryProgressButtonCancel", "labelSummaryProgressButtonContinue", "labelSummaryProgressButtonDone", "labelProgressBarFileNameContinue", "errorMessageMaxFileSizeExceeded", "errorMessageGetFileStatus", "errorMessageCancelUpload", "errorMessageNoSuchFile", "errorMessageOther", "errorMessageValidatingFileExtension", "errorMessageAJAXRequestFileSize", "errorMessageTryToRemoveNonExistingFile", "errorMessageTryToStartNonExistingFile", "errorMessageMaxUploadedFiles", "errorMessageMaxSimultaneousFiles", "errorMessageDropMultipleFilesWhenSingleModel", "uploadUrl", "progressUrl", "allowedExtensions", "showFileExtensionIcon", "css", "fileExtensionIcons", "mode", "multipleFiles", "maxUploadedFiles", "maxSimultaneousFilesUploads", "fileSizeMetric", "controlId", "fileSizeDecimalDisplay", "maxFileSize"],
        outputs: ["fileSelecting", "fileSelected", "fileUploading", "fileUploaded", "fileUploadAborted", "cancelAllClicked", "onError", "fileExtensionsValidating", "onXHRLoad", "onFormDataSubmit"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgUploadComponent);
exports.IgUploadComponent = IgUploadComponent;
var IgPopoverComponent = (function (_super) {
    __extends(IgPopoverComponent, _super);
    function IgPopoverComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgPopoverComponent.prototype.ngOnInit = function () {
        var elem = jQuery(document).find("#" + this.widgetId);
        if (elem.length === 1) {
            this._el = elem;
            this._events = new Map();
            //events binding
            var that_1 = this;
            var evtName;
            for (var propt in jQuery.ui[this._widgetName].prototype.events) {
                evtName = this._widgetName.toLowerCase() + propt.toLowerCase();
                this._events[evtName] = propt;
                jQuery(this._el).on(evtName, function (evt, ui) {
                    that_1[that_1._events[evt.type]].emit({ event: evt, ui: ui });
                });
            }
            jQuery(this._el)[this._widgetName](this._config);
        }
        else {
            _super.prototype.ngOnInit.call(this);
        }
    };
    /**
     * Destroys the popover widget.
     */
    IgPopoverComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Returns the ID of the element the popover is attached to
     */
    IgPopoverComponent.prototype.id = function () { return; };
    ;
    /**
     * Returns the container for the popover contents
     */
    IgPopoverComponent.prototype.container = function () { return; };
    ;
    /**
     * Shows the popover for the specified target
     *
     * @param trg     The element to show popover for.
     * @param content     The string to set for the popover to show.
     */
    IgPopoverComponent.prototype.show = function (trg, content) { return; };
    ;
    /**
     * Hides the popover for the specified target
     */
    IgPopoverComponent.prototype.hide = function () { return; };
    ;
    /**
     * Gets the currently set content for the popover container
     */
    IgPopoverComponent.prototype.getContent = function () { return; };
    ;
    /**
     * Sets the content for the popover container
     *
     * @param newCnt     The popover content to set.
     */
    IgPopoverComponent.prototype.setContent = function (newCnt) { return; };
    ;
    /**
     * Gets the popover current target
     */
    IgPopoverComponent.prototype.target = function () { return; };
    ;
    /**
     * Gets the current coordinates of the popover
     */
    IgPopoverComponent.prototype.getCoordinates = function () { return; };
    ;
    /**
     * Sets the popover to specific coordinates.
     *
     * @param pos     The popover coordinates in pixels.
     */
    IgPopoverComponent.prototype.setCoordinates = function (pos) { return; };
    ;
    return IgPopoverComponent;
}(IgControlBase));
IgPopoverComponent = __decorate([
    core_1.Component({
        selector: "ig-popover",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "closeOnBlur", "direction", "position", "width", "height", "minWidth", "maxWidth", "maxHeight", "animationDuration", "contentTemplate", "selectors", "headerTemplate", "showOn", "containment", "appendTo"],
        outputs: ["showing", "shown", "hiding", "hidden"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgPopoverComponent);
exports.IgPopoverComponent = IgPopoverComponent;
var IgNotifierComponent = (function (_super) {
    __extends(IgNotifierComponent, _super);
    function IgNotifierComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgNotifierComponent.prototype.ngOnInit = function () {
        var elem = jQuery(document).find("#" + this.widgetId);
        if (elem.length === 1) {
            this._el = elem;
            this._events = new Map();
            //events binding
            var that_2 = this;
            var evtName;
            for (var propt in jQuery.ui[this._widgetName].prototype.events) {
                evtName = this._widgetName.toLowerCase() + propt.toLowerCase();
                this._events[evtName] = propt;
                jQuery(this._el).on(evtName, function (evt, ui) {
                    that_2[that_2._events[evt.type]].emit({ event: evt, ui: ui });
                });
            }
            jQuery(this._el)[this._widgetName](this._config);
        }
        else {
            _super.prototype.ngOnInit.call(this);
        }
    };
    /**
     * Triggers a notification with a certain state and optional message. The [notifyLevel](ui.ignotifier#options:notifyLevel) option determines if the notification will be displayed.
     *
     * @param state    The state to show notification for.
     * @param message    Optional message to show, overrides defaults.
     */
    IgNotifierComponent.prototype.notify = function (state, message) { return; };
    ;
    /**
     * Returns true if the notification is currently visible
     */
    IgNotifierComponent.prototype.isVisible = function () { return; };
    ;
    /**
     * Destroys the widget.
     */
    IgNotifierComponent.prototype.destroy = function () { return; };
    ;
    return IgNotifierComponent;
}(IgControlBase));
IgNotifierComponent = __decorate([
    core_1.Component({
        selector: "ig-notifier",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "closeOnBlur", "direction", "position", "width", "height", "minWidth", "maxWidth", "maxHeight", "animationDuration", "contentTemplate", "selectors", "headerTemplate", "showOn", "containment", "appendTo", "state", "notifyLevel", "mode", "allowCSSOnTarget", "messages", "showIcon", "animationSlideDistance"],
        outputs: ["showing", "shown", "hiding", "hidden"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgNotifierComponent);
exports.IgNotifierComponent = IgNotifierComponent;
var IgRatingComponent = (function (_super) {
    __extends(IgRatingComponent, _super);
    function IgRatingComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Gets reference to [igValidator](ui.igvalidator) used by igRating.
     *
     * @param destroy     Request to destroy validator.
     */
    IgRatingComponent.prototype.validator = function (destroy) { return; };
    ;
    /**
     * Triggers validation.
     */
    IgRatingComponent.prototype.validate = function () { return; };
    ;
    /**
     * Gets/Sets (selected) value.
     *
     * @param val     New value which is rendered with selected css.
     * @return number|object     If parameter is not 'number', then exact value rendered with selected css is returned. Otherwise, reference to igRating is returned.
     */
    IgRatingComponent.prototype.value = function (val) { return; };
    ;
    /**
     * Gets/Sets hover value.
     *
     * @param val     New value which will be rendered with hover css when rating gets mouse.
     * @return number|object     If parameter is not "number", then last value which was rendered with hover css is returned. Otherwise, reference to igRating is returned.
     */
    IgRatingComponent.prototype.valueHover = function (val) { return; };
    ;
    /**
     * Checks if igRating has focus.
     */
    IgRatingComponent.prototype.hasFocus = function () { return; };
    ;
    /**
     * Sets focus to igRating. That has effect only when options.focusable is enabled.
     */
    IgRatingComponent.prototype.focus = function () { return; };
    ;
    /**
     * Destroys igRating widget.
     */
    IgRatingComponent.prototype.destroy = function () { return; };
    ;
    return IgRatingComponent;
}(IgControlBase));
IgRatingComponent = __decorate([
    core_1.Component({
        selector: "ig-rating",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "vertical", "value", "valueHover", "voteCount", "voteWidth", "voteHeight", "swapDirection", "valueAsPercent", "focusable", "precision", "precisionZeroVote", "roundedDecimalPlaces", "theme", "validatorOptions", "cssVotes"],
        outputs: ["hoverChange", "valueChange"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgRatingComponent);
exports.IgRatingComponent = IgRatingComponent;
var IgVideoPlayerComponent = (function (_super) {
    __extends(IgVideoPlayerComponent, _super);
    function IgVideoPlayerComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Returns the element on which the widget was instantiated
     */
    IgVideoPlayerComponent.prototype.widget = function () { return; };
    ;
    /**
     * Hide the add message if shown.
     */
    IgVideoPlayerComponent.prototype.hideAdMessage = function () { return; };
    ;
    /**
     * Play a linked commercial for this video.
     *
     * @param commercial     Specify the linked commercial to play.
     */
    IgVideoPlayerComponent.prototype.playCommercial = function (commercial) { return; };
    ;
    /**
     * Shows the ad banner, if there is such.
     *
     * @param index    Specify the index of the banner from the banners array.
     */
    IgVideoPlayerComponent.prototype.showBanner = function (index) { return; };
    ;
    /**
     * Hide the ad banner, if there is such.
     *
     * @param index    Specify the index of the banner from the banners array.
     */
    IgVideoPlayerComponent.prototype.hideBanner = function (index) { return; };
    ;
    /**
     * Resets the commercials, to be shown again.
     */
    IgVideoPlayerComponent.prototype.resetCommercialsShow = function () { return; };
    ;
    /**
     * Toggle control play state. If video is playing it will pause, if video is paused it will play.
     */
    IgVideoPlayerComponent.prototype.togglePlay = function () { return; };
    ;
    /**
     * Start playing current loaded video if any.
     */
    IgVideoPlayerComponent.prototype.play = function () { return; };
    ;
    /**
     * Pause the currently playing video if any.
     */
    IgVideoPlayerComponent.prototype.pause = function () { return; };
    ;
    /**
     * Gets/Sets the current time of the playing video.
     *
     * @param val     Specify the playback position in seconds to navigate to.
     */
    IgVideoPlayerComponent.prototype.currentTime = function (val) { return; };
    ;
    /**
     * Get a screenshot of the current video frame. It returns a canvas object that you can position and show on the page. This depends on the browser support for canvas.
     *
     * @param scaleFactor    Specify scale factor between 0 and 1.
     */
    IgVideoPlayerComponent.prototype.screenshot = function (scaleFactor) { return; };
    ;
    /**
     * Get whether the current browser supports video tag.
     */
    IgVideoPlayerComponent.prototype.supportsVideo = function () { return; };
    ;
    /**
     * Get whether the current browser supports H.264 codec.
     */
    IgVideoPlayerComponent.prototype.supportsH264BaselineVideo = function () { return; };
    ;
    /**
     * Get whether the current browser supports Theora codec.
     */
    IgVideoPlayerComponent.prototype.supportsOggTheoraVideo = function () { return; };
    ;
    /**
     * Get whether the current browser supports WEBM codec.
     */
    IgVideoPlayerComponent.prototype.supportsWebmVideo = function () { return; };
    ;
    /**
     * Returns whether the currently played video is paused.
     */
    IgVideoPlayerComponent.prototype.paused = function () { return; };
    ;
    /**
     * Get whether the current played video has ended.
     */
    IgVideoPlayerComponent.prototype.ended = function () { return; };
    ;
    /**
     * Get the current duration of the played video. It may be NaN if duration is still not loaded or the video is a live stream.
     */
    IgVideoPlayerComponent.prototype.duration = function () { return; };
    ;
    /**
     * Get whether the player is seeking to find the new playback position specified.
     */
    IgVideoPlayerComponent.prototype.seeking = function () { return; };
    ;
    /**
     * Destroys the widget.
     */
    IgVideoPlayerComponent.prototype.destroy = function () { return; };
    ;
    return IgVideoPlayerComponent;
}(IgControlBase));
IgVideoPlayerComponent = __decorate([
    core_1.Component({
        selector: "ig-video-player",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "sources", "width", "height", "posterUrl", "preload", "autoplay", "autohide", "volumeAutohideDelay", "centerButtonHideDelay", "loop", "browserControls", "fullscreen", "volume", "muted", "title", "showSeekTime", "progressLabelFormat", "bookmarks", "relatedVideos", "banners", "commercials"],
        outputs: ["ended", "playing", "paused", "buffering", "progress", "waiting", "bookmarkHit", "bookmarkClick", "enterFullScreen", "exitFullScreen", "relatedVideoClick", "bannerVisible", "bannerHidden", "bannerClick", "browserNotSupported"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgVideoPlayerComponent);
exports.IgVideoPlayerComponent = IgVideoPlayerComponent;
var IgRadialMenuComponent = (function (_super) {
    __extends(IgRadialMenuComponent, _super);
    function IgRadialMenuComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    IgRadialMenuComponent.prototype.itemOption = function (itemKey, key, value) { return; };
    ;
    IgRadialMenuComponent.prototype.exportVisualData = function () { return; };
    ;
    IgRadialMenuComponent.prototype.flush = function () { return; };
    ;
    IgRadialMenuComponent.prototype.destroy = function () { return; };
    ;
    IgRadialMenuComponent.prototype.styleUpdated = function () { return; };
    ;
    return IgRadialMenuComponent;
}(IgControlBase));
IgRadialMenuComponent = __decorate([
    core_1.Component({
        selector: "ig-radial-menu",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "items", "currentOpenMenuItemName", "centerButtonContentWidth", "centerButtonContentHeight", "centerButtonClosedFill", "centerButtonClosedStroke", "centerButtonFill", "centerButtonHotTrackFill", "centerButtonHotTrackStroke", "centerButtonStroke", "centerButtonStrokeThickness", "font", "isOpen", "menuBackground", "menuItemOpenCloseAnimationDuration", "menuItemOpenCloseAnimationEasingFunction", "menuOpenCloseAnimationDuration", "menuOpenCloseAnimationEasingFunction", "minWedgeCount", "outerRingFill", "outerRingThickness", "outerRingStroke", "outerRingStrokeThickness", "rotationInDegrees", "rotationAsPercentageOfWedge", "wedgePaddingInDegrees", "pixelScalingRatio"],
        outputs: ["formatLabel", "alignLabel", "valueChanged"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgRadialMenuComponent);
exports.IgRadialMenuComponent = IgRadialMenuComponent;
var IgSplitButtonComponent = (function (_super) {
    __extends(IgSplitButtonComponent, _super);
    function IgSplitButtonComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Switch to given igToolbar button.
     *
     * @param button . The button jQuery element.
     */
    IgSplitButtonComponent.prototype.switchToButton = function (button) { return; };
    ;
    /**
     * Toggle widget state between collapsed and expanded.
     *
     * @param e The igSplitButton to be expanded/collapsed.
     */
    IgSplitButtonComponent.prototype.toggle = function (e) { return; };
    ;
    /**
     * Collapse the widget.
     *
     * @param e Indicates the browser event which triggered this action (not API).
     */
    IgSplitButtonComponent.prototype.collapse = function (e) { return; };
    ;
    /**
     * Expands the widget.
     *
     * @param e Indicates the browser event which triggered this action (not API).
     */
    IgSplitButtonComponent.prototype.expand = function (e) { return; };
    ;
    /**
     * Destroy the widget.
     */
    IgSplitButtonComponent.prototype.destroy = function () { return; };
    ;
    IgSplitButtonComponent.prototype.widget = function () { return; };
    ;
    return IgSplitButtonComponent;
}(IgControlBase));
IgSplitButtonComponent = __decorate([
    core_1.Component({
        selector: "ig-split-button",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "items", "defaultItemName", "swapDefaultEnabled"],
        outputs: ["click", "expanded", "expanding", "collapsed", "collapsing"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgSplitButtonComponent);
exports.IgSplitButtonComponent = IgSplitButtonComponent;
var IgSchedulerComponent = (function (_super) {
    __extends(IgSchedulerComponent, _super);
    function IgSchedulerComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Gets reference to appointment by id
     *
     * @param id
     */
    IgSchedulerComponent.prototype.getAppointmentById = function (id) { return; };
    ;
    /**
      * Creates a new appointment and renders it to the scheduler
     *
     * @param appointment
     */
    IgSchedulerComponent.prototype.createAppointment = function (appointment) { return; };
    ;
    /**
      * Deletes appointment from the appointment collection
     *
     * @param appointment	appointment
     */
    IgSchedulerComponent.prototype.deleteAppointment = function (appointment) { return; };
    ;
    /**
      * Deletes appointment from the appointment collection
     *
     * @param appointment	appointment
     * @param updateAppoinment	updateAppoinment
     */
    IgSchedulerComponent.prototype.editAppointment = function (appointment, updateAppoinment) { return; };
    ;
    /**
      * Destroys the widget
     */
    IgSchedulerComponent.prototype.destroy = function () { return; };
    ;
    /**
      * Gets reference to the today UI button.
     */
    IgSchedulerComponent.prototype.todayButton = function () { return; };
    ;
    /**
      * Gets reference to the previous UI button.
     */
    IgSchedulerComponent.prototype.previousButton = function () { return; };
    ;
    /**
      * Gets reference to the date range UI button.
     */
    IgSchedulerComponent.prototype.dateRangeButton = function () { return; };
    ;
    /**
      * Gets reference to the next UI button.
     */
    IgSchedulerComponent.prototype.nextButton = function () { return; };
    ;
    /**
      * Gets reference to the jQuery calendar UI control.
     */
    IgSchedulerComponent.prototype.getCalendar = function () { return; };
    ;
    return IgSchedulerComponent;
}(IgControlBase));
IgSchedulerComponent = __decorate([
    core_1.Component({
        selector: "ig-scheduler",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "views", "viewMode", "selectedDate", "enableTodayButton", "width", "height", "agendaViewSettings", "monthViewSettings", "appointmentDialogSuppress"],
        outputs: ["agendaRangeChanging", "agendaRangeChanged", "daySelected", "monthChanging", "monthChanged", "rendering", "rendered", "viewChanging", "viewChanged", "appointmentDialogOpening", "appointmentDialogOpened", "appointmentDialogClosing", "appointmentDialogClosed", "appointmentCreating", "appointmentCreated", "appointmentDeleting", "appointmentDeleted", "appointmentEditing", "appointmentEdited"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgSchedulerComponent);
exports.IgSchedulerComponent = IgSchedulerComponent;
var IgSpreadsheetComponent = (function (_super) {
    __extends(IgSpreadsheetComponent, _super);
    function IgSpreadsheetComponent(el, renderer, differs) {
        return _super.call(this, el, renderer, differs) || this;
    }
    /**
     * Returns an object that represents the pane with the focus.
     */
    IgSpreadsheetComponent.prototype.getActivePane = function () { return; };
    ;
    /**
     * Returns an object that represents the current selection of the active pane.
     */
    IgSpreadsheetComponent.prototype.getActiveSelection = function () { return; };
    ;
    /**
     * Returns an object used to get the formatting of the activeCell and where modifications are applied to the entire active selection.
     *				Any changes made to this object will affect all the objects in the selection. So for example, the
     *				Font.Name may return "Arial" because the active cell has that as its resolved font name even though the other
     *				cells are using a different font but if you set the Font.Name of this object to "Arial" then all the objects
     *				affected by the selection will have their Font.Name updated to that value.
     */
    IgSpreadsheetComponent.prototype.getActiveSelectionCellRangeFormat = function () { return; };
    ;
    /**
     * Returns a boolean indicating if the user is currently editing the name of the active worksheet.
     */
    IgSpreadsheetComponent.prototype.getIsRenamingWorksheet = function () { return; };
    ;
    /**
     * Returns an array of the panes for the activeWorksheet.
     *
     *				 returnType="ig.spreadsheet.SpreadsheetPane[]"
     */
    IgSpreadsheetComponent.prototype.getPanes = function () { return; };
    ;
    /**
     * Executes the action associated with the specified id.
     *
     * @param action An [enumeration](ig.spreadsheet.SpreadsheetAction) or string that identifies the action to execute.
     */
    IgSpreadsheetComponent.prototype.executeAction = function (action) { return; };
    ;
    /**
     * Forces any pending deferred work to render on the spreadsheet before continuing
     */
    IgSpreadsheetComponent.prototype.flush = function () { return; };
    ;
    /**
     * Destroys the widget.
     */
    IgSpreadsheetComponent.prototype.destroy = function () { return; };
    ;
    /**
     * Notify the spreadsheet that style information used for rendering the spreadsheet may have been updated.
     */
    IgSpreadsheetComponent.prototype.styleUpdated = function () { return; };
    ;
    return IgSpreadsheetComponent;
}(IgControlBase));
IgSpreadsheetComponent = __decorate([
    core_1.Component({
        selector: "ig-spreadsheet",
        template: "<ng-content></ng-content>",
        inputs: ["widgetId", "options", "changeDetectionInterval", "disabled", "create", "width", "height", "activeCell", "isScrollLocked", "activeWorksheet", "allowAddWorksheet", "allowDeleteWorksheet", "areGridlinesVisible", "areHeadersVisible", "enterKeyNavigationDirection", "isEnterKeyNavigationEnabled", "isFormulaBarVisible", "isInEndMode", "isUndoEnabled", "nameBoxWidth", "selectionMode", "selectedWorksheets", "validationInputMessagePosition", "workbook", "zoomLevel"],
        outputs: ["actionExecuted", "actionExecuting", "activeCellChanged", "activePaneChanged", "activeWorksheetChanged", "editRangePasswordNeeded", "hyperlinkExecuting", "selectionChanged", "userPromptDisplaying", "workbookDirtied"]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, core_1.IterableDiffers])
], IgSpreadsheetComponent);
exports.IgSpreadsheetComponent = IgSpreadsheetComponent;
var IgniteUIModule = (function () {
    function IgniteUIModule() {
    }
    return IgniteUIModule;
}());
IgniteUIModule = __decorate([
    core_1.NgModule({
        declarations: [Column, IgGridSortingFeature, IgGridFilteringFeature, IgGridPagingFeature, IgGridUpdatingFeature, IgGridGroupByFeature, IgGridColumnMovingFeature, IgGridHidingFeature, IgGridCellMergingFeature, IgGridResponsiveFeature, IgGridResizingFeature, IgGridSelectionFeature, IgGridRowSelectorsFeature, IgGridSummariesFeature, IgGridColumnFixingFeature, IgGridTooltipsFeature, Features, IgGridComponent, IgTreeGridComponent, IgHierarchicalGridComponent, IgComboComponent, IgCheckboxEditorComponent, IgCurrencyEditorComponent, IgDateEditorComponent, IgDatePickerComponent, IgMaskEditorComponent, IgNumericEditorComponent, IgPercentEditorComponent, IgTextEditorComponent, IgTreeComponent, IgDialogComponent, IgSplitterComponent, IgLayoutManagerComponent, IgTileManagerComponent, IgHtmlEditorComponent, IgValidatorComponent, IgPivotDataSelectorComponent, IgPivotGridComponent, IgDataChartComponent, IgPieChartComponent, IgDoughnutChartComponent, IgFunnelChartComponent, IgRadialGaugeComponent, IgZoombarComponent, IgMapComponent, IgSparklineComponent, IgBulletGraphComponent, IgLinearGaugeComponent, IgQRCodeBarcodeComponent, IgUploadComponent, IgPopoverComponent, IgNotifierComponent, IgRatingComponent, IgVideoPlayerComponent, IgRadialMenuComponent, IgSplitButtonComponent, IgSpreadsheetComponent, IgSchedulerComponent],
        exports: [Column, IgGridSortingFeature, IgGridFilteringFeature, IgGridPagingFeature, IgGridUpdatingFeature, IgGridGroupByFeature, IgGridColumnMovingFeature, IgGridHidingFeature, IgGridCellMergingFeature, IgGridResponsiveFeature, IgGridResizingFeature, IgGridSelectionFeature, IgGridRowSelectorsFeature, IgGridSummariesFeature, IgGridColumnFixingFeature, IgGridTooltipsFeature, Features, IgGridComponent, IgTreeGridComponent, IgHierarchicalGridComponent, IgComboComponent, IgCheckboxEditorComponent, IgCurrencyEditorComponent, IgDateEditorComponent, IgDatePickerComponent, IgMaskEditorComponent, IgNumericEditorComponent, IgPercentEditorComponent, IgTextEditorComponent, IgTreeComponent, IgDialogComponent, IgSplitterComponent, IgLayoutManagerComponent, IgTileManagerComponent, IgHtmlEditorComponent, IgValidatorComponent, IgPivotDataSelectorComponent, IgPivotGridComponent, IgDataChartComponent, IgPieChartComponent, IgDoughnutChartComponent, IgFunnelChartComponent, IgRadialGaugeComponent, IgZoombarComponent, IgMapComponent, IgSparklineComponent, IgBulletGraphComponent, IgLinearGaugeComponent, IgQRCodeBarcodeComponent, IgUploadComponent, IgPopoverComponent, IgNotifierComponent, IgRatingComponent, IgVideoPlayerComponent, IgRadialMenuComponent, IgSplitButtonComponent, IgSpreadsheetComponent, IgSchedulerComponent]
    })
], IgniteUIModule);
exports.IgniteUIModule = IgniteUIModule;
//# sourceMappingURL=igniteui.angular2.js.map