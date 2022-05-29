import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Character } from 'src/app/core/model/character';
import { CharacterService } from 'src/app/core/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  character$!: Observable<Character>;

  constructor(
    private characterService: CharacterService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.detailsCharacter();
  }

  detailsCharacter() {
    this.activeRoute.params.pipe(take(1)).subscribe({
      next: (params) => {
        const id = params['id'];
        this.character$ = this.characterService.getDetails(id);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
