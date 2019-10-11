import {Component, OnInit} from '@angular/core';
import * as Enumerable from 'linq';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    // http://neue.cc/reference.htm
    // npm install linq

    const elements = [10, 20, 30, 40];

    console.log('-------------------------- 1 -----------------------');
    const elements2 = Enumerable
      .from(elements)
      .where(e => e > 20)
      .select(e => e * 100)
      .toArray();
    console.log(elements2);

    console.log('-------------------------- 2 -----------------------');
    const elements3 = Enumerable
      .from(elements)
      .where(e => e > 20)
      .select((e, idx) => ({index: idx, value: e}))
      .toArray();
    console.log(elements3);

    console.log('-------------------------- 3 -----------------------');
    const people = [
      { name: 'Adam', country: {name: 'Poland', capital: 'Warsaw'} },
      { name: 'Thomas', country: {name: 'Germany', capital: 'Berlin'} },
      { name: 'John', country: {name: 'UK', capital: 'London'} },
      { name: 'Louis', country: {name: 'France', capital: 'Paris'} },
      { name: 'Fabien', country: {name: 'France', capital: 'Paris'} }
    ];

    const elements4 = Enumerable
      .from(people)
      // .orderBy(p => p.country.name)
      .orderByDescending(p => p.country.name)
      .thenBy(p => p.name)
      .toArray();
    console.log(elements4);

    console.log('-------------------------- 4 -----------------------');
    // grupowanie
    const products = [
      {name: 'Pralka', category: 'AGD', price: 200},
      {name: 'Suszarka', category: 'AGD', price: 100},
      {name: 'Buty', category: 'SPORT', price: 300},
      {name: 'Spodenki', category: 'SPORT', price: 400},
      {name: 'Banan', category: 'FOOD', price: 260}
    ];

    const elements5 = Enumerable
      .from(products)
      .groupBy(p => p.category)
      .select(res => `${res.key()}...${res.toArray().map(p => p.name).join(',')}`)
      .toArray();
    console.log(elements5);

    console.log('-------------------------- 5 -----------------------');
    // partycjonowanie
    const elements6 = Enumerable
      .from(products)
      .partitionBy(p => p.price > 200)
      .select(res => `${res.key()}...${res.toArray().map(p => p.name).join(',')}`)
      .toArray();
    console.log(elements6);

    console.log('-------------------------- 6 -----------------------');
    const prices = [200.5, 120.5, 320.4, 11.56, 43.6, 76.5, 89.7];

    console.log(Enumerable.from(prices).aggregate((p1, p2) => p1 * p2));
    console.log(Enumerable.from(prices).max());
    console.log(Enumerable.from(prices).sum());
    console.log(Enumerable.from(prices).average());

    // paginacja
    console.log(Enumerable.from(prices).skip(3).take(3).toArray());
  }
}
