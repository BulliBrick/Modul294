import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../components/base/base.component';
import { Requests } from '../../data/requests';
import { RequestsService } from '../../service/requests.service';

@Component({
  selector: 'app-requests-detail',
  templateUrl: './requests-detail.component.html',
  styleUrl: './requests-detail.component.css'
})
export class RequestsDetailComponent extends BaseComponent implements OnInit{
 



  requestsData:Requests = new Requests();

  public requestsForm = new UntypedFormGroup({
    vorname: new UntypedFormControl(''),
    name: new UntypedFormControl('')
  });
  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, protected override translate: TranslateService, private formBuilder: UntypedFormBuilder,
              private requestsService: RequestsService) {
    super(translate);
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.requestsService.getOne(id).subscribe(obj => {
        this.requestsData = obj;
        this.requestsForm = this.formBuilder.group(obj);
      });
    } else {
      this.requestsForm = this.formBuilder.group(this.requestsData);
    }
  }

  async back() {
    await this.router.navigate(['requests']);
  }

  async save(formData: any) {
    this.requestsData = Object.assign(formData);

    if (this.requestsData.id) {
      this.requestsService.update(this.requestsData).subscribe({
        next: () => {
          this.snackBar.open(this.messageSaved, this.messageClose, {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open(this.messageError, this.messageClose, {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.requestsService.save(this.requestsData).subscribe({
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
  

