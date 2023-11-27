import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-anotaciones',
  template: `
      <h2 mat-dialog-title>Anotaciones sobre la cita</h2>
      <mat-dialog-content>
      <!-- Contenido del modal -->
      <p>Anotaciones específicas de la cita actual</p>
      </mat-dialog-content>

      <mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Cerrar</button>
    </mat-dialog-actions>
  `,
})
export class AnotacionesModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AnotacionesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { numeroCita: number }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
