import { InventoryItem, Price, Product } from "types/types";

export function buildPriceProductInventory(
  prices: Array<Price>,
  products: Array<Product>
) {
  const inventory: Array<InventoryItem> = [];

  products.forEach((product) => {
    const price = prices.find((price) => product.default_price === price.id);
    if (price) {
      /**
       * This code takes into account that we're storing shirt sizes in
       * Stripe as an array, which Stripe sends back to use as a stringified
       * array.  We parse it here to make easier to work with it's value
       * in the app.
       */
      let shirtString = product.metadata?.shirt;
      let shirtSizeArray = [];
      try {
        if (shirtString) {
          shirtSizeArray = JSON.parse(shirtString);
        }
      } catch (err) {
        console.error(
          "Error parsing shirt size in build-price-product-inventory"
        );
      }

      inventory.push({
        id: product.id,
        active: product.active,
        currency: price.currency,
        description: product.description,
        images: product.images,
        metadata: {
          ...product.metadata,
          shirt: shirtSizeArray.length > 0 ? shirtSizeArray : null,
        },
        name: product.name,
        price: price.unit_amount,
        priceId: price.id,
        tax_code: product.tax_code,
        type: price.type,
        url: product.url,
      });
    }
  });

  /**
   * Sort by price ascending
   */
  inventory.sort(function (a, b) {
    if (a.price && b.price) {
      return a.price - b.price;
    }
    return 0;
  });

  return inventory;
}
