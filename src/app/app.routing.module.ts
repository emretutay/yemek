import { NgModule } from "@angular/core";
import { YemeklerComponent } from "./yemekler/yemekler.component";
import { RouterModule, Routes } from "@angular/router";
import { SiparisListeComponent } from "./siparis-liste/siparis-liste.component";
import { YemekStartComponent } from "./yemekler/yemek-start/yemek-start.component";
import { YemekDetayComponent } from "./yemekler/yemek-detay/yemek-detay.component";
import { YemekDuzenleComponent } from "./yemekler/yemek-duzenle/yemek-duzenle.component";
import { YemeklerResolverService } from "./yemekler/yemekler-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { YemekKategoriComponent } from "./yemekler/yemek-kategori/yemek-kategori.component";
import { YemekKategoriDuzenleComponent } from "./yemekler/yemek-kategori/yemek-kategori-duzenle/yemek-kategori-duzenle.component";
import { YemekFiltreComponent } from "./yemekler/yemek-filtre/yemek-filtre.component";



const appRoutes: Routes = [
    { path: '', redirectTo: '/yemekler', pathMatch: 'full'},
    { path: 'yemekler', component: YemeklerComponent, children: [
        {path: '', component: YemekStartComponent},
        {path: 'new', component: YemekDuzenleComponent},
        {path: 'kategori', component: YemekKategoriComponent},
        {path: 'yemek-filtre', component: YemekFiltreComponent},
        {path: 'kategori-update', component: YemekKategoriDuzenleComponent},
        {path: ':id', component: YemekDetayComponent,resolve:[YemeklerResolverService]},
        {path: ':id/edit', component: YemekDuzenleComponent,resolve:[YemeklerResolverService]}
    ]},
    { path: 'siparis-liste', component: SiparisListeComponent,canActivate:[AuthGuard]},
    { path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})

export class AppRoutingModule {

}