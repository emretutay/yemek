import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YemekFiltreComponent } from './yemek-filtre.component';

describe('YemekFiltreComponent', () => {
  let component: YemekFiltreComponent;
  let fixture: ComponentFixture<YemekFiltreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YemekFiltreComponent]
    });
    fixture = TestBed.createComponent(YemekFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
