import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Passenger } from './models/passenger.interface';

const PASSENGER_API: string = 'http://localhost:3000/passengers';

@Injectable()
export class PassengerDashboardService {
  constructor(private http: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(PASSENGER_API)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))
      )
    );
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Passenger>(`${PASSENGER_API}/${passenger.id}`, passenger, { headers: headers })
      .pipe(
        tap(data => console.log('Response: ' + JSON.stringify(data))
      )
    );
  }

  removePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.delete<Passenger>(`${PASSENGER_API}/${passenger.id}`)
      .pipe(
        tap(data => console.log('Response: ' + JSON.stringify(data))
      )
    );
  }

}
