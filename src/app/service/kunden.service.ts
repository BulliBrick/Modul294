import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Kunden} from '../data/kunden';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KundenService {

  readonly backendUrl = 'kunden';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Kunden[]> {
    return this.http.get<Kunden[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Kunden> {
    return this.http.get<Kunden>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(department: Kunden): Observable<Kunden> {
    return this.http.put<Kunden>(environment.backendBaseUrl + this.backendUrl + `/${department.id}`, department);
  }

  public save(department: Kunden): Observable<Kunden> {
    return this.http.post<Kunden>(environment.backendBaseUrl + this.backendUrl, department);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
