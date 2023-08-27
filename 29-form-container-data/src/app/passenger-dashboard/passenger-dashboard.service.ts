import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Passenger } from './models/passenger.interface';

const PASSENGER_API: string = 'http://localhost:3000/passengers';

@Injectable()
export class PassengerDashboardService {
  constructor(private http: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(PASSENGER_API)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }
      )
    );
  }

  getPassenger(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(`${PASSENGER_API}/${id}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }
      )
    );
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Passenger>(`${PASSENGER_API}/${passenger.id}`, passenger, { headers: headers })
      .pipe(
        catchError((error) => {
          return throwError(error);
        }
      )
    );
  }

  removePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http.delete<Passenger>(`${PASSENGER_API}/${passenger.id}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }
      )
    );
  }
}
