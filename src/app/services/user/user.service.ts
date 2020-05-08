import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/models/repository.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private _getUserByUserName(userName: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/${userName}`);
  }

  private _getReposByUserName(userName: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(
      `${environment.API_URL}/${userName}/repos`
    );
  }
}
