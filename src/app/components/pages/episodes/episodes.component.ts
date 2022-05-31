import { Character } from 'src/app/core/model/character';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/core/services/characterService/character.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {
  episodes$ = this.characterService.episodes$;


  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {}
}
