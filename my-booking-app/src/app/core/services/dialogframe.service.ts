import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogframeService {

  constructor(
    private dialog: MatDialog,
  ) { }

  openDialogFrame(component: any, data?: any): Observable<any> {
    const ref = this.dialog.open(component);
    ref.afterOpened().subscribe(() => {
      if (data?.fields) {
        (ref.componentInstance as any).fields = data.fields;
      }
    });
    return ref.afterClosed();
  } 

  closeDialogFrame() {
    this.dialog.closeAll();
  }
}
