
import { ActivatedRouteSnapshot,  RouterStateSnapshot } from "@angular/router";
import { Yemek } from "./yemek-liste/yemek.model";
import { DataStorageService } from "../shared/data-storage.service";
import {Injectable, inject}  from '@angular/core';
import { Resolve } from "@angular/router";
import { YemekService } from "./yemek.service";



@Injectable({providedIn:'root'})
export class YemeklerResolverService implements Resolve<Yemek[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private yemeklerService: YemekService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    const yemekler = this.yemeklerService.getYemekler();
    if(yemekler.length === 0){
      return this.dataStorageService.getAllYemekler();
    }
    else{
      return yemekler;
    }
  }
}
