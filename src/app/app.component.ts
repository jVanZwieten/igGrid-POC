import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { IgGridComponent, Column } from './igniteui/igniteui.angular2';
import { TemplateHelper } from './igniteui/template-helper';
import { ActionsComponent } from './actions/actions.component';
import { ProgressComponent } from './progress/progress.component';

import { DataService } from './services/data-service';

import { GridItem } from './models/grid-item';

declare var jQuery: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public cd: number = 100000;
    private gridId: string = 'grid1';
    private primaryKey: string = 'index';
    private data: any[];

    private autoGenerateColumns: boolean = false;

    private virtualization: boolean = true;
    private virtualizationMode: string = 'continuous';
    private width: string = '1200';
    private height: string = '595';
    private features: any[] = [
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
                        customSummary:
                        function (data, dataType) {

                            var weightedSum = 0;
                            var marketNotionSum = 0;

                            data.dataRecords.forEach(record => {
                                marketNotionSum += record.MarketNotion
                            });
                            data.dataRecords.forEach(record => {
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
                            summaryFunction:
                            function (data, dataType, gbRec) {
                                // USE gbRec.recs to get access to the other records in the group

                                var groupRecords = gbRec.recs;

                                var weightedSum = 0;
                                var marketNotionSum = 0;

                                groupRecords.forEach(record => {
                                    marketNotionSum += record.MarketNotion
                                });
                                groupRecords.forEach(record => {
                                    var weight = record.MarketNotion / marketNotionSum;
                                    var weightedValue = record.KRD * weight;

                                    weightedSum += weightedValue;
                                });

                                return weightedSum;
                            },
                            label: 'Weighted Sum= ',
                            // format: '.#####'
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
            groupedRowTextTemplate: "${val} <span style='float:right'>", //the summary will eventually be tacked on the end of this, 
                                                                        //and the browser infers a closing span tag after the summary.
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
                    // allowSummaries: false
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

    private cellRightClick: CellRightClickEvent = this.cellRightClicked;

    private weightedSum(data, dataType) {
        var records = this.data;

        var weightedSum = this.KRDWeightedSum(records);
        return weightedSum;
    }

    private KRDWeightedSum(records) {
        var weightedSum = 0;
        var marketNotionSum = 0;

        records.forEach(record => {
            marketNotionSum += record.MarketNotion
        });
        records.forEach(record => {
            var weight = record.MarketNotion / marketNotionSum;
            var weightedValue = record.KRD * weight;

            weightedSum += weightedValue;
        });

        return weightedSum
    }

    constructor(private dataService: DataService) {
        ($.ig.DataSource.prototype as any)._calculateGroupBySummaries = function (gbRec, parentCollapsed) {
            var res = gbRec.recs, gbSummaryRec = {
                summaries: {}, level: gbRec.level + 1,
                groupValue: gbRec.val, id: gbRec.id
            }, fieldValues, i, j,
                sumFunc, summaries = this.settings.groupby.summaries,
                sumFuncName, summary, summaryVal, fieldType, getValuesPerField;
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
                    summaryVal = ($.ig as any).calcSummaries(
                        sumFuncName,
                        fieldValues,
                        sumFunc,
                        fieldType,
                        gbRec
                    );
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
        ($.ig as any).calcSummaries = function (summaryFunction, data, caller, dataType, gbRec) {
            // M.H. 16 Nov. 2011 Fix for bug 97886
            summaryFunction = summaryFunction.toLowerCase();
            if (summaryFunction.startsWith("custom")) {
                summaryFunction = "custom";
            }

            switch (summaryFunction) {
                case "min":
                    return ($.ig as any).util.summaries.min(data, dataType);
                case "max":
                    return ($.ig as any).util.summaries.max(data, dataType);
                case "sum":
                    return ($.ig as any).util.summaries.sum(data, dataType);
                case "avg":
                    return ($.ig as any).util.summaries.avg(data, dataType);
                case "count":
                    return ($.ig as any).util.summaries.count(data, dataType);
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
                    } else {
                        return null;
                    }
                    break;
            }
        };
    }

    public ngOnInit() {
        this.data = this.dataService.getData();

    }

    private cellRightClicked(evt) {
        var recordIndex = evt.ui.rowKey;
        window.open('detailView.html?' + recordIndex);
    }

}