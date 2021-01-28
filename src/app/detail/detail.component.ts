import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DetailComponent implements OnInit {

  @Input() detail: any;
  constructor() { }

  ngOnInit(): void {
  }

}
