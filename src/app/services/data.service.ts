import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface IShop {
  id: number;
  name: string;
  fullAddress: string;
  distributed?: boolean;
}

export interface ISpecialist {
  id: number;
  name: string;
  shops: IShop[];
  logo?: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({providedIn: 'root'})
export class DataService {
  public allSpecialists: ISpecialist[] = [];
  public specialists: ISpecialist[] = [];
  public shops: IShop[] = [];
  public currentSpecialist : ISpecialist;

  constructor(private http: HttpClient) {}

  fetchShops(): Observable<IShop[]> {
    return this.http.get<IShop[]>('/assets/mock/shops.json')
      .pipe(tap(shops => this.shops = shops))
  }

  fetchSpecialists(): Observable<ISpecialist[]> {
    return this.http.get<ISpecialist[]>('/assets/mock/specialists.json')
      .pipe(tap(allSpecialists => this.allSpecialists = allSpecialists))
  }

  createWorkerShopRequest (specialists: ISpecialist[]): Observable<ISpecialist> {
    return this.http.post<ISpecialist>("http://localhost:4200/CreateWorkerShopRequest", specialists, httpOptions)
      .pipe();
  }

  changeCurrentSpecialist(specialist: ISpecialist):void{
    this.currentSpecialist = specialist;
  }

  addShopToSpecialist(shop:IShop):void{
    if(!this.currentSpecialist)
      return
    this.shops.find(item => item.id === shop.id).distributed = true; // удалим магазин из списка нераспределенных
    this.currentSpecialist.shops.push(shop);
  }

  removeShopFromSpecialist(id: number):void{
    this.shops.find(item => item.id === id).distributed = false; // добавим магазин в список нераспределенных
    this.currentSpecialist.shops = this.currentSpecialist.shops.filter(item => item.id !== id);
  }

  addSpecialist():void{
    this.fetchSpecialists()
      .subscribe(() => {
        this.specialists.push(this.allSpecialists[this.specialists.length])
        this.changeCurrentSpecialist(this.specialists[this.specialists.length-1])
      })
  }

  deleteSpecialist(id: number):void{
    this.currentSpecialist.shops.forEach((element) => { // вернем все магазины специалиста в список нерапределенных
      this.shops.find(item => item.id === element.id).distributed = false;
    });
    this.specialists = this.specialists.filter(item => item.id !== id);
    if(this.specialists)
      this.changeCurrentSpecialist(this.specialists[0]);
  }

  saveAllChanges():void{
    if(!this.specialists || !this.specialists.length)
      return
    this.createWorkerShopRequest(this.specialists)
      .subscribe(() => {})
  }
}
