
import { Yemek } from "./yemek-liste/yemek.model";
import { Subject } from "rxjs";
import { Observable } from "rxjs";







export class YemekService {
    yemeklerChanged = new Subject<Yemek[]>();
    yemek :Yemek;
    

    private selectedKategoriSubject = new Subject<number>();
  selectedKategori$: Observable<number> = this.selectedKategoriSubject.asObservable();
    
    private yemekler:Yemek[] = [];
    //[
      //  new Yemek("1","Yemek","Bu bir yemek","https://cdn.yemek.com/mnresize/1250/833/uploads/2016/09/kozalak-manti-asama-10.jpg",100,"Test kategori"),
        //new Yemek("2","Yemek2","Bu bir yemek2","https://cdn.yemek.com/mnresize/1250/833/uploads/2016/09/kozalak-manti-asama-10.jpg",100,"Test kategori")
      //];

  

    setYemekler(yemekler: Yemek[]){
        console.log(yemekler);
        this.yemekler = yemekler;
        this.yemeklerChanged.next(this.yemekler.slice());

    }
   

    getYemekler(){
        return this.yemekler.slice();
    }
    getYemek(id:number){
        return this.yemekler[id];
    }

    addYemek(yemek:Yemek){
        this.yemekler.push(yemek);
        this.yemeklerChanged.next(this.yemekler.slice());
        

    }
    updateYemek(index:number, newYemek: Yemek){
        
        this.yemekler[index] = newYemek;
        this.yemeklerChanged.next(this.yemekler.slice());

    }
    deleteYemek(index: number)
    {
        this.yemekler.splice(index,1);
        this.yemeklerChanged.next(this.yemekler.slice());

    }
    filterByKategori(kategori:number): Yemek[] {
        
        return this.yemekler.filter((yemek) => yemek.kategoriId === kategori);
      }
      setSelectedKategori(kategori: number): void {
        this.selectedKategoriSubject.next(kategori);
      }
    
    
}    