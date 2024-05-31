import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Service } from '../../data/service';
import { KundenserviceService } from '../../service/kundenservice.service';

@Component({
  selector: 'app-kundenservice',
  templateUrl: './kundenservice.component.html',
  styleUrl: './kundenservice.component.css'
})
export class KundenserviceComponent {


  dataSource: Service[] = [];
  displayedColumns: string[] = ['id','kundennummer','servicesstatus','servicesbeschreibung','servicesdatum' ,'actions'];

  service = new Service();
  public serviceForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    age: new UntypedFormControl(0),
  });


  public constructor(private httpClient: HttpClient, private dialog: MatDialog, private router: Router, private kundenserviceService: KundenserviceService, private snackBar: MatSnackBar) {
    this.reloadData();
  }

  async save(formData: any) {
    this.service = Object.assign(formData);

    this.httpClient.post('http://localhost:9090/api/service', this.service).subscribe(() => {
      this.reloadData();
    });
  }

  reloadData() {
    this.httpClient.get<Service[]>('http://localhost:9090/api/service').subscribe(data => {
      this.dataSource = data;
    });
  }
  delete(e: Service) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',

    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        if (e.id === undefined) return;
        this.kundenserviceService.delete(e.id).subscribe({
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
      await this.router.navigate(['service']);
    }

    async edit(e: Service) {
      await this.router.navigate(['service', e.id]);
    }

}


