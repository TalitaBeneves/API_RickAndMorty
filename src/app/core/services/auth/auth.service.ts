import { Injectable, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { map, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  showMenu: boolean = true;

  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
    private toasrt: ToastrService
  ) {}

  login(email: string, senha: string) {
    this.fireAuth.signInWithEmailAndPassword(email, senha).then(
      () => {
        this.showMenu = true;
        localStorage.setItem('token', 'true');
        this.router.navigate(['/character-list']);
      },
      (err) => {
        this.showMenu = false;
        this.toasrt.error(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, senha: string, photo: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, senha).then(
      () => {
        this.toasrt.success('Cadastrado com Sucesso');
        this.showMenu = false;
        this.router.navigate(['/login']);
      },
      (err) => {
        this.toasrt.error(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  isAuth() {
    return this.fireAuth.authState.pipe(map((auth) => auth));
  }

  logout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.showMenu = false;

        this.router.navigate(['/login']);
      },
      (err) => {
        this.toasrt.error(err.message);
      }
    );
  }

  loginGoogle() {
    localStorage.setItem('token', 'true');
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider());
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
