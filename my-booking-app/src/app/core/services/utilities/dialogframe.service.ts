import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogFrameService {

  constructor(
    private dialog: MatDialog,
  ) { }

  openDialogFrame<T>(component: T, data?: { fields?: any }): Observable<any> {
    const dialogRef: MatDialogRef<any> = this.dialog.open(component as any);
    
    dialogRef.afterOpened().subscribe(() => {
      if (data?.fields) {
        (dialogRef.componentInstance as any).fields = data.fields; 
      }
    });
    return dialogRef.afterClosed();
  } 

  closeDialogFrame() {
    this.dialog.closeAll();
  }

}
