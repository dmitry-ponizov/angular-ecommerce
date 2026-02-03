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


  addToCart(theCardItem: CartItem) {
    let existingCardItem: CartItem | undefined = undefined;

    if(this.cartItems.length  > 0) {
      existingCardItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCardItem.id)
    }

    if(existingCardItem) {
      existingCardItem.quantity++
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

  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--
    if(theCartItem.quantity === 0) {
      this.remove(theCartItem)
    } else {
      this.computeCartTotals()
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id)
    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1)
      this.computeCartTotals()
    }
  }

}
