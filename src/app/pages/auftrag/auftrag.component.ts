import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Auftrag } from '../../data/auftrag';
import { AuftragService } from '../../service/auftrag.service';

@Component({
  selector: 'app-auftrag',
  templateUrl: './auftrag.component.html',
  styleUrl: './auftrag.component.css'
})
export class AuftragComponent {


  dataSource: Auftrag[] = [];
  displayedColumns: string[] = ['id','kundennummer','auftragsnummer','auftragsdatum','auftragsstatus','bestellung' ,'actions'];

  auftrag = new Auftrag();
  public serviceForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),

  });


  public constructor(private httpClient: HttpClient, private dialog: MatDialog, private router: Router, private auftragService: AuftragService, private snackBar: MatSnackBar) {
    this.reloadData();
  }

  async save(formData: any) {
    this.auftrag = Object.assign(formData);

    this.httpClient.post('http://localhost:9090/api/auftrag', this.auftrag).subscribe(() => {
      this.reloadData();
    });
  }

  reloadData() {
    this.httpClient.get<Auftrag[]>('http://localhost:9090/api/auftrag').subscribe(data => {
      this.dataSource = data;
    });
  }
  delete(e: Auftrag) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',

    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        if (e.id === undefined) return;
        this.auftragService.delete(e.id).subscribe({
          next: (response: any) => {
            if (response.statusText === 'OK') {
              this.snackBar.open('Item deleted!', 'Close', { duration: 5000 });
              this.reloadData();
            } else {
              this.snackBar.open('Item could not be deleted, server error!', 'Close', { duration: 5000 });
            }
          },
          error: () => this.snackBar.open('Item could not be deleted, server error!', 'Close', { duration: 5000 })
        });
      }
    });
  }

    async add() {
      await this.router.navigate(['auftrag']);
    }

    async edit(e: Auftrag) {
      await this.router.navigate(['auftrag', e.id]);
    }

}


