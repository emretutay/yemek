import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YemekOgeComponent } from './yemek-oge.component';

describe('YemekOgeComponent', () => {
  let component: YemekOgeComponent;
  let fixture: ComponentFixture<YemekOgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YemekOgeComponent]
    });
    fixture = TestBed.createComponent(YemekOgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
