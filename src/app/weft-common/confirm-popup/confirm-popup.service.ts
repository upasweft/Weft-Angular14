import { Injectable } from '@angular/core';
import { ConfirmPopupComponent } from './confirm-popup.component';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';


@Injectable({
  providedIn: 'root'
})
export class ConfirmPopupService {

  constructor(private modalService: BsModalService) { }

  public showConfirmation(details: { title: string; content: string; okButtonText: string; cancelButtonText: string; action: string; }) {
    const modal = this.modalService.show(ConfirmPopupComponent);
    (<ConfirmPopupComponent>modal.content).show(details);
    let observable = Observable.create((observer: { next: (arg0: object) => void; }) => {
      (<ConfirmPopupComponent>modal.content).onClose.subscribe(result => {
        observer.next(result);
      });
    });

    return observable;
  }
}
