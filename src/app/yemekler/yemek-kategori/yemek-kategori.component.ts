import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Kategori } from '../kategori.model';
import { KategoriService } from '../kategori.service';

@Component({
  selector: 'app-yemek-kategori',
  templateUrl: './yemek-kategori.component.html',
  styleUrls: ['./yemek-kategori.component.css']
})
export class YemekKategoriComponent implements OnInit{

  kategoriForm: FormGroup;
  
  constructor(private router:Router,private route: ActivatedRoute,private dataStorage : DataStorageService,private kategoriService:KategoriService){}
  ngOnInit(): void {
   
    this.initForm();
  }
 
  private initForm() {
    this.kategoriForm= new FormGroup({
      
      'isim': new FormControl("",Validators.required)
      
    })
  }

  onSubmit()
  {
    console.log(this.kategoriForm.value['isim']);
    this.dataStorage.addKategori(this.kategoriForm.value['isim']).subscribe(
      (kategoriler:Kategori[]) => {
        this.kategoriService.setKategoriler(kategoriler);

      }
    );
    this.onCancel();


  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});

  }
}
