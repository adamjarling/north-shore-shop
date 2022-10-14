import { CartEntry } from "use-shopping-cart/core";
import Stripe from "stripe";

export type StripeCheckoutResponse = Stripe.Checkout.Session;
export type StripeCheckoutShippingDetails =
  Stripe.Checkout.Session.ShippingDetails;

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface CartEntryWithMetadata extends CartEntry {
  product_data?: {
    productId?: string;
    productImage?: string;
    shirtSize?: string;
  };
}

export interface InventoryItem {
  id: string;
  active: boolean;
  currency: string;
  description: string | null;
  images: Array<string>;
  metadata?: ProductMetadata;
  name: string;
  price: number | null;
  priceId: string;
  tax_code: string | null | Stripe.TaxCode;
  type: string;
  url?: string | null;
}

export type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;

export type Refund = Stripe.Refund;

export type Price = Stripe.Price;

export type Product = Stripe.Product;

export interface ProductMetadata {
  productId: string;
  productImage: string;
  shirt?: string[];
}

export type ShippingRate = Stripe.ShippingRate;
