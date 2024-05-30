import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Kunden } from '../../data/kunden';
import { KundenService } from '../../service/kunden.service';

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrl: './kunden.component.css'
})
export class KundenComponent {


  dataSource: Kunden[] = [];
  displayedColumns: string[] = ['id','kundennummer' ,'vorname', 'name', 'actions'];

  kunden = new Kunden();
  public kundenForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    age: new UntypedFormControl(0),
  });


  public constructor(private httpClient: HttpClient, private dialog: MatDialog, private router: Router, private kundenService: KundenService, private snackBar: MatSnackBar) {
    this.reloadData();
  }

  async save(formData: any) {
    this.kunden = Object.assign(formData);

    this.httpClient.post('http://localhost:9090/api/kunden', this.kunden).subscribe(() => {
      this.reloadData();
    });
  }

  reloadData() {
    this.httpClient.get<Kunden[]>('http://localhost:9090/api/kunden').subscribe(data => {
      this.dataSource = data;
    });
  }
  delete(e: Kunden) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'dialogs.title_delete',
        message: 'dialogs.message_delete'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        if (e.id !== undefined) {
          this.kundenService.delete(e.id).subscribe({
            next: response => {
              if (response.status === 200) {
                this.snackBar.open("Deleted", "Closed", {duration: 5000});
                this.reloadData();
              } else {
                this.snackBar.open("Delete Error", "Closed", {duration: 5000});
              }
            },
            error: () => this.snackBar.open("Delete Error", "Closed", {duration: 5000})
          });
        }
      }
    });
  }

    async add() {
      await this.router.navigate(['kunden']);
    }

    async edit(e: Kunden) {
      await this.router.navigate(['kunden', e.id]);
    }

}


