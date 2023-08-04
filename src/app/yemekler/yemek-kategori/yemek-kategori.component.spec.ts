import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YemekKategoriComponent } from './yemek-kategori.component';

describe('YemekKategoriComponent', () => {
  let component: YemekKategoriComponent;
  let fixture: ComponentFixture<YemekKategoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YemekKategoriComponent]
    });
    fixture = TestBed.createComponent(YemekKategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
