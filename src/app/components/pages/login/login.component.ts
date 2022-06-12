import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  email: string = '';
  senha: string = '';
  theme: any;
  siteKey: string = environment.siteKey;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasrt: ToastrService,
    private fb: FormBuilder
  ) {
    this.theme = 'Dark';
  }

  ngOnInit(): void {
    this.montaForm();
    this.authService.showMenu = false;
  }

  get f(): any {
    return this.form.controls;
  }

  montaForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) {
      this.toasrt.warning('Preencha todas as Informações');
      return;
    }

    this.authService.login(this.email, this.senha);
    this.email = '';
    this.senha = '';
    this.authService.showMenu = true;
  }

  loginGoogle() {
    this.authService
      .loginGoogle()
      .then((res) => {
        this.router.navigate(['/character-list']);
        this.authService.showMenu = true;
      })
      .catch((err) => console.log('err', err.message));
  }
}
