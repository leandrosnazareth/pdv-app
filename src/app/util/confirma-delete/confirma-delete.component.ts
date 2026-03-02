import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirma-delete',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirma-delete.component.html',
  styleUrls: ['./confirma-delete.component.scss']
})
export class ConfirmaDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmaDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
