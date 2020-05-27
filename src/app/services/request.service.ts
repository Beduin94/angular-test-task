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
export class RequestService {
  public allSpecialists: ISpecialist[] = [];
  public shops: IShop[] = [];

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
}
