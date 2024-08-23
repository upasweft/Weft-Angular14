import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor/src/image-editor/imageeditor.component';

@Component({
  selector: 'app-ImageEdit',
  templateUrl: './ImageEdit.component.html',
  styleUrls: ['./ImageEdit.component.css']
})
export class ImageEditComponent implements OnInit {
  title = 'editor-example';
  @ViewChild('imageEditor')
  public editorObject ! : ImageEditorComponent

  public openImage() : void {
    this.editorObject.open('https://ej2.syncfusion.com/demos/src/image-editor/images/bridge.png');
  }

  public saveImage() : void {
    this.editorObject.export("PNG", "Syncfusion");
  }
  constructor() { }

  ngOnInit() {
    
  }

 
}