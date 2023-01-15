import productDatabase from "@data/product-database";
import NextImage from "next/image";
import React, { useEffect, useState } from "react";
import Box from "../Box";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import ProductCard1 from "../product-cards/ProductCard1";
import StyledProductCategory from "./ProductCategoryStyle";
import axios from "axios";
import { random } from "lodash";
import TextField from "../text-field/TextField";

const Section6: React.FC = () => {
  const [selected, setSelected] = useState("");
  const [allProduct, setAllProducts] = useState([]);
  const [products, setProducts] = useState({
    loading: false,
    data: null,
    error: false
  });

  const [category, setCategory] = useState({
    loading: false,
    data: null,
    error: false
  });

  const handleCategoryClick = (brand) => () => {
    setSelected(brand);
    if (selected != brand) {
      setSelected(brand);
      if (brand === "all") {
        setProducts({
          loading: false,
          data: allProduct,
          error: false
        });
        return;
      } else {
        setProducts({
          loading: false,
          data: allProduct.filter((item) => item.categoria === brand),
          error: false
        });
      }
    }
  };

  const handleCategorySearch = (event) => {

    const value = event.target.value.toUpperCase();

    setProducts({
      loading: false,
      data: allProduct.filter((item) => item.nome.toUpperCase().indexOf(value) > -1),
      error: false
    });

  };

  useEffect(() => {
    setProducts({
      loading: true,
      data: null,
      error: false
    });

    setCategory({
      loading: true,
      data: null,
      error: false
    });

    axios.get("http://localhost:8000/api/v1/products")
      .then(response => {
        setAllProducts(response.data);
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

    axios.get("http://localhost:8000/api/v1/category")
      .then(response => {
        setCategory({
          loading: false,
          data: Object.values(response.data),
          error: false
        });
      })
      .catch(() => {
        setCategory({
          loading: false,
          data: null,
          error: true
        });
      });

  }, []);

  let content = null;
  let categoryList = null;

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
    content = products.data.slice(0, 120).map((item, ind) => (
      <Grid item lg={4} sm={6} xs={12} key={ind}>
        <ProductCard1 hoverEffect
          id={item.id}
          imgUrl={item.imagem}
          title={item.nome}
          rating={random(1, 5)}
          price={item.preco}
          off={0}

        />
      </Grid>
    ))
  }

  if (category.data) {
    categoryList = category.data.slice(0, 120).map((item, ind) => (
      <StyledProductCategory
        key={item}
        id={item}
        mb="0.75rem"
        bg={selected.match(item) ? "white" : "gray.100"}
        shadow={selected.match(item) ? 4 : null}
        onClick={handleCategoryClick(item)}
      >
        <NextImage
          width={20}
          height={20}
          layout="fixed"
          objectFit="contain"
          src={`/assets/images/logos/${ind % 2 === 0 ? "v" : "u"}.png`}
          alt="apple"
        />
        <span className="product-category-title">{item}</span>
      </StyledProductCategory>
    ))
  }


  return (
    <Container mb="80px">
      <FlexBox>
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="white">
            <TextField
              mb="0.75rem"
              name="email"
              placeholder="Refined Plastic Bike"
              label="Search"
              type="text"
              fullwidth
              onKeyUp={handleCategorySearch}
            />
            {
              categoryList
            }

            <StyledProductCategory
              id="all"
              mt="4rem"
              bg={selected.match("all") ? "white" : "gray.100"}
              shadow={selected.match("all") ? 4 : null}
              onClick={handleCategoryClick}
            >
              <span id="all" className="product-category-title show-all">
                View All Brands
              </span>
            </StyledProductCategory>
          </Box>
        </Hidden>

        <Box flex="1 1 0" minWidth="0px">
          <CategorySectionHeader title="Cars" seeMoreLink="#" />
          <Grid container spacing={6}>
            {content}
          </Grid>
        </Box>
      </FlexBox>
    </Container>
  );
};

const brandList = ["zerrari", "fesla", "btw", "boyota", "gini", "lord"];

export default Section6;
