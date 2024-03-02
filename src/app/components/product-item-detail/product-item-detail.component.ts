import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Item from 'src/app/models/item';
import Product from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  id: number = 0;
  product: Product = new Product();
  quantity: number = 1;
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  constructor(private productService: ProductService, private cartService: CartService,
    private activeRouter: ActivatedRoute) {
    this.activeRouter.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'))
    })
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.product = data.find(p => {
        return p.id === this.id
      }) as Product;
    });
  }

  addItem(product: Product) {
    this.cartService.addItem(new Item(product, this.quantity))
    alert(`${product.name} added.`);
  }

}
