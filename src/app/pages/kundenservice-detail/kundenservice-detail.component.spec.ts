import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenserviceDetailComponent } from './kundenservice-detail.component';

describe('KundenserviceDetailComponent', () => {
  let component: KundenserviceDetailComponent;
  let fixture: ComponentFixture<KundenserviceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KundenserviceDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundenserviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
