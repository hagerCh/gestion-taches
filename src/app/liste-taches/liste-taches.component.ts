import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-liste-taches',
  templateUrl: './liste-taches.component.html',
  styleUrls: ['./liste-taches.component.css']
})

export class ListeTachesComponent implements OnInit {
  taches;
  tache;
  phases;
  idPhase;
  nomPhase;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getPhases().subscribe((res: any) => {
      console.log(res.data);
      this.phases = res.data;
    })
    this.apiService.getTachesByPhase(this.idPhase).subscribe((res: any) => {
      console.log(res.data);
      this.taches = res.data;
    })
  }

  selectPhase(phase) {
    console.log(phase)
    this.idPhase = phase;
    this.apiService.getTachesByPhase(this.idPhase).subscribe((res: any) => {
      console.log(res.data);
      this.taches = res.data;
    })
    this.apiService.getPhase(this.idPhase).subscribe((res: any) => {
      console.log(res.data);
      this.nomPhase = res.data[0].titre;
    })
  }

  addTache(titre, desc, result, duree, charge) {
    const obj = {
      nom: titre,
      description: desc,
      resultat: result,
      duree: duree,
      charge: charge
    }
    console.log(obj)
    this.apiService.addTache(this.idPhase, obj).subscribe((res: any) => {
      this.ngOnInit();
    })
  }

  doneChecked(tache) {
    const id = tache._id;
    console.log(id);
    tache.done = !tache.done;
    this.apiService.updateTache(id, tache).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    })
  }

  modifierTache(tache) {
    this.tache = tache
  }

  modifierModal(nom, desc, result,duree, charge) {
    const obj = {
      nom: nom,
      description: desc,
      resultat: result,
      duree: duree,
      charge: charge
    }
    this.apiService.updateTache(this.tache._id, obj).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    })
  }

  delete(tache) {
    this.tache = tache
  }

  deleteModal() {
    this.apiService.deleteTache(this.tache._id).subscribe((res: any) => {
      this.ngOnInit();
    })
  }
}
