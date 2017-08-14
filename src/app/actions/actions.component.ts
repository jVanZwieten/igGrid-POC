import { Component, OnInit } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: 'item-actions',
	templateUrl: './actions.component.html',
	styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
	private clickedStatus: string;
	private editVisible: boolean;
	private deleteVisible: boolean;
	
	public recordData: any;

	constructor() {
		
	}

	public ngOnInit(){
		if(this.recordData){
			this.editVisible = true;
			this.deleteVisible = this.recordData.actions === 1;
		}
	}

	private editClick() {
		
	}

	private deleteClick(){

	}
}
