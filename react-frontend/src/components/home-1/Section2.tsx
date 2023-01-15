import Box from "@component/Box";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard1 from "../product-cards/ProductCard1";
import axios from "axios";
import { random } from "lodash";

const Section2: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);


  const [products, setProducts] = useState({
    loading: false,
    data: null,
    error: false
  });

  useEffect(() => {
    setProducts({
      loading: true,
      data: null,
      error: false
    });

    axios.get("http://localhost:8000/api/v1/products")
      .then(response => {
        setProducts({
          loading: false,
          data: response.data,
          error: false
        });
      })
      .catch(() => {
        setProducts({
          loading: false,
          data: null,
          error: true
        });
      });

  }, []);

  let content = null;

  if (products.error) {
    content = <p>
      There was an error please refresh or try again later.
    </p>
  }

  if (products.loading) {
    content = <p>
      Loading...
    </p>
  }

  if (products.data) {
    content = products.data.map((product, key) => ((
      <Box py="0.25rem" key={key}>
        <ProductCard1
          id={key}
          imgUrl={product.imagem}
          title={product.nome}
          rating={random(1, 5)}
          price={product.preco}
          off={0}
          key={key}
        />
      </Box>
    )))
  }


  return (
    <CategorySectionCreator
      iconName="light"
      title="Flash Deals"
      seeMoreLink="#"
    >
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel totalSlides={10} visibleSlides={visibleSlides}>
          {content}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

const productList = [
  {
    imgUrl: "/assets/images/products/flash-1.png",
  },
  {
    imgUrl: "/assets/images/products/flash-2.png",
  },
  {
    imgUrl: "/assets/images/products/flash-3.png",
  },
  {
    imgUrl: "/assets/images/products/flash-4.png",
  },
  {
    imgUrl: "/assets/images/products/flash-1.png",
  },
  {
    imgUrl: "/assets/images/products/flash-2.png",
  },
  {
    imgUrl: "/assets/images/products/flash-3.png",
  },
  {
    imgUrl: "/assets/images/products/flash-4.png",
  },
  {
    imgUrl: "/assets/images/products/flash-1.png",
  },
  {
    imgUrl: "/assets/images/products/flash-2.png",
  },
];

export default Section2;
