import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YemekDuzenleComponent } from './yemek-duzenle.component';

describe('YemekDuzenleComponent', () => {
  let component: YemekDuzenleComponent;
  let fixture: ComponentFixture<YemekDuzenleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YemekDuzenleComponent]
    });
    fixture = TestBed.createComponent(YemekDuzenleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
