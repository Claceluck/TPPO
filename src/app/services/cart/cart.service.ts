import { Injectable } from '@angular/core';
import Item from 'src/app/models/item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Item[] = [];
  fullName: string = '';

  constructor() {}

  getItems(): Item[] {
    return this.items;
  }

  addItem(item: Item): Item[] {
    const i = this.items.findIndex((p) => p.product.name === item.product.name);
    if (i === -1) {
      this.items.push(item);
    } else {
      this.items[i].quantity =
        Number(this.items[i].quantity) + Number(item.quantity);
    }
    return this.items;
  }

  removeItem(item: Item): Item[] {
    const i = this.items.findIndex((p) => p.product.name === item.product.name);
    if (i !== -1) {
      this.items.splice(i, 1);
    }
    return this.items;
  }

  getFullName(): string {
    return this.fullName;
  }

  setFullName(name: string): void {
    this.fullName = name;
  }

  calcTotal(): number {
    let total = 0;
    this.items.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }

  resetCart(): Item[] {
    this.items = [];
    return this.items;
  }
}
