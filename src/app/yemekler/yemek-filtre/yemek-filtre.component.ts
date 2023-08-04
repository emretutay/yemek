import { Component } from '@angular/core';
import { Kategori } from '../kategori.model';
import { Subscription } from 'rxjs';
import { FormGroup ,FormControl,Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { KategoriService } from '../kategori.service';
import { YemekService } from '../yemek.service';


@Component({
  selector: 'app-yemek-filtre',
  templateUrl: './yemek-filtre.component.html',
  styleUrls: ['./yemek-filtre.component.css']
})
export class YemekFiltreComponent {
  kategori:Kategori;
  selectedCategory: Kategori;
  kategoriler:Kategori[];
  private subscription : Subscription;
  yemekfiltreForm: FormGroup;
  constructor(private router:Router,private route: ActivatedRoute,private dataStorage : DataStorageService,private kategoriService:KategoriService,private yemekService:YemekService){}

  ngOnInit(): void {
    this.dataStorage.getKategoriler().
      subscribe(
        (kategoriler: Kategori[]) => {
          this.kategoriService.setKategoriler(kategoriler);
        }
      );
    this.subscription = this.kategoriService.kategorilerChanged
      .subscribe(
        (kategoriler:Kategori[]) => {
          this.kategoriler = kategoriler;
        }
      );
    this.kategoriler = this.kategoriService.getKategoriler(); 
    this.initForm();
    
  }
  onSubmit(){
    var kategori = this.yemekfiltreForm.value['kategori'].id;
    this.yemekService.setSelectedKategori(kategori);
    
    this.yemekfiltreForm.reset();
    
    this.onCancel();


  }
  
  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});

  }
  private initForm(){
    
    let yemekKategori = "";
    this.yemekfiltreForm= new FormGroup({
      'kategori': new FormControl(yemekKategori,Validators.required)
      
      
    })
  }
  

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


