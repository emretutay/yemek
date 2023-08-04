import { Component, Input,OnInit } from '@angular/core';
import { Siparis } from '../siparis.model';

@Component({
  selector: 'app-siparis-oge',
  templateUrl: './siparis-oge.component.html',
  styleUrls: ['./siparis-oge.component.css']
})
export class SiparisOgeComponent implements OnInit {
  @Input() siparis: Siparis;
  @Input() index: number;


  ngOnInit(){
    
  }
}
