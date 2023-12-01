import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      email: ["student@angular-university.io", [Validators.required]],
      password: ["password", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const val = this.form.value;

    this.auth.login(val.email, val.password).subscribe(
      (reply) => {
        localStorage.setItem("authJwtToken", reply.authJwtToken);

        this.router.navigateByUrl("/courses");
      },
      (err) => {
        console.log("Login failed: ", err);
        alert("Login failed.");
      }
    );
  }
}
