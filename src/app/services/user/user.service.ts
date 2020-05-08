import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/models/repository.model';
import { User } from 'src/app/models/user.model';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<User> = new BehaviorSubject(undefined);

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  private _getUserByUserName(userName: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/${userName}`).pipe(
      map((obj) => obj),
      catchError(() =>
        this.snackbarService.showMessageError('Erro ao carregar usuário!')
      )
    );
  }

  private _getReposByUserName(userName: string): Observable<Repository[]> {
    return this.http
      .get<Repository[]>(`${environment.API_URL}/${userName}/repos`)
      .pipe(
        map((obj) => obj),
        catchError(() =>
          this.snackbarService.showMessageError(
            'Erro ao carregar repositórios!'
          )
        )
      );
  }
}
