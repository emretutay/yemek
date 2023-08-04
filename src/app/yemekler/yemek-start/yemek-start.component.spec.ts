import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YemekStartComponent } from './yemek-start.component';

describe('YemekStartComponent', () => {
  let component: YemekStartComponent;
  let fixture: ComponentFixture<YemekStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YemekStartComponent]
    });
    fixture = TestBed.createComponent(YemekStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
