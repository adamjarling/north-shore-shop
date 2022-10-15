import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

const navigation = [
  { name: "Shop All Products", href: "/" },
  { name: "About", href: "/about" },
  { name: "Rogers Park Chicago", href: "/" },
];

export default function Nav() {
  const { cartCount } = useShoppingCart();

  return (
    <Popover>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <nav
          className="relative flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/">
                <a>
                  <span className="sr-only">North Shore Shop</span>
                  <img
                    className="h-16 w-auto"
                    src="/images/north-shore-shop-logo-black_smooth.png"
                    alt="North Shore Shop Logo"
                  />
                </a>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:space-x-10">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className="font-medium text-gray-500 hover:text-gray-900">
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
          {cartCount > 0 && (
            <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
              <span className="inline-flex rounded-md shadow">
                <Link href="/cart">
                  <a className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50">
                    My Cart
                    <ShoppingBagIcon
                      className="ml-2 h-6 w-6 flex-shrink-0 "
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium">
                      {cartCount}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </Link>
              </span>
              {/* Cart */}
              {/* <div className="ml-4 flow-root lg:ml-8 text-indigo-600">
              <Link href="/cart">
                <a className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 "
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium">{cartCount}</span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </Link>
            </div> */}
            </div>
          )}
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <img
                  className="h-8 w-auto"
                  src="/images/north-shore-shop-logo-black_smooth.png"
                  alt=""
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <a
              href="#"
              className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100"
            >
              Checkout
            </a>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
