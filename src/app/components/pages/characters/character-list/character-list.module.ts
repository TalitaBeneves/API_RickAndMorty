import { CharacterCardComponent } from './../character-card/character-card.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharacterListRoutingModule } from './character-list-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [],
  imports: [CommonModule, CharacterListRoutingModule, RouterModule, InfiniteScrollModule],
})
export class CharacterListModule {}
