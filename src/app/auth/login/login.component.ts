import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.loginForm = new FormGroup({
      viewingKey: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
  }



}
