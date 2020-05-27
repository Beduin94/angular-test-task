import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  loading: boolean = true;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.fetchShops()
      .subscribe(() => {
        this.dataService.changeShopsCounter(); // нужно пересчитать количество нераспределенных магазинов
        this.loading = false
      })
  }
}
