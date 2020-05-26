import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface Specialist {
  id: number;
  name: string;
  logo?: string;
}

export interface Shop {
  id: number;
  name: string;
  fullAddress: string;
}

@Injectable({providedIn: 'root'})
export class DataService {
  public specialists: Specialist[] = [];
  public shops: Shop[] = [];

  constructor(private http: HttpClient) {}

  fetchShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>('/assets/mock/shops.json')
      .pipe(tap(shops => this.shops = shops))
  }

  fetchSpecialists(): Observable<Specialist[]> {
    return this.http.get<Shop[]>('/assets/mock/specialists.json')
      .pipe(tap(specialists => this.specialists = specialists))
  }
}
