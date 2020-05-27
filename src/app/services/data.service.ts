import {Injectable} from '@angular/core';
import {ISpecialist, IShop, RequestService} from "./request.service";

@Injectable({providedIn: 'root'})
export class DataService {
  public allSpecialists: ISpecialist[] = [];
  public specialists: ISpecialist[] = [];
  public shopsCounter: number = 0;
  public shops: IShop[] = [];
  public currentSpecialist : ISpecialist;

  constructor(private RequestService: RequestService) {}

  getShops():void{
    this.RequestService.fetchShops()
      .subscribe(() => {
        this.shops = this.RequestService.shops;
        this.changeShopsCounter(); // нужно пересчитать количество нераспределенных магазинов
      })
  }

  changeCurrentSpecialist(specialist: ISpecialist):void{
    this.currentSpecialist = specialist;
  }

  addShopToSpecialist(shop:IShop):void{
    if(!this.currentSpecialist)
      return
    this.shops.find(item => item.id === shop.id).distributed = true; // удалим магазин из списка нераспределенных
    this.currentSpecialist.shops.push(shop);
    this.changeShopsCounter();
  }

  removeShopFromSpecialist(id: number):void{
    this.shops.find(item => item.id === id).distributed = false; // добавим магазин в список нераспределенных
    this.currentSpecialist.shops = this.currentSpecialist.shops.filter(item => item.id !== id);
    this.changeShopsCounter();
  }

  addSpecialist():void{
    this.RequestService.fetchSpecialists()
      .subscribe(() => {
        this.allSpecialists = this.RequestService.allSpecialists;
        this.specialists.push(this.allSpecialists[this.specialists.length])
        this.changeCurrentSpecialist(this.specialists[this.specialists.length-1])
      })
  }

  deleteSpecialist(id: number):void{
    this.currentSpecialist.shops.forEach((element) => { // вернем все магазины специалиста в список нерапределенных
      this.shops.find(item => item.id === element.id).distributed = false;
    });
    this.changeShopsCounter();
    this.specialists = this.specialists.filter(item => item.id !== id);
    if(this.specialists)
      this.changeCurrentSpecialist(this.specialists[0]);
  }

  saveAllChanges():void{
    if(!this.specialists || !this.specialists.length)
      return
    this.RequestService.createWorkerShopRequest(this.specialists)
      .subscribe(() => {})
  }

  changeShopsCounter():void{
    this.shopsCounter = this.shops.filter(item => !item.distributed).length;
  }
}
