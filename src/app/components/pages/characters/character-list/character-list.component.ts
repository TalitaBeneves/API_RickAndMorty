import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { Character } from '../../../../core/model/character';
import { CharacterService } from './../../../../core/services/character.service';
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
  info: RequestInfo = {
    next: null,
  };

  pageNumber = 1;
  query: any;
  hideScrol = 500;
  showScrol = 500;
  msg404!: boolean;
  showGoUpButton: boolean = false;

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

  @HostListener('window: scroll', [])
  onWindowScroll() {
    const yOffSet = window.pageYOffset;
    if (
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) > this.showScrol
    ) {
      this.showGoUpButton = true;
    } else if (
      this.showGoUpButton &&
      (yOffSet ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop) < this.hideScrol
    ) {
      this.showGoUpButton = false;
    }
  }

  scrollInfinit() {
    if (this.info.next) {
      this.pageNumber++;
      this.getDataFromService();
    }
  }

  scrollTop() {
    this.document.body.scrollTop = 0; //Safari
    this.document.documentElement.scrollTop = 0; //Other
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

  // Pegando o value do search e exibindo
  getCharecters(): void {
    this.activeRoute.queryParams.pipe(take(1)).subscribe({
      next: (paramMap) => {
        this.query = paramMap['q'];
        this.getDataFromService();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Pegando os dados
  getDataFromService() {
    this.characterService
      .search(this.query, this.pageNumber)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          if (res?.results?.length) {
            console.log(res);
            const { info, results } = res;
            this.characters = [...this.characters, ...results];
            this.info = info;
          } else {
            this.characters = [];
          }
        },
        error: (error) => {
          this.msg404 = true;
        },
      });
  }
}
