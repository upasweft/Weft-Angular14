import { Injectable } from '@angular/core';
import { ConfirmPopupComponent } from './confirm-popup.component';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPopupService {

  constructor(private modalService: BsModalService) { }

  public showConfirmation(details: any) { // Change 'any' to the specific type of 'details'
    const modal = this.modalService.show(ConfirmPopupComponent);
    (<ConfirmPopupComponent>modal.content).show(details);
    let observable = new Observable(observer => { // Use 'new Observable' instead of 'Observable.create'
      (<ConfirmPopupComponent>modal.content).onClose.subscribe(result => {
        observer.next(result);
      });
    });

    return observable;
  }
}
