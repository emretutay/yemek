import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiparisListeComponent } from './siparis-liste.component';

describe('SiparisListeComponent', () => {
  let component: SiparisListeComponent;
  let fixture: ComponentFixture<SiparisListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiparisListeComponent]
    });
    fixture = TestBed.createComponent(SiparisListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
