
export class Kategori{
    public id : number;
    public isim: string;

    constructor(  isim: string){
        
       
        this.isim = isim;

    }

    setId(id:number){
        this.id = id;
    }
}