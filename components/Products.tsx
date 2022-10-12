/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { InventoryItem } from "types/types";
import Link from "next/link";
import {
  formatAmountFromStripe,
  formatAmountForDisplay,
} from "utils/stripe-helpers";

const products = [
  {
    id: 1,
    name: "Focus Paper Refill",
    href: "/product/1",
    price: "$13",
    description: "3 sizes available",
    imageSrc: "/images/shirt-fur-big-front2.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 2,
    name: "Focus Card Holder",
    href: "/product/2",
    price: "$64",
    description: "Walnut",
    imageSrc: "/images/shirt-squares-front2.jpg",
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 3,
    name: "Focus Carry Case",
    href: "#",
    price: "$32",
    description: "Heather Gray",
    imageSrc: "/images/topanga-boots.jpg",
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
  },
];

interface ProductsProps {
  inventory: InventoryItem[];
}

const Products: React.FC<ProductsProps> = ({ inventory }) => {
  const products = inventory.map((item) => {
    return {
      id: item.priceId,
      name: item.name,
      href: `/product/${item.id}`,
      price: formatAmountForDisplay(
        formatAmountFromStripe(item.price as number, "usd"),
        "usd"
      ),
      description: item.description,
      imageSrc: item.images[0],
      imageAlt: `${item.name} product`,
    };
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} href={product.href}>
              <a className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                  {product.description}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
