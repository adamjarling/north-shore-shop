import CheckoutForm from "components/CheckoutForm";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import nssRed from "../public/images/north-shore-shop-logo.png";

const Home: NextPage = () => {
  return (
    <div className="h-screen font-mono">
      <Head>
        <title>North Shore Shop - Art and Music Store</title>
        <meta name="description" content="North Shore Shop record label" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>

      <main>
        <div className="container mx-auto">
          <Image src={nssRed} alt="The North Shore Shop" />
          <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Image
                src="/images/shirt-fur-big-front2.jpg"
                width="1600"
                height="2464"
                alt="Furbaby squares T Shirt front"
              />
              <button>Buy Now</button>
              <CheckoutForm />
            </div>
            <div>
              <Image
                src="/images/shirt-squares-front.jpg"
                width="1600"
                height="2464"
                alt="Furbaby squares T Shirt front"
              />
            </div>
          </section>
        </div>
      </main>

      <footer className="container mx-auto text-center">
        North Shore Shop &copy; 2022
      </footer>
    </div>
  );
};

export default Home;
