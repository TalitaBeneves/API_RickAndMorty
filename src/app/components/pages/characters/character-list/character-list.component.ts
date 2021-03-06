import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { CharacterService } from 'src/app/core/services/characterService/character.service';
import { Character } from '../../../../core/model/character';
import { LocalStorageService } from './../../../../core/services/localStorage/localStorage.service';
type RequestInfo = {
  next: any;
};
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  icon!: Character;
  characters$ = this.characterService.characters$;

  info: RequestInfo = {
    next: null,
  };

  pageNumber = 1;
  query: any;
  hideScrol = 500;
  showScrol = 500;
  msg404!: boolean;
  showButton: boolean = false;

  constructor(
    private characterService: CharacterService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.urlChange();
  }

  ngOnInit(): void {
    this.getCharecters();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.hideScrol;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  scrollInfinit() {
    this.pageNumber++;
    this.characterService.getCharactersByPage(this.pageNumber);
  }

  urlChange() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          this.characters = [];
          this.pageNumber = 1;
          this.getCharecters();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getIcon(): string {
    return this.icon.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }

  toggleFavorite(): void {
    const isFavorite = this.icon.isFavorite;
    this.getIcon();
    this.icon.isFavorite = !isFavorite;
  }

  // Pegando o value do search e exibindo
  getCharecters(): void {
    this.activeRoute.queryParams.pipe(take(1)).subscribe({
      next: (paramMap) => {
        this.query = paramMap['q'];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
