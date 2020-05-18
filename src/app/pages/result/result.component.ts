import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  user: User;
  userName: string;
  loading: boolean;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.getLoading().subscribe((flag) => (this.loading = flag));
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userService.searchUserByUserName(params.userName);
    });
    this.userService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
