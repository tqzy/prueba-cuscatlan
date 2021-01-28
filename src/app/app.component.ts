import { Component, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { GetPokemonsService } from '../app/services/get-pokemons.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormBuilder } from '@angular/forms';

/* tslint:disable use-lifecycle-interface */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  virtualScroll!: CdkVirtualScrollViewport;

  endpoint = 'https://pokeapi.co/api/v2/pokemon/';
  pokes = [] as any;
  next = '';
  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
    type: ''
  });
  oppoSuits: any = ['electric', 'grass'];
  pagination = false;
  detail = null;


  constructor(private pokemons: GetPokemonsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getInitialData(this.endpoint);
  }

  onKey(value: string): void {
    this.pokemons.getPokemon(this.endpoint + value.toLocaleLowerCase()).subscribe(res => {
      if (Object.keys(res).length === 0) {
        this.pokes = [];
      } else if (value === '') {
        this.pokes = [];
        this.getInitialData(this.endpoint);
      } else {
        this.pokes = [...this.pokes, res];
      }
    });
  }

  applyFilter(filterby: string): void {
    if (filterby === 'No selection') {
      this.pagination = false;
      this.pokes = [];
      this.getInitialData(this.endpoint);
      return;
    }

    this.pagination = true;

    let filter = [] as any;
    filter = [...filter, this.pokes];
    console.log('filter', filter);

    const newArray = [] as any;
    delete this.pokes;
    filter[0].forEach((el: any) => {
      el.types.forEach((ele: any) => {
        if (ele.type.name === filterby) {
          newArray.push(el);
          // newArray = [...newArray, el];
          // this.pokes = [...this.pokes, el];
        }
      });
    });

    this.pokes = newArray;
    // console.log('new', newArray);

  }

  nextBatch(currIndex: number): void {
    const start = this.virtualScroll.getRenderedRange().start;
    const end = this.virtualScroll.getRenderedRange().end;
    const total = this.virtualScroll.getDataLength();
    console.log(`end is ${end} total is ${total}`);
    if (end === total && this.next !== '' && !this.pagination) {
      console.log('end reached increase page no');
      this.getInitialData(this.next);
    }
  }


  getInitialData(url: string): void {
    this.pokemons.getList(url).subscribe(resp => {
      const config = { ...resp };
      let temp: any[] = [];
      temp = [...temp, resp];
      this.next = temp[0].next;

      temp[0].results.forEach((poke: any) => {
        this.pokemons.getPokemon(poke.url).subscribe((res: any) => {
          // this.pokes.push(res);
          if (res.order === 1) {
            res.selected = true;
            this.detail = res;
          } else {
            res.selected = false;
          }
          this.pokes = [...this.pokes, res];
          this.pokes.sort((a: any, b: any) => parseFloat(a.order) - parseFloat(b.order));

        });
      });
      console.log('pokes', this.pokes);
    });
  }


  onNotify(pokemon: any): void {

    // for (let i = 0; i < this.pokes.length; i++) {
    //   if (this.pokes[i].name === pokemon.name) {
    //     this.pokes[i].selected = true;
    //   } else {
    //     this.pokes[i].selected = false;
    //   }
    // }

    for (const row of this.pokes) {
      if (row.name === pokemon.name) {
        row.selected = true;
      } else {
        row.selected = false;
      }
    }

    this.detail = pokemon;
  }

}
