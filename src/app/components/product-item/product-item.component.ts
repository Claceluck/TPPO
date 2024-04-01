import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Item from 'src/app/models/item';
import Product from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = new Product();
  @Output() added = new EventEmitter();

  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  quantity: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  addItem(product: Product): void {
    this.added.emit(new Item(product, this.quantity));
    alert(`${product.name} added.`);
  }
}
