import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-pokemon',
  templateUrl: './item-pokemon.component.html',
  styleUrls: ['./item-pokemon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemPokemonComponent implements OnInit {

  @Input() pokemon:any;
  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
