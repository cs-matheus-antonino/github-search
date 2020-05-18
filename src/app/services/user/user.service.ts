import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Repository } from 'src/app/models/repository.model';
import { User } from 'src/app/models/user.model';
import { SnackbarService } from '../snackbar/snackbar.service';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User>(undefined);

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private loadingService: LoadingService
  ) {}

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  searchUserByUserName(userName: string): void {
    this.loadingService.showLoading();
    this.user.next(undefined);
    this._getUserByUserName(userName).subscribe((userResp) => {
      this._getReposByUserName(userName).subscribe((reposResp) => {
        userResp.repos = reposResp;
        this.user.next(userResp);
        this.loadingService.hideLoading();
      });
    });
  }

  private _getUserByUserName(userName: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/${userName}`).pipe(
      map((obj) => obj),
      catchError(() => {
        this.loadingService.hideLoading();
        return this.snackbarService.showMessageError(
          'Erro ao carregar usuário!'
        );
      })
    );
  }

  private _getReposByUserName(userName: string): Observable<Repository[]> {
    return this.http
      .get<Repository[]>(`${environment.API_URL}/${userName}/repos`)
      .pipe(
        map((obj) => obj),
        catchError(() => {
          this.loadingService.hideLoading();
          return this.snackbarService.showMessageError(
            'Erro ao carregar repositórios!'
          );
        })
      );
  }
}
