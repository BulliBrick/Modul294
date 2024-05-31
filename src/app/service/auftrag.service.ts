import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Auftrag} from '../data/auftrag';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuftragService {

  readonly backendUrl = 'auftrag';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Auftrag[]> {
    return this.http.get<Auftrag[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Auftrag> {
    return this.http.get<Auftrag>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(service: Auftrag): Observable<Auftrag> {
    return this.http.put<Auftrag>(environment.backendBaseUrl + this.backendUrl + `/${service.id}`, service);
  }

  public save(auftrag: Auftrag): Observable<Auftrag> {
    return this.http.post<Auftrag>(environment.backendBaseUrl + this.backendUrl, auftrag);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
