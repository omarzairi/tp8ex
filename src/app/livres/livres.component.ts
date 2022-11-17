import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Livre } from '../livre';
import { LivreService } from '../livre.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css'],
})
export class LivresComponent implements OnInit {
  lesLivres!: Livre[];
  livForm!: FormGroup;
  constructor(private LivreServ: LivreService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.livForm = this.fb.nonNullable.group({
      titre: [''],
      prix: [0],
      nouvelle: true,
    });
    this.LivreServ.getLivres().subscribe((data) => (this.lesLivres = data));
  }
  deleteLiv(id: Number) {
    this.LivreServ.deleteLiv(id).subscribe(
      (data) => (this.lesLivres = this.lesLivres.filter((alt) => alt.id != id))
    );
  }
  addLiv() {
    this.LivreServ.addLivre(this.livForm.value).subscribe((data) =>
      this.lesLivres.push(data)
    );
  }
  modifier(id: Number) {
    this.LivreServ.modifierLivre(id, this.livForm.value).subscribe((data) => {
      let ind = this.lesLivres.findIndex((alt) => alt.id == id);
      this.lesLivres[ind] = this.livForm.value;
      this.lesLivres[ind].id = data.id;
    });
  }
  reset() {
    this.livForm.reset();
  }
}
