import type { NextPage } from "next";
import Head from "next/head";
import Hero from "components/Hero";
import { InventoryItem } from "types/types";
import Layout from "components/Layout";
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
