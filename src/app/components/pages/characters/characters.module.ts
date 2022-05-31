import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharacterListComponent } from './character-list/character-list.component';

@NgModule({
  declarations: [
    CharacterDetailsComponent,
    CharacterListComponent,
    CharacterCardComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, InfiniteScrollModule],
  exports: [
    CharacterDetailsComponent,
    CharacterListComponent,
    CharacterCardComponent,
  ],
})
export class CharactersModule {}
