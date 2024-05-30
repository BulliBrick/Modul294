import { Component } from '@angular/core';
import { Kunden } from '../../data/kunden';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { async } from 'rxjs';

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


  public constructor(private httpClient: HttpClient, private dialog: MatDialog, private router: Router) {
    this.reloadData();
  }

  async save(formData: any) {
    this.kunden = Object.assign(formData);

    this.httpClient.post('http://localhost:9090/api/kunden', this.kunden).subscribe(result => {
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
  }

    async add() {
      await this.router.navigate(['kunden']);
    }

    async edit(e: Kunden) {
      await this.router.navigate(['kunden', e.id]);
    }

}


