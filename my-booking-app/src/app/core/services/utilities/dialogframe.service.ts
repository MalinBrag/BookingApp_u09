import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogFrameService {

  constructor(
    private dialog: MatDialog,
  ) { }

  openDialogFrame(component: any, data?: any): Observable<any> {
    const dialogRef = this.dialog.open(component);
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