import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: 'item-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
	@ViewChild('outer') outer: ElementRef;
	private progress: number;
	public recordData: any;

	public ngOnInit(){
		let outerWidth = this.outer.nativeElement.offsetWidth;
		this.progress = (this.recordData.progress * .01) * outerWidth;
	}
}
