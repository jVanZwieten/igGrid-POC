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
var data_service_1 = require("./services/data-service");
var AppComponent = (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.cd = 100000;
        this.gridId = 'grid1';
        this.primaryKey = 'index';
        this.autoGenerateColumns = false;
        this.virtualization = true;
        this.virtualizationMode = 'continuous';
        this.width = '1200';
        this.height = '595';
        this.features = [
            {
                name: 'Filtering',
                mode: 'advanced',
                advancedModeEditorsVisible: true
            },
            {
                name: 'Sorting',
                applySortedColumnCss: false
            },
            {
                name: 'Hiding',
                allowHiding: true,
                columnSettings: [
                    {
                        columnKey: 'index',
                        hidden: true,
                        allowHiding: false
                    }
                ]
            },
            {
                name: 'GroupBy',
                groupByDialogContainment: "window",
                groupSummaries: false,
                groupSummariesPosition: 'top',
                columnSettings: [
                    {
                        columnKey: 'IndustrySector',
                        isGroupBy: true,
                        dir: 'asc'
                    },
                    {
                        columnKey: 'KRD',
                        summaries: [{
                                summaryFunction: 'custom',
                                text: 'weighted sum:',
                                customSummary: function (data, dataType) {
                                    var weightedSum = 0;
                                    var marketNotionSum = 0;
                                    data.dataRecords.forEach(function (record) {
                                        marketNotionSum += record.MarketNotion;
                                    });
                                    data.dataRecords.forEach(function (record) {
                                        var weight = record.MarketNotion / marketNotionSum;
                                        var weightedValue = record.KRD * weight;
                                        weightedSum += weightedValue;
                                    });
                                    return weightedSum + "77565";
                                }
                            },],
                        groupSummaries: [
                            {
                                summaryFunction: "Sum", label: "Sum = ", format: ".##"
                            },
                            {
                                summaryFunction: function (data, dataType, gbRec) {
                                    // USE gbRec.recs to get access to the other records in the group
                                    var groupRecords = gbRec.recs;
                                    var weightedSum = 0;
                                    var marketNotionSum = 0;
                                    groupRecords.forEach(function (record) {
                                        marketNotionSum += record.MarketNotion;
                                    });
                                    groupRecords.forEach(function (record) {
                                        var weight = record.MarketNotion / marketNotionSum;
                                        var weightedValue = record.KRD * weight;
                                        weightedSum += weightedValue;
                                    });
                                    return weightedSum;
                                },
                                label: 'Weighted Sum= ',
                            }
                        ],
                        allowGrouping: false
                    },
                    {
                        columnKey: 'MarketNotion',
                        allowGrouping: false,
                        groupSummaries: [
                            {
                                summaryFunction: "Sum", label: "Sum = ", format: ".##"
                            }
                        ]
                    }
                ],
                groupedRowTextTemplate: "${val} <span style='float:right'>",
            },
            {
                name: 'Summaries',
                columnSettings: [
                    {
                        columnKey: 'KRD',
                        summaryOperands: [
                            {
                                rowDisplayLabel: 'Weighted Sum',
                                type: 'custom',
                                summaryCalculator: $.proxy(this.weightedSum, this),
                            }
                        ]
                    },
                    {
                        columnKey: 'MarketNotion',
                        summaryOperands: [
                            {
                                type: 'sum',
                                format: 'currency'
                            }
                        ]
                    },
                    {
                        columnKey: 'IndustrySector',
                    },
                    {
                        columnKey: 'IndustryGroup',
                        allowSummaries: false
                    },
                    {
                        columnKey: 'SectorType',
                        allowSummaries: false
                    },
                ]
            },
            {
                name: 'Resizing'
            },
            {
                name: "Selection",
                mode: 'row',
                multipleSelection: true,
                persist: true
            },
        ];
        this.cellRightClick = this.cellRightClicked;
        $.ig.DataSource.prototype._calculateGroupBySummaries = function (gbRec, parentCollapsed) {
            var res = gbRec.recs, gbSummaryRec = {
                summaries: {}, level: gbRec.level + 1,
                groupValue: gbRec.val, id: gbRec.id
            }, fieldValues, i, j, sumFunc, summaries = this.settings.groupby.summaries, sumFuncName, summary, summaryVal, fieldType, getValuesPerField;
            gbSummaryRec[this.settings.groupby.groupSummaryRecordKey] = true;
            getValuesPerField = function (arr, fieldName) {
                return arr.map(function (val) { return val[fieldName]; });
            };
            for (i = 0; i < summaries.length; i++) {
                summary = summaries[i];
                fieldValues = getValuesPerField(res, summary.field);
                fieldType = this._fields ? this._getFieldTypeFromSchema(summary.field) : null;
                for (j = 0; j < summary.summaryFunctions.length; j++) {
                    sumFunc = summary.summaryFunctions[j];
                    sumFuncName = typeof sumFunc === "string" ? sumFunc : "custom";
                    summaryVal = $.ig.calcSummaries(sumFuncName, fieldValues, sumFunc, fieldType, gbRec);
                    if (!gbSummaryRec.summaries[summary.field]) {
                        gbSummaryRec.summaries[summary.field] = [];
                    }
                    gbSummaryRec.summaries[summary.field].push(summaryVal);
                }
            }
            this._addSummaryRecToArray(gbSummaryRec, gbRec, this._gbData);
            if (!gbRec.collapsed && !parentCollapsed) {
                this._addSummaryRecToArray(gbSummaryRec, gbRec, this._vgbData);
            }
        };
        $.ig.calcSummaries = function (summaryFunction, data, caller, dataType, gbRec) {
            // M.H. 16 Nov. 2011 Fix for bug 97886
            summaryFunction = summaryFunction.toLowerCase();
            if (summaryFunction.startsWith("custom")) {
                summaryFunction = "custom";
            }
            switch (summaryFunction) {
                case "min":
                    return $.ig.util.summaries.min(data, dataType);
                case "max":
                    return $.ig.util.summaries.max(data, dataType);
                case "sum":
                    return $.ig.util.summaries.sum(data, dataType);
                case "avg":
                    return $.ig.util.summaries.avg(data, dataType);
                case "count":
                    return $.ig.util.summaries.count(data, dataType);
                case "custom":
                    // M.H. 30 Sept. 2011 Fix for bug #88717 - fix when caller is string
                    if (caller !== undefined && caller !== null) {
                        if (typeof caller === "function") {
                            return caller(data, dataType, gbRec);
                        }
                        if (typeof caller === "string") {
                            /*jshint evil:true */
                            caller = eval(caller);
                            return caller(data, dataType, gbRec);
                        }
                    }
                    else {
                        return null;
                    }
                    break;
            }
        };
    }
    AppComponent.prototype.weightedSum = function (data, dataType) {
        var records = this.data;
        var weightedSum = this.KRDWeightedSum(records);
        return weightedSum;
    };
    AppComponent.prototype.KRDWeightedSum = function (records) {
        var weightedSum = 0;
        var marketNotionSum = 0;
        records.forEach(function (record) {
            marketNotionSum += record.MarketNotion;
        });
        records.forEach(function (record) {
            var weight = record.MarketNotion / marketNotionSum;
            var weightedValue = record.KRD * weight;
            weightedSum += weightedValue;
        });
        return weightedSum;
    };
    AppComponent.prototype.ngOnInit = function () {
        this.data = this.dataService.getData();
    };
    AppComponent.prototype.cellRightClicked = function (evt) {
        var recordIndex = evt.ui.rowKey;
        window.open('detailView.html?' + recordIndex);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map