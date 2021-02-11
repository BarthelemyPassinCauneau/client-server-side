import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  get(route: string){
    return this.http.get<Object[]>(`${this.API_URL}/${route}`);
  }

  delete(route: string, id: any){
    return this.http.delete<Object[]>(`${this.API_URL}/${route}/${id}`);
  }

  post(route: string, body: any){
    return this.http.post<Object[]>(`${this.API_URL}/${route}`, body);
  }
}
