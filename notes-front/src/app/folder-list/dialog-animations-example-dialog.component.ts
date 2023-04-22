// dialog-animations-example-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogAnimationsExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}

