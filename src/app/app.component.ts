import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { GetPokemonsService } from '../app/services/get-pokemons.service'
import { CdkVirtualScrollViewport, ScrollDispatcher } from "@angular/cdk/scrolling";
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  virtualScroll!: CdkVirtualScrollViewport;




  title = 'prueba-cuscatlan';
  pokes = <any>[];

  items = <string[]>[];
  pokes1 = <any[]>[];
  next = '';
  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
    type: ''
  });
  selected = 'option2';
  oppoSuits: any = ['electric', 'grass'];
  pagination = false;
  detail = null;





  constructor(private pokemons: GetPokemonsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private scrollDispatcher: ScrollDispatcher) { }





  ngOnInit() {
    this.getInitialData('https://pokeapi.co/api/v2/pokemon/');
  }

  ngAfterViewInit() { }

  onSubmit(): void {
    // Process checkout data here

    console.warn('Your order has been submitted', this.checkoutForm.value);
    //this.checkoutForm.reset();
  }

  onClick() {
    this.pokes = [];
  }

  onKey(value: string) {
    console.log(value)




    this.pokemons.getPokemon('https://pokeapi.co/api/v2/pokemon/' + value).subscribe(res => {
      console.log('here', res);
      //this.pokes = <any>[];
      if (Object.keys(res).length === 0) {
        this.pokes = [];
      } else if (value === "") {
        this.pokes = [];
        this.getInitialData('https://pokeapi.co/api/v2/pokemon/');
      } else {
        this.pokes = [...this.pokes, res];
      }


    })
  }

  applyFilter(filterby: String) {
    console.log('filter by', filterby);

    if (filterby == 'No selection') {
      this.pagination = false;
      this.pokes = [];
      this.getInitialData('https://pokeapi.co/api/v2/pokemon/');

      return;
    }

    this.pagination = true;

    let filter = <any>[];
    filter = [...filter, this.pokes]
    console.log('filter', filter);

    let newArray = <any>[];
    delete this.pokes;
    filter[0].forEach((el: any) => {
      el.types.forEach((ele: any) => {
        if (ele.type.name == filterby) {
          newArray.push(el);
          //newArray = [...newArray, el];
          //this.pokes = [...this.pokes, el];
        }
      });
    });

    this.pokes = newArray;
    //console.log('new', newArray);

  }

  nextBatch(currIndex: number) {
    const start = this.virtualScroll.getRenderedRange().start;
    const end = this.virtualScroll.getRenderedRange().end;
    const total = this.virtualScroll.getDataLength();
    console.log(`end is ${end} total is ${total}`)
    if (end == total && this.next !== '' && !this.pagination) {
      console.log("end reached increase page no")
      this.getInitialData(this.next);
    }
  }


  getInitialData(url: string) {
    console.log('hello');
    // this.pokemons.getPokemons();
    this.pokemons.getList(url).subscribe(resp => {
      const config = { ...resp };
      console.log('resp 2', config)
      // console.log('config', config[0]);
      //this.items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
      let temp: any[] = [];
      temp = [...temp, resp];

      this.next = temp[0].next;


      console.log('next', this.next);
      temp[0].results.forEach((poke: any) => {
        this.pokemons.getPokemon(poke.url).subscribe((res: any) => {
          //this.pokes.push(res);
          if (res.order === 1) {
            res.selected = true;
          } else {
            res.selected = false;
          }

          //console.log('here');
          this.pokes = [...this.pokes, res];

          //temp = [...temp, res];
          this.pokes.sort((a: any, b: any) => parseFloat(a.order) - parseFloat(b.order));

        })
      })


      //this.pokes = temp;
      //this.pokes = {...temp}  ;

      console.log('pokes', this.pokes);

    });
  }


  onNotify(pokemon: any) {

    var temp: any = [];
    temp = [...temp, this.pokes]
    this.pokes = <any>[];

    for (let i = 0; i < temp[0].length; i++) {
      if (temp[0][i].name == pokemon.name) {
        temp[0][i].selected = true;
      } else {
        temp[0][i].selected = false;
      }
    }

    this.pokes = temp[0]


    

    

    

    
    



    //items.push(newItem);
    //this.pokes.next(items)
    //setTimeout(() => {

    //this.pokes = temp[0]  
    //});



    this.detail = pokemon;



    console.log('You will be notified when the product goes on sale', pokemon);
  }

}
