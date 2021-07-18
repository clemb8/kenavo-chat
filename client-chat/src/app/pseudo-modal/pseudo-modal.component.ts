import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pseudo-modal',
  templateUrl: './pseudo-modal.component.html',
  styleUrls: ['./pseudo-modal.component.scss']
})
export class PseudoModalComponent {

  pseudo_validated: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PseudoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { pseudo: String }

    onClose(): void {
      this.dialogRef.close();
    }

    onKeyUp(): void {
      if(this.data.pseudo.length > 2 && !this.data.users.includes(this.data.pseudo)) {
        this.pseudo_validated = true;
      } else {
        this.pseudo_validated = false;
      }
    }
}
