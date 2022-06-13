import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/model/usuario';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ThemeService } from 'src/app/core/services/localStorage/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDarkMode!: boolean;
  trocaIcon: boolean = false;
  photo: string = 'assets/img/photo.png'

  user: Usuario = {
    name: '',
    email: '',
    photoUrl: '',
  };

  provideId: any = 'null'

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    if (this.isDarkMode == true) {
      this.trocaIcon = true;
    }
  }

  ngOnInit(): void {
    this.authService.isAuth().subscribe((user) => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.provideId = user.providerData[0]?.providerId
        console.log('BBB', user)
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
    this.trocaIcon = !this.trocaIcon;
  }

  logout() {
    this.authService.logout();
  }
}
