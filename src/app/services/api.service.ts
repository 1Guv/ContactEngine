import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countries } from '../models/country';
import { SMSProvider } from '../models/sms-provider';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getAllCountriesUrl: string = 'http://localhost:53897/api/SmsProviders/Countries';
  getAllSMSProvidersUrl: string = 'http://localhost:53897/api/SmsProviders';

  bearerToken: string = 
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
  'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.bearerToken
  })

  constructor(private http: HttpClient ) { }

  getCountries(): Observable<Countries> {
    return this.http.get<Countries>(this.getAllCountriesUrl, {headers: this.headers});
  }

  getSMSProviders(): Observable<SMSProvider> {
    return this.http.get<SMSProvider>(this.getAllSMSProvidersUrl, {headers: this.headers});
  }

  createSMSProvider(newProvider: SMSProvider): Observable<SMSProvider> {
    return this.http.post<SMSProvider>(this.getAllSMSProvidersUrl,  newProvider, {headers: this.headers})
  }

}
