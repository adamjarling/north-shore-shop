import { CartEntryWithMetadata, LineItem } from "types/types";
import { NextApiRequest, NextApiResponse } from "next";

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */

type ObjectLiteral =
  | {
      [key: string]: never;
    }
  | {
      [key: string]: string;
    };

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("req.body", req.body);
    const { cartDetails, shippingRate } = req.body;

    try {
      const cartDetailsArray: Array<CartEntryWithMetadata> = Object.keys(
        cartDetails
      ).map((key) => cartDetails[key]);

      const line_items: Array<LineItem> = cartDetailsArray.map((item) => ({
        price: item.id,
        quantity: item.quantity,
      }));

      const metadata: ObjectLiteral = {};
      cartDetailsArray.forEach((item) => {
        const shirtSize = item.product_data?.shirtSize;
        const productId = item.product_data?.productId;
        if (shirtSize && productId) {
          // @ts-ignore
          metadata[productId] = item.product_data?.shirtSize;
        }
      });
      console.log("metadata", metadata);

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        automatic_tax: { enabled: true },
        metadata,
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        shipping_options: [
          {
            shipping_rate: shippingRate.id,
          },
        ],
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        mode: "payment",
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      console.log(err);
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
