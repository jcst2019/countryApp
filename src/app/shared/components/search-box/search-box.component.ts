import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  // private debouncer:Subject<string> = new Subject<string>();
  private debouncer = new Subject<string>();

  private debouncerSuscription?: Subscription;
  
  @Input()
  public placeHolder:string='';

  @Input()
  public initialValue:string='';
  
  @Output()
  // public onValue: EventEmitter<string> =new EventEmitter<string>();
  public onValueJCST = new EventEmitter<string>();
  
  @Output()
  
  public onDebounce = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.debouncerSuscription=this.debouncer
    .pipe(
      debounceTime(1000) //1000 =< 1 segundo// Pero se recomienda 300 o 3 miesimas de segundo
    )
    .subscribe(value=>{
      console.log('debouncer value',value);
      this.onDebounce.emit(value);
    });
  }
  
  ngOnDestroy(): void {
    // throw new Error('destruido');
    console.log('destruido');
    this.debouncerSuscription?.unsubscribe();
    
  }

  public emitValue(value:string):void{
    this.onValueJCST.emit(value);
  }

  onKeyPress(searchTerm:string){

    // console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }

}
