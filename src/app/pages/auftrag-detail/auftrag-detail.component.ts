import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../components/base/base.component';
import { Auftrag } from '../../data/auftrag';
import { AuftragService } from '../../service/auftrag.service';
import { KundenService } from '../../service/kunden.service';
import { Kunden } from '../../data/kunden';

@Component({
  selector: 'app-kundenservice-detail',
  templateUrl: './auftrag-detail.component.html',
  styleUrl: './auftrag-detail.component.css'
})
export class AuftragDetailComponent extends BaseComponent implements OnInit{
 



  auftrag:Auftrag = new Auftrag();

  kunden: Kunden[] = [];

  public kundenserviceForm = new UntypedFormGroup({
    kundenId: new UntypedFormControl(''),
    servicesstatus: new UntypedFormControl(''),
    servicesbeschreibung: new UntypedFormControl('')

  });
  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, protected override translate: TranslateService, private formBuilder: UntypedFormBuilder,
              private auftragService: AuftragService, private kundenService: KundenService) {
    super(translate);
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.auftragService.getOne(id).subscribe(obj => {
        this.auftrag = obj;
        this.kundenserviceForm = this.formBuilder.group(obj);
      });
    } else {
      this.kundenserviceForm = this.formBuilder.group(this.auftrag);
    }

    this.kundenService.getList().subscribe(data => {
      this.kunden = data;
    });
  }

  async back() {
    await this.router.navigate(['auftrage']);
  }

  async save(formData: any) {
    this.auftrag = Object.assign(formData);

    const kundenData = this.kunden.find(kunde => kunde.id === formData.kundenId);
    this.auftrag.kundenData = kundenData ? kundenData : new Kunden();

    if (this.auftrag.id) {
      this.auftragService.update(this.auftrag).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.auftragService.save(this.auftrag).subscribe({
        next: () => {
          this.snackBar.open(this.messageNewSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageNewError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
  

