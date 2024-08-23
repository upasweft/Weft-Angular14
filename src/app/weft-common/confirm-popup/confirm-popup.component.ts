import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from "rxjs";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  modalTitle!: string;
  modalContent!: string;
  action: string = "";
  okButtonText!: string;
  cancelButtonText!: string;
  public onClose!: Subject<object>;
  @ViewChild("yesButton")
  yesButton!: ElementRef;
  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  show(details: { title: string; content: string; okButtonText: string; cancelButtonText: string; action: string; }) {
    this.modalTitle = details.title;
    this.modalContent = details.content;
    this.okButtonText = details.okButtonText ? details.okButtonText : "Yes";
    this.cancelButtonText = details.cancelButtonText
      ? details.cancelButtonText
      : "No";
    this.action = details.action ? details.action : "";
    setTimeout(() => this.yesButton.nativeElement.focus(), 500);
  }
  hide(status: string) {
    this.onClose.next({ action: this.action, result: status });
    this.bsModalRef.hide();
  }
}
