import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { YemeklerComponent } from './yemekler/yemekler.component';
import { YemekDetayComponent } from './yemekler/yemek-detay/yemek-detay.component';

import { YemekListeComponent } from './yemekler/yemek-liste/yemek-liste.component';
import { SiparisListeComponent } from './siparis-liste/siparis-liste.component';
import { SiparisDuzenleComponent } from './siparis-liste/siparis-duzenle/siparis-duzenle.component';
import { HeaderComponent } from './header/header.component';
import { YemekOgeComponent } from './yemekler/yemek-liste/yemek-oge/yemek-oge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { SiparisService } from './siparis-liste/siparis.service';
import { YemekStartComponent } from './yemekler/yemek-start/yemek-start.component';

import { YemekDuzenleComponent } from './yemekler/yemek-duzenle/yemek-duzenle.component';
import { SiparisStartComponent } from './siparis-liste/siparis-start/siparis-start.component';
import { SiparisOgeComponent } from './siparis-liste/siparis-oge/siparis-oge.component';
import { YemekService } from './yemekler/yemek.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { NgToastModule } from 'ng-angular-popup';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { YemekKategoriComponent } from './yemekler/yemek-kategori/yemek-kategori.component';
import { KategoriService } from './yemekler/kategori.service';
import { YemekKategoriDuzenleComponent } from './yemekler/yemek-kategori/yemek-kategori-duzenle/yemek-kategori-duzenle.component';
import { YemekFiltreComponent } from './yemekler/yemek-filtre/yemek-filtre.component';

@NgModule({
  declarations: [
    AppComponent,
    YemeklerComponent,
    YemekKategoriComponent,
    YemekDetayComponent,
    YemekOgeComponent,
    DropdownDirective,
    YemekListeComponent,
    SiparisListeComponent,
    HeaderComponent,
    SiparisDuzenleComponent,
    YemekStartComponent,
    YemekKategoriDuzenleComponent,
    YemekFiltreComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    YemekDuzenleComponent,
        SiparisStartComponent,
        SiparisOgeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},SiparisService,YemekService,DataStorageService,KategoriService],
  bootstrap: [AppComponent]
})
export class AppModule { }
