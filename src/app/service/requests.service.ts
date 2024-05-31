import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Requests} from '../data/requests';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  readonly backendUrl = 'requests';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Requests[]> {
    return this.http.get<Requests[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Requests> {
    return this.http.get<Requests>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(requests: Requests): Observable<Requests> {
    return this.http.put<Requests>(environment.backendBaseUrl + this.backendUrl + `/${requests.id}`, requests);
  }

  public save(requests: Requests): Observable<Requests> {
    return this.http.post<Requests>(environment.backendBaseUrl + this.backendUrl, requests);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
