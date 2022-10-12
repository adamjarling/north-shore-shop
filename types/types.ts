import Stripe from "stripe";

export type StripeCheckoutResponse = Stripe.Checkout.Session;
export type StripeCheckoutShippingDetails =
  Stripe.Checkout.Session.ShippingDetails;

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface InventoryItem {
  id: string;
  active: boolean;
  currency: string;
  description: string | null;
  images: Array<string>;
  metadata: ProductMetadata;
  name: string;
  price: number | null;
  priceId: string;
  tax_code: string | null | Stripe.TaxCode;
  type: string;
  url?: string | null;
}

export type LineItem = Stripe.LineItem;

export type Refund = Stripe.Refund;

export type Price = Stripe.Price;

export type Product = Stripe.Product;

export interface ProductMetadata {
  event_id?: string | number;
  processing_fee?: number;
  shirt?: string[];
  venue_id?: number;
}

export type ShippingRate = Stripe.ShippingRate;
