import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { CharacterService } from 'src/app/core/services/characterService/character.service';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss'],
})
export class FormSearchComponent {
  search = new FormControl('');
  private destroy$ = new Subject<unknown>();

  constructor(private characterService: CharacterService) {
    this.onSearch();
  }

  onClear(): void {
    this.search.reset();
    this.characterService.getDataAPI();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  private onSearch(): void {
    this.search.valueChanges
      .pipe(
        map((search) => search?.toLowerCase().trim()),
        debounceTime(300),
        distinctUntilChanged(),
        filter((search) => search !== '' && search?.length > 2),
        tap((search) => this.characterService.filterData(search)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
