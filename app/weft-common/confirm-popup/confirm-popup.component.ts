import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from "rxjs";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  modalTitle: string = ""; // Initialize modalTitle
  modalContent: string = ""; // Initialize modalContent
  action: string = "";
  okButtonText: string = "";
  cancelButtonText: string = "";
  public onClose: Subject<{ action: string, result: string }> = new Subject(); // Initialize onClose
  @ViewChild("yesButton") yesButton!: ElementRef; // Add type assertion to yesButton

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
    // No initialization needed here
  }

  show(details: { title: string, content: string, okButtonText?: string, cancelButtonText?: string, action?: string }) { // Add type annotation to details
    this.modalTitle = details.title;
    this.modalContent = details.content;
    this.okButtonText = details.okButtonText ? details.okButtonText : "Yes";
    this.cancelButtonText = details.cancelButtonText ? details.cancelButtonText : "No";
    this.action = details.action ? details.action : "";
    setTimeout(() => this.yesButton.nativeElement.focus(), 500);
  }

  hide(status: string) {
    this.onClose.next({ action: this.action, result: status });
    this.bsModalRef.hide();
  }
}
