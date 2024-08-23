import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  public resourceForm!: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createFrom();
  }
  createFrom()
  {
    this.resourceForm = this.fb.group({

      //categoryImage: new FormControl(),
      qrCode: new FormControl(null, Validators.required),
    });
  }
  onEnterKeyPressed()
  {
   // console.log("gfhghg")
  }
  onSubmit()
  {
    
  }
}
