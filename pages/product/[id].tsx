/** Upload photos to: https://furbabyrocks.imgur.com/ */

import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import {
  formatAmountFromStripe,
  formatAmountForDisplay,
} from "utils/stripe-helpers";
import { GetServerSideProps } from "next";
import { InventoryItem } from "types/types";
import Layout from "components/Layout";
import Nav from "components/nav/Nav";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
import { buildPriceProductInventory } from "lib/build-price-product-inventory";
import { useState } from "react";

const policies = [
  {
    name: "International delivery",
    icon: GlobeAmericasIcon,
    description: "Get your order in 2-3 weeks",
  },
  {
    name: "Support Local Art",
    icon: CurrencyDollarIcon,
    description: "We appreciate your purchase!",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface ProductPageProps {
  inventoryItem: InventoryItem;
}

const ProductPage: React.FC<ProductPageProps> = ({ inventoryItem }) => {
  const { addItem } = useShoppingCart();

  const product = {
    name: inventoryItem.name,
    price: formatAmountForDisplay(
      formatAmountFromStripe(inventoryItem.price as number, "usd"),
      "usd"
    ),
    rating: 3.9,
    reviewCount: 512,
    href: "#",
    breadcrumbs: [{ id: 1, name: "All Products", href: "#" }],
    images: inventoryItem.images.map((image, i) => ({
      id: i + 1,
      imageSrc: inventoryItem?.images[i],
      imageAlt: `${inventoryItem.name} item front`,
      primary: i === 0 ? true : false,
    })),
    colors: [
      { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
    ],
    sizes: [
      { name: "XS", inStock: inventoryItem.metadata.shirt?.includes("xs") },
      { name: "S", inStock: inventoryItem.metadata.shirt?.includes("s") },
      { name: "M", inStock: inventoryItem.metadata.shirt?.includes("m") },
      { name: "L", inStock: inventoryItem.metadata.shirt?.includes("l") },
      { name: "XL", inStock: inventoryItem.metadata.shirt?.includes("xl") },
      { name: "XXL", inStock: inventoryItem.metadata.shirt?.includes("xxl") },
    ],
    description: inventoryItem.description,
    details: [
      "Only the best materials",
      "Ethically and locally made in our Rogers Park shop",
      "Pre-washed and pre-shrunk",
      "Machine wash cold with similar colors",
    ],
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  const handleAddItemClick = () => {
    addItem({
      currency: "usd",
      name: inventoryItem.name,
      id: inventoryItem.priceId,
      price: inventoryItem.price as number,
      product_data: {
        productId: inventoryItem.id,
        productImage: inventoryItem.images[0],
        shirtSize: selectedSize.name,
      },
    });
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="pt-6 pb-16 sm:pb-24">
          <Nav />
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10"
          >
            <ol role="list" className="flex items-center space-x-4">
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-4 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      viewBox="0 0 6 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-5 w-auto text-gray-300"
                    >
                      <path
                        d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>

          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
                {/* Reviews */}
                {/* <div className="mt-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-700">
                      {product.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                    <div className="ml-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div
                      aria-hidden="true"
                      className="ml-4 text-sm text-gray-300"
                    >
                      ·
                    </div>
                    <div className="ml-4 flex">
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        See all {product.reviewCount} reviews
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  {product.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.imageSrc}
                      alt={image.imageAlt}
                      className={classNames(
                        image.primary
                          ? "lg:col-span-2 lg:row-span-2"
                          : "hidden lg:block",
                        "rounded-lg"
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-8 lg:col-span-5">
                <form>
                  {inventoryItem.metadata?.shirt && (
                    <>
                      {/* Color picker */}
                      <div>
                        <h2 className="text-sm font-medium text-gray-900">
                          Color
                        </h2>
                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className="mt-2"
                        >
                          <RadioGroup.Label className="sr-only">
                            {" "}
                            Choose a color{" "}
                          </RadioGroup.Label>
                          <div className="flex items-center space-x-3">
                            {product.colors.map((color) => (
                              <RadioGroup.Option
                                key={color.name}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    color.selectedColor,
                                    active && checked
                                      ? "ring ring-offset-1"
                                      : "",
                                    !active && checked ? "ring-2" : "",
                                    "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                  )
                                }
                              >
                                <RadioGroup.Label as="span" className="sr-only">
                                  {" "}
                                  {color.name}{" "}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    color.bgColor,
                                    "h-8 w-8 border border-black border-opacity-10 rounded-full"
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      {/* Size picker */}
                      <div className="mt-8">
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-medium text-gray-900">
                            Size
                          </h2>
                          <a
                            href="#"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            See sizing chart
                          </a>
                        </div>
                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-2"
                        >
                          <RadioGroup.Label className="sr-only">
                            {" "}
                            Choose a size{" "}
                          </RadioGroup.Label>
                          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                            {product.sizes.map((size) => (
                              <RadioGroup.Option
                                key={size.name}
                                value={size}
                                className={({ active, checked }) =>
                                  classNames(
                                    size.inStock
                                      ? "cursor-pointer focus:outline-none"
                                      : "opacity-25 cursor-not-allowed",
                                    active
                                      ? "ring-2 ring-offset-2 ring-indigo-500"
                                      : "",
                                    checked
                                      ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                                      : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                    "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                                  )
                                }
                                disabled={!size.inStock}
                              >
                                <RadioGroup.Label as="span">
                                  {size.name}
                                </RadioGroup.Label>
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </>
                  )}

                  <button
                    onClick={handleAddItemClick}
                    type="button"
                    className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </form>
                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Description
                  </h2>
                  <div
                    className="prose prose-sm mt-4 text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: product.description as string,
                    }}
                  />
                </div>

                {inventoryItem.metadata?.shirt && (
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-900">
                      Fabric &amp; Care
                    </h2>
                    <div className="prose prose-sm mt-4 text-gray-500">
                      <ul role="list">
                        {product.details.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Policies */}
                <section aria-labelledby="policies-heading" className="mt-10">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>
                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {policies.map((policy) => (
                      <div
                        key={policy.name}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                      >
                        <dt>
                          <policy.icon
                            className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="mt-4 text-sm font-medium text-gray-900">
                            {policy.name}
                          </span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">
                          {policy.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-08-01",
  });

  if (!params?.id) return { props: {} };

  const product = await stripe.products.retrieve(params.id as string);
  const price = await stripe.prices.retrieve(product.default_price as string);
  const inventoryItems = buildPriceProductInventory([price], [product]);

  return {
    props: { inventoryItem: inventoryItems[0] },
  };
};

export default ProductPage;
