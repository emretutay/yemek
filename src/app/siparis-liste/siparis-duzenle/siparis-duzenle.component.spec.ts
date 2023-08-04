import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiparisDuzenleComponent } from './siparis-duzenle.component';

describe('SiparisDuzenleComponent', () => {
  let component: SiparisDuzenleComponent;
  let fixture: ComponentFixture<SiparisDuzenleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiparisDuzenleComponent]
    });
    fixture = TestBed.createComponent(SiparisDuzenleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
