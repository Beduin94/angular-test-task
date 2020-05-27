import { Component } from '@angular/core';
import {DataService} from "../services/data.service";
import {ISpecialist} from "../services/request.service";

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss']
})
export class SpecialistsComponent {

  constructor(public dataService: DataService) { }

  getText(count:number):string{
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ['магазин', 'магазина', 'магазинов'];
    return titles[ (count%100>4 && count%100<20)? 2 : cases[(count%10<5)?count%10:5] ];
  }

}
