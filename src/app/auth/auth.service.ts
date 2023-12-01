import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./model/user.model";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ authJwtToken: string }> {
    return this.http.post<{ authJwtToken: string }>("/api/login", {
      email,
      password,
    });
  }
}
