import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Abilitie } from './models/abilitie';
import { Hero } from './models/hero';
import { HeroDto } from './models/heroDto';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  abilities$!: Observable<Abilitie[]>;
  heroesDto!: HeroDto[];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.heroes$ = this.service.getHeroes();
    this.abilities$ = this.service.getAbilities();

    this.initHeroesDto();
  }

  initHeroesDto() {
    // le forkJoin permet de joindre/récupérer les résultats de plusieurs observables
    // un peu péchu à comprendre écrit tel quel !!! 
    // décomposer en faisant un 
    // forkJoin([this.getHeroes(), this.getAbilities()]).subscribe(joinedResults => console.log(results))
    forkJoin([this.heroes$, this.abilities$]).subscribe(
      ([heroes, abilities]) => {
        this.heroesDto = heroes.map(hero => ({ ...hero, abilities: abilities.filter(abilitie => abilitie.hero_id === hero.id) }));
      }
    )
  }

  onAddAbilitie() {
    this.service.addAbilitie().subscribe(res => {
      console.log(res);
      this.initHeroesDto();
    });
  }

  onDeleteAbilitie() {
    this.service.deleteAbilitie().subscribe(res => {
      console.log(res);
      this.initHeroesDto();
    });
  }

  onSaveAbilitie() {
    this.service.saveAbilitie().subscribe(res => {
      console.log(res);
      this.initHeroesDto();
    })
  }
}
