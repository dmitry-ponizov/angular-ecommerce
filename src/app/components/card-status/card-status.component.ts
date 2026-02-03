import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { RouterLinkWithHref } from "@angular/router";

@Component({
    standalone: true,
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.css'],
  imports: [CurrencyPipe, RouterLinkWithHref]
})
export class CardStatusComponent implements OnInit {

  totalPrice: number = 0.00
  totalQuantity: number = 0
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus()
  }
  updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }
}
