import { CharacterCardComponent } from './../characters/character-card/character-card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharactersModule } from './../characters/characters.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, CharactersModule],
})
export class HomeModule {}
