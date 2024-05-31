import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Service} from '../data/service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KundenserviceService {

  readonly backendUrl = 'service';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Service[]> {
    return this.http.get<Service[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Service> {
    return this.http.get<Service>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(service: Service): Observable<Service> {
    return this.http.put<Service>(environment.backendBaseUrl + this.backendUrl + `/${service.id}`, service);
  }

  public save(service: Service): Observable<Service> {
    return this.http.post<Service>(environment.backendBaseUrl + this.backendUrl, service);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
