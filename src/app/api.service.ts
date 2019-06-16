import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTaches(){
    return this.http.get('http://localhost:3000/taches/allTaches');
  }
  getPhases(){
    return this.http.get('http://localhost:3000/taches/phases');
  }
  getPhase(id){
    return this.http.get('http://localhost:3000/taches/phase/'+id);
  }
  getTachesByPhase(idPhase){
    return this.http.get('http://localhost:3000/taches/byPhase/' + idPhase);
  }

  addTache(idPhase, tache){
    return this.http.post('http://localhost:3000/taches/addTache/' + idPhase, tache);
  }

  updateTache(idTache, tache){
    return this.http.post('http://localhost:3000/taches/updateTache/' + idTache, tache);
  }

  deleteTache(idTache){
    const body= {}
    return this.http.post('http://localhost:3000/taches/deleteTache/' + idTache, body);
  }


}
