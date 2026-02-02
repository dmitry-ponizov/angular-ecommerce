import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = []

  totalPrice: Subject<number> = new Subject<number>()

  totalQuantity: Subject<number> = new Subject<number>()

  constructor() { }


  addToCardItem(theCardItem: CartItem) {
    let isExist: boolean = false
    let existingCardItem: CartItem | undefined = undefined;

    if(this.cartItems.length  > 0) {
      for(let cartItem of this.cartItems) {
        if(cartItem.id === theCardItem.id) {
          existingCardItem = cartItem
          isExist = true
          break
        }
      }

    }

    if(isExist) {
      existingCardItem!.quantity++
    } else {
      this.cartItems.push(theCardItem)
    }
    this.computeCartTotals()
  }

  computeCartTotals() {
    let totalPriceValue: number = 0
    let totalQuantityValue: number = 0

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue)
    this.totalQuantity.next(totalQuantityValue)

    this.logCartData(totalPriceValue, totalQuantityValue)
  }

  logCartData() {
    
  }
}
