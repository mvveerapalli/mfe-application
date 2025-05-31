import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemoteInService {
  //  Using your requested old GUID and Dealer No
  private guid = 'c8e3188c-8c79-4c17-ad23-405744e38cb7';
  private dealerNo = 'B11464';

  //  Updated API endpoints using proxy-compatible paths
  private dealerApiUrl = `/api/dealerremotein/hvacsystem/information/v2/dealer`;
  private generalApiUrl = `/api/dealerremotein/hvacsystem/information/v2/general`;
  private languageApiUrl = `/api/dealerremotein/hvacsystem/information/v2/general/language`;
  private regionApiUrl = `/api/dealerremotein/hvacsystem/information/v2/general/region`;
  private tempUnitApiUrl = `/api/dealerremotein/hvacsystem/information/v2/general/temperatureunit`;

  private daylightPostApiUrl = `/api/dealerremotein/hvacsystem/information/v2/general/publish?hvacSystemGuid=${this.guid}&dealer=${this.dealerNo}&homeId=0`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': environment.authToken,
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  //  Dealer Info
  getDealerInfo(): Observable<any> {
    const url = `${this.dealerApiUrl}?guid=${this.guid}&dealerNo=${this.dealerNo}`;
    return this.http.get(url, this.httpOptions);
  }

  //  General Info
  getGeneralInfo(): Observable<any> {
    const url = `${this.generalApiUrl}?guid=${this.guid}&dealerNo=${this.dealerNo}`;
    return this.http.get(url, this.httpOptions);
  }

  //  Language
  getLanguage(): Observable<any> {
    return this.http.get(this.languageApiUrl, this.httpOptions);
  }

  //  Region
  getCountry(): Observable<any> {
    return this.http.get(this.regionApiUrl, this.httpOptions);
  }

  //  Temperature Unit
  getTemperatureUnit(): Observable<any> {
    return this.http.get(this.tempUnitApiUrl, this.httpOptions);
  }

  //  Update Daylight Savings
  updateDaylightSavings(value: boolean): Observable<any> {
    const body = {
      daylightSavings: value
    };
    return this.http.post(this.daylightPostApiUrl, body, this.httpOptions);
  }
}
