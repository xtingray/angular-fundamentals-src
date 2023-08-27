import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Passenger } from './models/passenger.interface';

const PASSENGER_API: string = 'http://localhost:3000/passengers';

import { lastValueFrom } from 'rxjs';

@Injectable()
export class PassengerDashboardService {
  constructor(private http: HttpClient) {}

  async getPassengers(): Promise<Passenger[]> {
    const request$ = this.http.get<Passenger[]>(PASSENGER_API);
    return await lastValueFrom(request$);
  }

  async updatePassenger(passenger: Passenger): Promise<Passenger> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const request$ = this.http.put<Passenger>(`${PASSENGER_API}/${passenger.id}`, passenger, { headers: headers });
    return await lastValueFrom(request$);
  }

  async removePassenger(passenger: Passenger): Promise<Passenger> {
    const request$ = this.http.delete<Passenger>(`${PASSENGER_API}/${passenger.id}`); 
    return await lastValueFrom(request$);
  }
}
