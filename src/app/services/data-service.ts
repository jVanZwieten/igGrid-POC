import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { GridItem } from '../models/grid-item';

import data from './JSONData';

@Injectable()
export class DataService{

    getData(){
        console.log(data);
        
        return data;
    }

    // private itemCount: number = 10000;
    // private updateCycles: number = 5;

    // private symbolList: string[];
    // private sideList: string[];
    // private orderTypeList: string[];
    // private strategyList: string[];
    // private statusList: string[];
    // private bookingTypeList: string[];
    // private actionList: number[];

    // private updateCollection: GridItem[][];
    // private updateIterator: number = 0;

    // private updateStream: Subject<GridItem[]> = new Subject<GridItem[]>();
    // private updateIntervalId: any;JSONData.json

    // constructor(){
    //     this.symbolList = this.createSymbols();
    //     this.sideList = this.createSides();
    //     this.orderTypeList = this.createOrderTypes();
    //     this.strategyList = this.createStrategies();
    //     this.statusList = this.createStatuses();
    //     this.bookingTypeList = this.createBookingTypes();
    //     this.actionList = this.createActions();

    //     this.updateCollection = this.createUpdates();
    // }

    // public getData(): GridItem[]{
    //     let data = new Array<GridItem>();
    //     for(let i = 0; i < this.itemCount; i++){
    //         let model = new GridItem();
    //         model.id = i;
    //         model.symbol = this.symbolList[this.getRandom(0, this.symbolList.length - 1)];
    //         model.side = this.sideList[this.getRandom(0, this.sideList.length - 1)];
    //         model.orderType = this.orderTypeList[this.getRandom(0, this.orderTypeList.length - 1)];
    //         model.strategy = this.strategyList[this.getRandom(0, this.strategyList.length - 1)];
    //         model.quantity = this.getRandom(1, 20000);
    //         model.price = this.getRandom(1, 10);
    //         model.otherPrice = this.getRandom(1, 1000);
    //         model.status = this.statusList[this.getRandom(0, this.statusList.length - 1)];
    //         model.actions = this.actionList[this.getRandom(0, this.actionList.length - 1)];
    //         model.progress = this.getRandom(0, 100);
    //         model.exeQuantity = this.getRandom(0, 1000);
    //         model.timeInForce = "Day Order";
    //         model.bookingType = this.bookingTypeList[this.getRandom(0, this.bookingTypeList.length - 1)];
    //         model.filler1 = i;
    //         model.filler2 = i;
    //         model.filler3 = i;
    //         model.filler4 = i;
    //         model.filler5 = i;
    //         model.filler6 = i;
    //         model.filler7 = i;
    //         model.filler8 = i;
    //         model.filler9 = i;
    //         model.filler10 = i;
    //         model.filler11 = i;
    //         model.filler12 = i;
    //         model.filler13 = i;
    //         model.filler14 = i;
    //         model.filler15 = i;
    //         model.filler16 = i;
    //         model.filler17 = i;
    //         model.filler18 = i;
    //         model.filler19 = i;
    //         model.filler20 = i;
    //         model.filler21 = i;
    //         model.filler22 = i;
    //         model.filler23 = i;
    //         model.filler24 = i;
    //         model.filler25 = i;
    //         model.filler26 = i;
    //         model.filler27 = i;
    //         model.filler28 = i;

    //         data.push(model);          
    //     }

    //     return data;
    // }

    // public getUpdateStream(): Subject<GridItem[]> {
    //     return this.updateStream;
    // }

    // public requestUpdates(ids: number[]){ 
    //     var items: GridItem[] = [];
    //     var length = ids.length;
    //     for(var i = 0; i < length; i++){
    //         var id = ids[i];
    //         items.push(this.updateCollection[this.updateIterator][id]);
    //     }

    //     if(this.updateIterator === this.updateCycles - 1){
    //         this.updateIterator = 0;
    //     }
    //     else {
    //         this.updateIterator++;
    //     }

    //     this.updateStream.next(items);
    // }

    // private createUpdates(): GridItem[][]{
    //     var updates = [];
    //     for(var i = 0; i < this.updateCycles; i++){
    //         let items = []
    //         for(var n = 0; n < this.itemCount; n++){
    //             let item = new GridItem();
    //             item.id = n;
    //             item.price = this.getRandom(0, 10);
    //             item.otherPrice = this.getRandom(0, 1000);

    //             items.push(item);
    //         }

    //         updates[i] = items;
    //     }

    //     return updates;
    // }

    // private createSymbols(): string[]{
    //     return ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
    // }

    // private createSides(): string[]{
    //     return ['Buy', 'Sell'];
    // }

    // private createOrderTypes(): string[]{
    //     return ['Market', 'Limit'];
    // }

    // private createStrategies(): string[]{
    //     return ['StrategyX', 'Dagger'];
    // }

    // private createStatuses(): string[]{
    //     return ['Partial Fill', 'Saved', 'Filled'];
    // }

    // private createActions(): number[]{
    //     return [0, 1];
    // }

    // private createBookingTypes(): string[]{
    //     return ['Regular', 'Irregular'];
    // }

    // private getRandom(min: number, max: number): number{
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
}