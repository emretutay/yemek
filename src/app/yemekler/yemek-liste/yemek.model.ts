
export class Yemek{
    public id : number;
    public isim: string;
    public aciklama: string;
    public resimPath: string;
    public fiyat: number;
    public kategoriId: number;

    constructor( isim: string, aciklama: string, resimPath: string, fiyat: number, kategoriId: number){
        
        this.isim = isim;
        this.aciklama = aciklama;
        this.resimPath = resimPath;
        this.fiyat = fiyat;
        this.kategoriId = kategoriId;

    }

    setId(id:number){
        this.id = id;
    }
}