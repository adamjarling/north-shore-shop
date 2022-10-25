import Masonry from "react-masonry-css";
import React from "react";

import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const breakpointColumnsObj = {
  default: 3,
  700: 2,
  500: 1,
};

const photos = [
  {
    src: "/images/screen-prints-fur2.jpg",
    alt: "Custom screen print - limited edition 30 signed",
    width: 1600,
    height: 2133,
    caption: `Custom screen print - limited edition 30 signed`,
  },
  {
    src: "/images/shirt-fur-big-front.jpg",
    alt: "Acid washed T Shirt",
    width: 1600,
    height: 2210,
    caption: `Acid washed T Shirt - 60s logo`,
  },
  {
    src: "/images/vinyl-cover-and-disc.jpg",
    alt: "Vinyl LP 150 gram - Hot Pink",
    width: 3024,
    height: 2187,
    caption: `Vinyl LP 150 gram - Hot Pink`,
  },
  {
    src: "/images/shirt-fur-logo.jpg",
    alt: "Acid washed T Shirt",
    width: 2466,
    height: 3338,
    caption: `Acid washed T Shirt - 60s logo`,
  },

  {
    src: "/images/vinyl-jacket.jpg",
    alt: "Vinyl LP 150 gram - Hot Pink",
    width: 2000,
    height: 1102,
    caption: `Vinyl LP 150 gram - Hot Pink`,
  },
  {
    src: "/images/shirt-squares-front-adam.jpg",
    alt: "Acid washed T Shirt",
    width: 1600,
    height: 2464,
    caption: `Acid washed T Shirt - 60s logo`,
  },
];

const PhotoGallery: React.FC = () => {
  return (
    <div className="relative">
      <Gallery withCaption>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo) => (
            <Item
              key={photo.src}
              original={photo.src}
              thumbnail={photo.src}
              width={photo.width}
              height={photo.height}
              caption={photo.caption || ""}
            >
              {({ ref, open }) => (
                <>
                  <img ref={ref} onClick={open} src={photo.src} />
                </>
              )}
            </Item>
          ))}
        </Masonry>
      </Gallery>
    </div>
  );
};

export default PhotoGallery;
