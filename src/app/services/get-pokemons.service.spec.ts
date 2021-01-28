import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { GetPokemonsService } from './get-pokemons.service';

describe('GetPokemonsService', () => {
  let service: GetPokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetPokemonsService]
    });
    service = TestBed.inject(GetPokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
