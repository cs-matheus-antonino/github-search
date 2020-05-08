import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  form;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      userName: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService.searchUserByUserName(this.form.value.userName);
  }
}
