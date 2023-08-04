import { Component,  Input, OnInit} from '@angular/core';
import { Yemek } from '../yemek.model';

@Component({
  selector: 'app-yemek-oge',
  templateUrl: './yemek-oge.component.html',
  styleUrls: ['./yemek-oge.component.css']
})
export class YemekOgeComponent implements OnInit{
  @Input() yemek: Yemek;
  @Input() index: number;
  

  
  ngOnInit(){
    
  }
  

}
