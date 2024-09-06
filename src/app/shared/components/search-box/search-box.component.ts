import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @Input()
  public placeHolder:string='';

  @Output()
  // public onValue: EventEmitter<string> =new EventEmitter<string>();
  public onValueJCST = new EventEmitter<string>();

  public emitValue(value:string):void{
    this.onValueJCST.emit(value);
  }

}
