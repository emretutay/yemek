import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YemekDetayComponent } from './yemek-detay.component';

describe('YemekDetayComponent', () => {
  let component: YemekDetayComponent;
  let fixture: ComponentFixture<YemekDetayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YemekDetayComponent]
    });
    fixture = TestBed.createComponent(YemekDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
