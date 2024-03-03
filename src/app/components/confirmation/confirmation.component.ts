import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  totalPrice: number = 0;
  fullName: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.totalPrice = this.cartService.calcTotal();
    this.fullName = this.cartService.getFullName();
  }
}
