import { LocalStorageService } from './../../../core/services/localStorage/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/core/services/characterService/character.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  charactersFav$ = this.localStorage.charactersFav$;
  pageNumber = 1;
  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {}
}
