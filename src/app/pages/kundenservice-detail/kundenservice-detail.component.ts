import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../components/base/base.component';
import { Service } from '../../data/service';
import { KundenserviceService } from '../../service/kundenservice.service';
import { KundenService } from '../../service/kunden.service';
import { Kunden } from '../../data/kunden';

@Component({
  selector: 'app-kundenservice-detail',
  templateUrl: './kundenservice-detail.component.html',
  styleUrl: './kundenservice-detail.component.css'
})
export class KundenserviceDetailComponent extends BaseComponent implements OnInit{
 



  service:Service = new Service();

  kunden: Kunden[] = [];

  public kundenserviceForm = new UntypedFormGroup({
    kundenId: new UntypedFormControl(''),
    servicesstatus: new UntypedFormControl(''),
    servicesbeschreibung: new UntypedFormControl('')

  });
  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, protected override translate: TranslateService, private formBuilder: UntypedFormBuilder,
              private kundenserviceService: KundenserviceService, private kundenService: KundenService) {
    super(translate);
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.kundenserviceService.getOne(id).subscribe(obj => {
        this.service = obj;
        this.kundenserviceForm = this.formBuilder.group(obj);
      });
    } else {
      this.kundenserviceForm = this.formBuilder.group(this.service);
    }

    this.kundenService.getList().subscribe(data => {
      this.kunden = data;
    });
  }

  async back() {
    await this.router.navigate(['services']);
  }

  async save(formData: any) {
    this.service = Object.assign(formData);

    const kundenData = this.kunden.find(kunde => kunde.id === formData.kundenId);
    this.service.kundenData = kundenData ? kundenData : new Kunden();

    if (this.service.id) {
      this.kundenserviceService.update(this.service).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.kundenserviceService.save(this.service).subscribe({
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
  

