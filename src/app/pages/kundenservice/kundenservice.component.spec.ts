import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenserviceComponent } from './kundenservice.component';

describe('KundenserviceComponent', () => {
  let component: KundenserviceComponent;
  let fixture: ComponentFixture<KundenserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KundenserviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundenserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
