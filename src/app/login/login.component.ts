import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginInvalid: boolean;
  hide:Boolean;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginInvalid  = false;
    this.hide = true;
    localStorage.removeItem('token');
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  validate(): void {
    const creds = this.loginForm.value;
    this.loginService.login(creds.username, creds.password)
    .subscribe(resp => {
      console.log(resp);
      if(!resp || !resp.success) {
        this.loginInvalid = true;
      }
      else {
        localStorage.setItem('token', resp.token.toString());
        localStorage.setItem('refreshToken', resp.refreshToken.toString());
        this.router.navigate(['/home']);
      }
    })
  }

}
