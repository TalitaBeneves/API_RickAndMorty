import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('imageUser') inputImageUser!: ElementRef;
  @Input('imageUser') inputImageUserd!: ElementRef;

  email: string = '';
  senha: string = '';
  photo: string = '';
  form!: FormGroup;
  theme: any;
  siteKey: string = environment.siteKey;

  uploadPercent: Observable<any> | undefined;
  snapshot!: Observable<any>;
  urlImage!: Observable<string>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
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

  register() {
    if (this.form.invalid) {
      this.toasrt.warning('Preencha todas as Informações');
      return;
    }

    this.authService.register(this.email, this.senha, this.photo);
    this.email = '';
    this.senha = '';
    this.testee();
  }

  testee() {
    this.authService
      .register(this.email, this.senha, this.photo)
      .then((res) => {
        this.authService.isAuth().subscribe((user) => {
          if (user) {
            user
              ?.updateProfile({
                displayName: '',
                photoURL: this.inputImageUser.nativeElement.value,
              })
              .then(function () {

              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
      });
  }

  registerGoogle(): void {
    this.authService
      .loginGoogle()
      .then((res) => {
        this.router.navigate(['/login']);
      })
      .catch((err) => console.log('err', err.message));
  }

  upload(e: any) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }
  isAtivo(snapshot: any){
    return snapshot.state == 'running' && snapshot.bytesTrasferred < snapshot.totalBytes
  }
}
