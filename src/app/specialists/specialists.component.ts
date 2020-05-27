import { Component } from '@angular/core';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss']
})
export class SpecialistsComponent {

  constructor(public dataService: DataService) { }

}
