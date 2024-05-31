import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Requests } from '../../data/requests';
import { RequestsService } from '../../service/requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {


  dataSource: Requests[] = [];
  displayedColumns: string[] = ['id','vorname', 'name', 'actions'];

  requests = new Requests();
  public requestsForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    vorname: new UntypedFormControl(''),
  });


  public constructor(private httpClient: HttpClient, private dialog: MatDialog, private router: Router, private requestsService: RequestsService, private snackBar: MatSnackBar) {
    this.reloadData();
  }

  async save(formData: any) {
    this.requests = Object.assign(formData);

    this.httpClient.post('http://localhost:9090/api/requests', this.requests).subscribe(() => {
      this.reloadData();
    });
  }

  reloadData() {
    this.httpClient.get<Requests[]>('http://localhost:9090/api/requests').subscribe(data => {
      this.dataSource = data;
    });
  }
  delete(e: Requests) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',

    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        if (e.id === undefined) return;
        this.requestsService.delete(e.id).subscribe({
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
      await this.router.navigate(['request']);
    }

    async edit(e: Requests) {
      await this.router.navigate(['request', e.id]);
    }

}


