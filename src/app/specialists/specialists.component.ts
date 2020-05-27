import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss']
})
export class SpecialistsComponent implements OnInit {
  loading: boolean = true;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.fetchSpecialists()
      .subscribe(() => {
        this.dataService.changeCurrentSpecialist(this.dataService.specialists[0])
        this.loading = false
      })
  }

  addSpecialist():void{

  }
}
