
import { Kategori } from "./kategori.model";
import { Subject } from "rxjs";







export class KategoriService {
    kategorilerChanged = new Subject<Kategori[]>();
    kategori :Kategori;
    startedEditing = new Subject<number>;

    
    private kategoriler:Kategori[] = [];
    

  

    setKategoriler(kategoriler: Kategori[]){
        console.log(kategoriler);
        this.kategoriler = kategoriler;
        this.kategorilerChanged.next(this.kategoriler.slice());

    }
   

    getKategoriler(){
        return this.kategoriler.slice();
    }
    getKategori(id:number){
        return this.kategoriler[id];
    }

    addKategori(kategori:Kategori){
        this.kategoriler.push(kategori);
        this.kategorilerChanged.next(this.kategoriler.slice());
        

    }
    updateKategori(index:number, newKategori: Kategori){
        
        this.kategoriler[index] = newKategori;
        this.kategorilerChanged.next(this.kategoriler.slice());

    }
    deleteKategori(index: number)
    {
        this.kategoriler.splice(index,1);
        this.kategorilerChanged.next(this.kategoriler.slice());

    }
    
    
}    