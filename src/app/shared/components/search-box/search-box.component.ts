import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit {

  // private debouncer:Subject<string> = new Subject<string>();
  private debouncer = new Subject<string>();
  
  @Input()
  public placeHolder:string='';
  
  @Output()
  // public onValue: EventEmitter<string> =new EventEmitter<string>();
  public onValueJCST = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.debouncer
    .subscribe(value=>{
      console.log('debouncer value',value);
      
    });
  }

  public emitValue(value:string):void{
    this.onValueJCST.emit(value);
  }

  onKeyPress(searchTerm:string){

    // console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }

}
