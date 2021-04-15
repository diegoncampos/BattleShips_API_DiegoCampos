import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Player } from '../../models/player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    constructor(private http: HttpClient) { }

    getPlayersList(): Observable<any> {
        return this.http.get(environment.apiUrl + "api/Players/GetPlayers")
    }

    getPlayerById(id: number): Observable<any> {
        return this.http.get(environment.apiUrl + "api/Players/GetPlayer/" + id)
    }

    newPlayer(player: Player): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(player);
        return this.http.post(environment.apiUrl + "api/Players/NewPlayer", body, { 'headers': headers })
    }

    updatePlayer(player: Player): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(player);
        return this.http.put(environment.apiUrl + "api/Players/UpdatePlayer/" + player.id, body, { 'headers': headers })
    }
}
