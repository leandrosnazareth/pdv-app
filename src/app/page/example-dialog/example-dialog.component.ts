import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  
@Component({
  selector: 'app-example-dialog',
  templateUrl: 'example-dialog.component.html',
})
export class ExampleDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<ExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}