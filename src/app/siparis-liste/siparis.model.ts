export class Siparis{
    public id : number;
    public yemekId : number;
    public userId : number;
    public durum : string;


    constructor(  yemekId: number,  userId: number,  durum : string){
        this.yemekId = yemekId;
        this.userId = userId;
        this.durum = durum;
        
    }
    setId(id:number){
        this.id = id;
    }
}