import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YemekListeComponent } from './yemek-liste.component';

describe('YemekListeComponent', () => {
  let component: YemekListeComponent;
  let fixture: ComponentFixture<YemekListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YemekListeComponent]
    });
    fixture = TestBed.createComponent(YemekListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
