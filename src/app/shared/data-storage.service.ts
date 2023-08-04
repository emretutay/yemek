import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { YemekService } from "../yemekler/yemek.service";
import { Yemek } from "../yemekler/yemek-liste/yemek.model";
import { tap } from "rxjs";
import { Observable } from 'rxjs/internal/Observable';
import { Siparis } from "../siparis-liste/siparis.model";
import { Kategori } from "../yemekler/kategori.model";
import { HttpHeaders } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    api:string = 'https://localhost:7211';
    
    constructor(private http: HttpClient, private yemekService: YemekService){}

    
    addYemek(yemek : Yemek):Observable<Yemek>{
        return this.http.post<Yemek>(this.api + '/api/Yemekler',yemek)
        ;
        
    }
    updateYemek(yemek : Yemek){
        this.http.put(this.api + '/api/Yemekler',yemek)
        .subscribe(response => {
            console.log(response);
        });
    }
    deleteYemek(id : number){

        this.http.delete(this.api + '/api/Yemekler/' + id )
        .subscribe(response => {
            console.log(response);
        });
    }

    storeYemekler(){
        const yemekler = this.yemekService.getYemekler();
        
        this.http.put(this.api + '/api/Yemekler',yemekler);
        console.log(yemekler);
    }

    getAllYemekler(){
        return this.http.get<Yemek[]>(this.api + '/api/Yemekler')
        .pipe(
            tap(yemekler => {
                this.yemekService.setYemekler(yemekler);
                
            })
        )
        }

    getYemek(id : number):Observable<Yemek>{
        return this.http.get<Yemek>(this.api + '/api/Yemekler/'+ id);
        
        
        
    }
    addSiparis(siparis: Siparis):Observable<Siparis[]>{
        return this.http.post<Siparis[]>(this.api + '/api/Siparisler',siparis);
        

    }  
    getUserSiparisler(userId:number):Observable<Siparis[]>{
        return this.http.get<Siparis[]>(this.api + '/api/Siparisler/'+ userId);
    }  

    deleteSiparis(siparisId:number):Observable<Siparis[]>
    {
        return this.http.post<Siparis[]>(this.api + '/api/Siparisler/delete',siparisId);
    }

    updateSiparis(siparis:Siparis):Observable<Siparis[]>{
        return this.http.put<Siparis[]>(this.api + '/api/Siparisler',siparis);
    }

    addKategori(isim:string):Observable<Kategori[]>{
        const headers = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
          const json = JSON.stringify(isim);
        return this.http.post<Kategori[]>(this.api + '/api/Kategori',json,headers);
    }

    getKategoriler():Observable<Kategori[]>{
        return this.http.get<Kategori[]>(this.api + '/api/Kategori');

    }

    updateKategori(kategori:Kategori):Observable<Kategori[]>{
        return this.http.put<Kategori[]>(this.api + '/api/Kategori',kategori);

    }
    deleteKategori(id:number):Observable<Kategori[]>{
        return this.http.post<Kategori[]>(this.api + '/api/Kategori/delete',id);
    }
    getKategori(id:number):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.post(this.api + '/api/Kategori/isim',id,{  responseType: 'text'} )
    }
    

}