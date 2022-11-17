import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from './livre';
const URL = 'http://localhost:4500/livres';
@Injectable({
  providedIn: 'root',
})
export class LivreService {
  constructor(private http: HttpClient) {}
  getLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(URL);
  }
  addLivre(l: Livre): Observable<Livre> {
    return this.http.post<Livre>(URL, l);
  }
  modifierLivre(id: Number, l: Livre): Observable<Livre> {
    return this.http.put<Livre>(URL + '/' + id, l);
  }
  deleteLiv(id: Number) {
    return this.http.delete(URL + '/' + id);
  }
}
