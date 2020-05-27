import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.scss']
})
export class SaveFormComponent {

  constructor(public dataService: DataService) { }

}
