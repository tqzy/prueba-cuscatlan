import { TestBed } from '@angular/core/testing';

import { GetPokemonsService } from './get-pokemons.service';

describe('GetPokemonsService', () => {
  let service: GetPokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
