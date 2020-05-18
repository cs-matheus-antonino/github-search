import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string;
  form;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      userName: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.router.navigate(['/result'], {
      queryParams: { userName: this.form.value.userName },
    });
  }
}
