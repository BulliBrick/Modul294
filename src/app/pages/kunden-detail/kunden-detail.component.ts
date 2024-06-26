import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../components/base/base.component';
import { Kunden } from '../../data/kunden';
import { KundenService } from '../../service/kunden.service';

@Component({
  selector: 'app-kunden-detail',
  templateUrl: './kunden-detail.component.html',
  styleUrl: './kunden-detail.component.css'
})
export class KundenDetailComponent extends BaseComponent implements OnInit{
 



  kunden:Kunden = new Kunden();

  public kundenForm = new UntypedFormGroup({
    kundennummer: new UntypedFormControl(''),
    vorname: new UntypedFormControl(''),
    name: new UntypedFormControl('')

  });
  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, protected override translate: TranslateService, private formBuilder: UntypedFormBuilder,
              private kundenService: KundenService) {
    super(translate);
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.kundenService.getOne(id).subscribe(obj => {
        this.kunden = obj;
        this.kundenForm = this.formBuilder.group(obj);
      });
    } else {
      this.kundenForm = this.formBuilder.group(this.kunden);
    }
  }

  async back() {
    await this.router.navigate(['kunden']);
  }

  async save(formData: any) {
    this.kunden = Object.assign(formData);

    if (this.kunden.id) {
      this.kundenService.update(this.kunden).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.kundenService.save(this.kunden).subscribe({
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
  

