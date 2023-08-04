import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YemekKategoriDuzenleComponent } from './yemek-kategori-duzenle.component';

describe('YemekKategoriDuzenleComponent', () => {
  let component: YemekKategoriDuzenleComponent;
  let fixture: ComponentFixture<YemekKategoriDuzenleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YemekKategoriDuzenleComponent]
    });
    fixture = TestBed.createComponent(YemekKategoriDuzenleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
