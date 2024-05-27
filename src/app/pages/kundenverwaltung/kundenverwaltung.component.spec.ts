import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenverwaltungComponent } from './kundenverwaltung.component';

describe('KundenverwaltungComponent', () => {
  let component: KundenverwaltungComponent;
  let fixture: ComponentFixture<KundenverwaltungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KundenverwaltungComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundenverwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
