import { Injectable } from '@angular/core';
import { Beer } from './beer.type';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  card: { [beerID: string]: number };
  
  constructor() {
    this.initCard();
  }

  add(beer: Beer) {
    this.card[beer.id] = 1;
    this.updateCard();
  }

  remove(beer: Beer) {
    delete this.card[beer.id];
    this.updateCard();
  }

  increment(beer: Beer) {
    this.card[beer.id]++;
    this.updateCard();
  }

  decrement(beer: Beer) {
    if (this.card[beer.id] > 1) {
      this.card[beer.id]--;
      this.updateCard();
    }
  }

  clear() {
    this.card = {};
    localStorage.removeItem(env.localStorageKey);
  }

  has(beer: Beer): boolean {
    return beer.id in this.card;
  }

  get totalItems() {
    return Object.values(this.card).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  }

  private updateCard(): void {
    localStorage.setItem(env.localStorageKey, JSON.stringify(this.card));
  }

  private initCard(): void {
    this.card = JSON.parse(localStorage.getItem(env.localStorageKey)) || {};
  }
}
