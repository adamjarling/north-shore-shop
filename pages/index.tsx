import type { NextPage } from "next";
import Head from "next/head";
import Hero from "components/Hero";
import { InventoryItem } from "types/types";
import Layout from "components/Layout";
import PhotoGallery from "components/PhotoGallery";
import Products from "components/Products";
import Stripe from "stripe";
import { buildPriceProductInventory } from "lib/build-price-product-inventory";

interface HomeProps {
  inventory: InventoryItem[];
}

const Home: NextPage<HomeProps> = ({ inventory }) => {
  return (
    <div>
      <Head>
        <title>North Shore Shop - Art and Music Store</title>
        <meta name="description" content="North Shore Shop record label" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>

      <Layout>
        <Hero />
        <div className="container mx-auto">
          <Products inventory={inventory} />
          <div className="relative bg-indigo-800 mb-2">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="/images/screen-prints-fur2.jpg"
                alt=""
              />
              <div
                className="absolute inset-0 bg-indigo-800 mix-blend-multiply"
                aria-hidden="true"
              />
            </div>
            <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Photo Gallery
              </h2>
              <p className="mt-6 max-w-3xl text-xl text-indigo-100">
                Zoom in and check it out.
              </p>
            </div>
          </div>
          <PhotoGallery />
        </div>
      </Layout>
    </div>
  );
};

export async function getServerSideProps() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-08-01",
  });

  const prices = await stripe.prices.list({
    limit: 100,
  });

  const products = await stripe.products.list({
    limit: 100,
  });

  const inventory = buildPriceProductInventory(prices.data, products.data);

  return {
    props: { inventory },
  };
}

export default Home;
