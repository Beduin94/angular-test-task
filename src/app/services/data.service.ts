import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

@Injectable({providedIn: 'root'})
export class DataService {
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
      .pipe(tap(specialists => this.specialists = specialists))
  }

  changeCurrentSpecialist(specialist: ISpecialist):void{
    this.currentSpecialist = specialist;
  }

  addShopToSpecialist(shop:IShop):void{
    this.shops.find(item => item.id === shop.id).distributed = true; // удалим магазин из списка нераспределенных
    this.currentSpecialist.shops.push(shop);
  }

  removeShopFromSpecialist(id: number):void{
    this.shops.find(item => item.id === id).distributed = false; // добавим магазин в список нераспределенных
    this.currentSpecialist.shops = this.currentSpecialist.shops.filter(item => item.id !== id);
  }
}
