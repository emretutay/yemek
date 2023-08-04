import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiparisStartComponent } from './siparis-start.component';

describe('SiparisStartComponent', () => {
  let component: SiparisStartComponent;
  let fixture: ComponentFixture<SiparisStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiparisStartComponent]
    });
    fixture = TestBed.createComponent(SiparisStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
