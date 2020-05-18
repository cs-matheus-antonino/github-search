import { Component, OnInit, Input } from '@angular/core';
import { Repository } from 'src/app/models/repository.model';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.scss'],
})
export class RepositoryCardComponent implements OnInit {
  @Input() repo: Repository;
  constructor() {}

  ngOnInit(): void {}
}
