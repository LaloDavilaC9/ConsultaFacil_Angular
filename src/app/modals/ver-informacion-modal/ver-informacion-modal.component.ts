import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-informacion-modal',
  templateUrl: './ver-informacion-modal.component.html',
  styleUrls: ['./ver-informacion-modal.component.css'],
  
})
export class VerInformacionModalComponent{

  constructor(
    public dialogRef: MatDialogRef<VerInformacionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
