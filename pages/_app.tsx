import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "use-shopping-cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
      currency="USD"
    >
      <Component {...pageProps} />
    </CartProvider>
  );
}
export default MyApp;
