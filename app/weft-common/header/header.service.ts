import { Injectable, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  @Output() accountDetailsUpdationFlag = new EventEmitter();
  constructor() { }
  updateDetails() {
    this.accountDetailsUpdationFlag.emit(true);
  }
}
