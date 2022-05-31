import { LocalStorageService } from './../../../../core/services/localStorage/localStorage.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Character } from 'src/app/core/model/character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent implements OnInit {
  @Input() character!: Character;

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {}

  getIcon() {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }

  toggleFavorite() {
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    this.localStorage.addOrRemoveFavorite(this.character)
  }
}
