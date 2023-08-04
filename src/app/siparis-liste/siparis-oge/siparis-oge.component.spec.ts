import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiparisOgeComponent } from './siparis-oge.component';

describe('SiparisOgeComponent', () => {
  let component: SiparisOgeComponent;
  let fixture: ComponentFixture<SiparisOgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiparisOgeComponent]
    });
    fixture = TestBed.createComponent(SiparisOgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
