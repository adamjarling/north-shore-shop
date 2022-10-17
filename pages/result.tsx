import type { Product, StripeCheckoutResponse } from "types/types";
import Layout from "components/Layout";
import Link from "next/link";
import Nav from "components/nav/Nav";
import { GetServerSideProps, NextPage } from "next";
import Stripe from "stripe";
import { useRouter } from "next/router";
import PrintObject from "components/PrintObject";
import { fetchGetJSON } from "../utils/api-helpers";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { useEffect } from "react";
import useSWR from "swr";

interface ResultPageProps {
  allProducts: Product[];
}

const ResultPage: NextPage<ResultPageProps> = ({ allProducts }) => {
  const router = useRouter();
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []);

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR<StripeCheckoutResponse>(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  const payment_intent = data?.payment_intent as Stripe.PaymentIntent;
  const lineItems = data?.line_items?.data;
  const shippingDetails = data?.shipping_details;
  const billingDetails = data?.customer_details;
  const paymentMethodDetails =
    payment_intent?.charges?.data[0].payment_method_details;
  console.log("paymentMethodDetails", paymentMethodDetails);
  console.log("lineItems", lineItems);

  if (error) return <div>failed to load</div>;
  if (!payment_intent) return <p>...Loading</p>;

  const products = lineItems?.map((item) => {
    const product = allProducts.find((prod) => prod.id === item.price?.product);
    return {
      id: item.id,
      name: item.description,
      description: product?.description || "",
      href: `/product/${product?.id}`,
      quantity: item.quantity,
      price: formatCurrencyString({
        currency: "USD",
        value: item.amount_subtotal,
      }),
      imageSrc: product?.images[0],
      imageAlt: item.description,
    };
  });

  return (
    <Layout>
      <Nav />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-indigo-600">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            It&apos;s on the way!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Your order #{payment_intent.id} will be shipped and with you soon.
          </p>

          {/* <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Tracking number</dt>
            <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
          </dl> */}
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          {products &&
            products.map((product) => (
              <div
                key={product.id}
                className="flex space-x-6 border-b border-gray-200 py-10"
              >
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                />
                <div className="flex flex-auto flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <Link href={product.href}>
                        <a>{product.name}</a>
                      </Link>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-1 items-end">
                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {product.quantity}
                        </dd>
                      </div>
                      <div className="flex pl-4 sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">{product.price}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Addresses</h4>
            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Shipping address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{shippingDetails?.name}</span>
                    <span className="block">
                      {shippingDetails?.address?.line1}{" "}
                    </span>
                    {shippingDetails?.address?.line2 && (
                      <span className="block">
                        {shippingDetails?.address?.line2}{" "}
                      </span>
                    )}
                    <span className="block">
                      {shippingDetails?.address?.city},{" "}
                      {shippingDetails?.address?.country}{" "}
                      {shippingDetails?.address?.postal_code}
                    </span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{billingDetails?.name}</span>
                    <span className="block">
                      {billingDetails?.address?.line1}
                    </span>
                    {billingDetails?.address?.line2 && (
                      <span className="block">
                        {billingDetails?.address?.line2}
                      </span>
                    )}
                    <span className="block">
                      {billingDetails?.address?.city},{" "}
                      {billingDetails?.address?.country}{" "}
                      {billingDetails?.address?.postal_code}
                    </span>
                  </address>
                </dd>
              </div>
            </dl>

            {/* <h4 className="sr-only">Payment</h4>
            <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Payment method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>Apple Pay</p>
                  <p>Mastercard</p>
                  <p>
                    <span aria-hidden="true">••••</span>
                    <span className="sr-only">Ending in </span>1545
                  </p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Shipping method</dt>
                <dd className="mt-2 text-gray-700">
                  <p>DHL</p>
                  <p>Takes up to 3 working days</p>
                </dd>
              </div>
            </dl> */}

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">
                  {data &&
                    formatCurrencyString({
                      currency: "USD",
                      value: data?.amount_subtotal as number,
                    })}
                </dd>
              </div>
              {/* <div className="flex justify-between">
                <dt className="flex font-medium text-gray-900">
                  Discount
                  <span className="ml-2 rounded-full bg-gray-200 py-0.5 px-2 text-xs text-gray-600">
                    STUDENT50
                  </span>
                </dt>
                <dd className="text-gray-700">-$18.00 (50%)</dd>
              </div> */}
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Shipping</dt>
                <dd className="text-gray-700">
                  {data &&
                    formatCurrencyString({
                      currency: "USD",
                      value: data?.shipping_cost?.amount_total as number,
                    })}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">
                  {data &&
                    formatCurrencyString({
                      currency: "USD",
                      value: data?.amount_total as number,
                    })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* <h1>Checkout Payment Result</h1>
      <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
      <h3>CheckoutSession response:</h3>
      <div className="font-sans">
        <PrintObject content={data ?? "loading..."} />
      </div> */}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-08-01",
  });

  const products = await stripe.products.list({
    limit: 100,
  });

  return {
    props: { allProducts: products.data },
  };
};

export default ResultPage;
