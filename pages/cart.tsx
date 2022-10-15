import { useEffect, useState } from "react";
import {
  ArrowSmallLeftIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { GetServerSideProps, NextPage } from "next";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { CartEntryWithMetadata } from "types/types";
import Layout from "components/Layout";
import Link from "next/link";
import Nav from "components/nav/Nav";
import Stripe from "stripe";
import { fetchPostJSON } from "utils/api-helpers";

type RateOption = {
  id: string;
  amount: number;
  display_name: string;
};

interface CartPageProps {
  shippingRates: Array<RateOption>;
}

const CartPage: NextPage<CartPageProps> = ({ shippingRates }) => {
  const {
    cartCount,
    cartDetails,
    formattedTotalPrice,
    redirectToCheckout,
    removeItem,
    totalPrice,
    setItemQuantity,
  } = useShoppingCart();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shippingRate, setShippingRate] = useState<RateOption | null>(null);

  const cartItemsArray: Array<CartEntryWithMetadata> = cartDetails
    ? Object.keys(cartDetails).map((key) => cartDetails[key])
    : [];

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const response = await fetchPostJSON("/api/checkout_sessions/cart", {
      cartDetails,
      shippingRate,
    });

    if (response.statusCode > 399) {
      console.error(response.message);
      setErrorMessage(response.message);
      setLoading(false);
      return;
    }

    redirectToCheckout(response.id);
  };

  return (
    <Layout>
      <Nav />
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        {cartCount === 0 && (
          <p className="flex items-center justify-center p-20">
            Your cart is empty, load it up
          </p>
        )}

        {/* @ts-ignore */}
        {cartCount > 0 && (
          <form
            onSubmit={handleCheckout}
            className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
          >
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {cartItemsArray.map((item: CartEntryWithMetadata, itemIdx) => (
                  <li key={item.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product_data?.productImage}
                        alt={item.name}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/product/${item.product_data?.productId}`}
                              >
                                <a className="font-medium text-gray-700 hover:text-gray-800">
                                  {item.name}
                                </a>
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            {item.product_data?.shirtSize ? (
                              <p className=" text-gray-500">
                                {item.product_data.shirtSize}
                              </p>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {item.formattedPrice}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${itemIdx}`}
                            className="sr-only"
                          >
                            Quantity, {item.name}
                          </label>
                          <select
                            id={`quantity-${itemIdx}`}
                            name={`quantity-${itemIdx}`}
                            defaultValue={item.quantity}
                            onChange={(e) =>
                              setItemQuantity(item.id, parseInt(e.target.value))
                            }
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>

                          <div className="absolute top-0 right-0">
                            <button
                              onClick={() => removeItem(item.id)}
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIconMini
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />

                        <span>In stock</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <div className="lg:col-span-5">
              {/* Shipping Location */}
              <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 mt-16">
                {!shippingRate && (
                  <div className="flex items-center animate-bounce">
                    <h2
                      id="your-location"
                      className="text-lg font-medium text-gray-900"
                    >
                      Pick Your Location
                    </h2>
                    <ArrowSmallLeftIcon className="h-12 w-12 text-indigo-600 " />
                  </div>
                )}

                <fieldset>
                  <legend className="sr-only">Shipping Options</legend>
                  <div className="space-y-5">
                    {shippingRates.map((rate) => (
                      <div key={rate.id} className="relative flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id={rate.id}
                            aria-describedby={`${rate.id}-description`}
                            name="plan"
                            type="radio"
                            onChange={(e) =>
                              setShippingRate(JSON.parse(e.target.value))
                            }
                            value={JSON.stringify(rate)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor={rate.id}
                            className="font-medium text-gray-700"
                          >
                            {rate.display_name}
                          </label>
                          <span
                            id={`${rate.id}-description`}
                            className="text-gray-500 border-l-2 ml-2 pl-2"
                          >
                            {formatCurrencyString({
                              value: rate.amount,
                              currency: "USD",
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formattedTotalPrice}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex flex-col text-sm text-gray-600">
                      <span>Shipping estimate</span>
                      {/* <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a> */}
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {shippingRate?.amount &&
                        formatCurrencyString({
                          value: shippingRate?.amount,
                          currency: "USD",
                        })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Tax estimate</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">
                          Learn more about how tax is calculated
                        </span>
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">--</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {totalPrice &&
                        formatCurrencyString({
                          value:
                            totalPrice +
                            (shippingRate ? shippingRate?.amount : 0),
                          currency: "USD",
                        })}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={!shippingRate}
                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50"
                  >
                    Checkout
                  </button>
                </div>
              </section>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-08-01",
  });

  const shippingRatesData = await stripe.shippingRates.list({
    limit: 10,
    active: true,
  });

  const shippingRates = shippingRatesData.data.map((rate) => ({
    id: rate.id,
    amount: rate.fixed_amount?.amount,
    display_name: rate.display_name,
  }));

  return {
    props: { shippingRates: shippingRates },
  };
};

export default CartPage;
