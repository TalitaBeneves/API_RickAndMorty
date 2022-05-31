import { LocalStorageService } from './../../../core/services/localStorage/localStorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  charactersFav$ = this.localStorage.charactersFav$;
  
  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {}
}
