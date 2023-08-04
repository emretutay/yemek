
import { Yemek } from "../yemekler/yemek-liste/yemek.model";
import { Siparis } from "./siparis.model";
import { Subject } from "rxjs";

export class SiparisService{
    siparislerChanged = new Subject<Siparis[]>();
    startedEditing = new Subject<number>;
    private siparisler: Siparis[];

    setSiparisler(siparisler: Siparis[]){
        this.siparisler = siparisler;
        this.siparislerChanged.next(this.siparisler.slice());
    }
    getSiparisler(){
        return this.siparisler.slice();
    }
    addSiparisler(siparisler: Siparis[]){
        this.siparisler = siparisler;
        this.siparislerChanged.next(this.siparisler.slice());
    }
    getSiparis(id:number){
        return this.siparisler[id];
    }
    UpdateDurum(index: number, newDurum: Siparis){
        this.siparisler[index] = newDurum;
        this.siparislerChanged.next(this.siparisler.slice());
    
      }
    deleteSiparis(index:number){
        this.siparisler.splice(index,1);
        this.siparislerChanged.next(this.siparisler.slice());
    }  
    
}