import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragDetailComponent } from './auftrag-detail.component';

describe('AuftragDetailComponent', () => {
  let component: AuftragDetailComponent;
  let fixture: ComponentFixture<AuftragDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuftragDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuftragDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
