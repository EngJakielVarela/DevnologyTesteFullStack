import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
import AvailableShops from "@component/products/AvailableShops";
import FrequentlyBought from "@component/products/FrequentlyBought";
import ProductDescription from "@component/products/ProductDescription";
import ProductIntro from "@component/products/ProductIntro";
import ProductReview from "@component/products/ProductReview";
import RelatedProducts from "@component/products/RelatedProducts";
import { H5 } from "@component/Typography";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";


const ProductDetails = () => {

  const router = useRouter();
  const routerId = router.query.id as string;
  const state = {
    title: "",
    price: 0,
  };

  const [products, setProducts] = useState({
    loading: false,
    data: {
      imgUrl: [''],
      title: "",
      price: 0,

    },
    error: false
  });

  useEffect(() => {
    setProducts({
      loading: true,
      data: {
        imgUrl: [],
        title: "",
        price: 0,
      },
      error: false
    });

    axios.get("http://localhost:8000/api/v1/products")
      .then(response => {
        const { data } = response;

        let product = data.filter(data => data.id === routerId)[0];

        setProducts({
          loading: false,
          data: {
            imgUrl: [product.imagem],
            title: product.nome,
            price: parseFloat(product.preco)
          },
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

  if (products.data) {

  }




  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => {
    setSelectedOption(opt);
  };

  return (
    <div>
      <ProductIntro {...products.data} />

      {/* <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H5
          className="cursor-pointer"
          mr="25px"
          p="4px 10px"
          color={
            selectedOption === "description" ? "primary.main" : "text.muted"
          }
          borderBottom={selectedOption === "description" && "2px solid"}
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
        >
          Description
        </H5>
        <H5
          className="cursor-pointer"
          p="4px 10px"
          color={selectedOption === "review" ? "primary.main" : "text.muted"}
          onClick={handleOptionClick("review")}
          borderBottom={selectedOption === "review" && "2px solid"}
          borderColor="primary.main"
        >
          Review (3)
        </H5>
      </FlexBox> */}

      {/* <Box mb="50px">
        {selectedOption === "description" && <ProductDescription />}
        {selectedOption === "review" && <ProductReview />}
      </Box> */}

      {/* <FrequentlyBought /> */}

      {/* <AvailableShops /> */}

      {/* <RelatedProducts /> */}
    </div>
  );
};

ProductDetails.layout = NavbarLayout;

export default ProductDetails;
