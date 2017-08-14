export class TemplateHelper{
    static registry: any = {};
    static componentRefs: any = {};

    static positionTemplates(rows: any, gridId: string, templateId: string, columnId: string){
        let components = TemplateHelper.componentRefs[templateId]
        let grid = jQuery('#' + gridId);

        let id, nativeElement;
        if (components !== undefined) {
            for(let row of rows){
                for(let cell of row){
                    if(jQuery(cell).attr('aria-describedby') === gridId + '_' + columnId){
                        id = grid.igGrid('getElementInfo', cell.parentElement).rowId;
                        if(components[id]){
                            //nativeElement = jQuery(components[id].location.nativeElement);
                            //nativeElement.appendTo();
                            debugger;
                            jQuery(cell).append(components[id].location.nativeElement);
                        }
                    }
                }
            }
        }
    }
}