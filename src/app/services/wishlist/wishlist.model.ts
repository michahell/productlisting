import { ApiProduct } from '../products/products.model';

export interface WishlistItem extends ApiProduct {
  amount: number;
}

export interface Wishlist {
  items: WishlistItem[];
}
