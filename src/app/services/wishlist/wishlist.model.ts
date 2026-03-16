import { ApiProduct } from '../products/products.model';

export interface WishlisteableItem {
  isWishlisted: boolean;
  amount?: number;
}

export interface WishlistItem extends ApiProduct, WishlisteableItem {}

export interface Wishlist {
  items: WishlistItem[];
}
