import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { CharacterService } from 'src/app/core/services/characterService/character.service';
import { Character } from './../../../../core/model/character';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  characterId!: Observable<Character>;
  character$!: Observable<any>;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.detailsCharacter();
  }

  detailsCharacter() {
    this.activeRoute.params
      .pipe(
        take(1),
        tap(
          ({ id }) => (this.character$ = this.characterService.getDetails(id))
        )
      )
      .subscribe();
  }

  goBack() {
    this.router.navigate(['/character-list']);
  }
}
