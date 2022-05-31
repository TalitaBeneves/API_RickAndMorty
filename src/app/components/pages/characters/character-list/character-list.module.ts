import { CharacterCardComponent } from './../character-card/character-card.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharacterListRoutingModule } from './character-list-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CharacterListRoutingModule, RouterModule],
})
export class CharacterListModule {}
