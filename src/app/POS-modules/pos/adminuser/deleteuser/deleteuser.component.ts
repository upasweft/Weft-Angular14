import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.scss']
})
export class DeleteuserComponent implements OnInit {
  @Output() userDeleted: EventEmitter<void> = new EventEmitter<void>();
  public id: any;
  deleteApi: string = WeftAPIConfig.userService + '/delete/';
  constructor(private modalService: BsModalRef, private httpService: WeftHttpService, private toastrService: ToastrService) { }

  ngOnInit() {}
  
  onSubmit() {
    this.httpService.get(this.deleteApi + this.id).subscribe(result => {
      if (result) {
        if (result.statusCode == 200) {
          this.toastrService.success("User Deleted");
          this.userDeleted.emit();
          this.modalService.hide();
        }
        else {
          this.toastrService.success("User Can not able Deleted");
          this.userDeleted.emit();
          this.modalService.hide();
        }
      }
    })
  }
  cancel() {
    this.modalService.hide()
  }
}
