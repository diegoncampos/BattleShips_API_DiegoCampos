import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

    constructor(private http: HttpClient) { }

    createBoard(): Observable<any> {
        return this.http.get(environment.apiUrl + "api/Board/CreateBoard")
    }

    getBoard(): Observable<any> {
        return this.http.get(environment.apiUrl + "api/Board/GetBoard")
    }

    attack(axleX: number, axleY: number): Observable<any> {
        return this.http.get(environment.apiUrl + "api/Board/Attack/" + axleX + "/" + axleY)
    }
}
