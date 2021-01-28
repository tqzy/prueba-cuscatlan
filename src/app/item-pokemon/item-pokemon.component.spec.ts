import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPokemonComponent } from './item-pokemon.component';

describe('ItemPokemonComponent', () => {
  let component: ItemPokemonComponent;
  let fixture: ComponentFixture<ItemPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
