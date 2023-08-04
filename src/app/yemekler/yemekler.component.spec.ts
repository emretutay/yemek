import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YemeklerComponent } from './yemekler.component';

describe('YemeklerComponent', () => {
  let component: YemeklerComponent;
  let fixture: ComponentFixture<YemeklerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YemeklerComponent]
    });
    fixture = TestBed.createComponent(YemeklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
