import Card from "@component/Card";
import { Span } from "@component/Typography";
import { debounce } from "lodash";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Box from "../Box";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import TextField from "../text-field/TextField";
import StyledSearchBox from "./SearchBoxStyle";
import axios from "axios";

export interface SearchBoxProps { }

const SearchBox: React.FC<SearchBoxProps> = () => {
  const [category, setCategory] = useState("All Categories");
  const [resultList, setResultList] = useState([]);

  const [categoryList, setCategoryList] = useState({
    loading: false,
    data: null,
    error: false
  });



  const handleCategoryChange = (cat) => () => {
    setCategory(cat);
    console.log(cat);
  };

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) setResultList([]);
    else setResultList(dummySearchResult);
  }, 200);

  const hanldeSearch = useCallback((event) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => {
    setResultList([]);
  };

  useEffect(() => {

    setCategoryList({
      loading: true,
      data: null,
      error: false
    });

    axios.get("http://localhost:8000/api/v1/category")
      .then(response => {
        setCategoryList({
          loading: false,
          data: Object.values(response.data),
          error: false
        });
      })
      .catch(() => {
        setCategoryList({
          loading: false,
          data: null,
          error: true
        });
      });

    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  let categoryLists = null;

  if (categoryList.data) {
    categoryLists = categoryList.data.slice(0, 120).map((item, ind) => (
      <MenuItem key={item} onClick={handleCategoryChange(item)}>
        {item}
      </MenuItem>
    ))
  }



  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>
        <TextField
          className="search-field"
          placeholder="Search and hit enter..."
          fullwidth
          onChange={hanldeSearch}
        />
        <Menu
          className="category-dropdown"
          direction="right"
          handler={
            <FlexBox className="dropdown-handler" alignItems="center">
              <span>{category}</span>
              <Icon variant="small">chevron-down</Icon>
            </FlexBox>
          }
        >
          {
            categoryLists
          }
        </Menu>
        {/* <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box> */}
      </StyledSearchBox>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>
                <Span fontSize="14px">{item}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};

const categories = [
  "All Categories",
  "Car",
  "Clothes",
  "Electronics",
  "Laptop",
  "Desktop",
  "Camera",
  "Toys",
];

const dummySearchResult = [
  "Macbook Air 13",
  "Ksus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];

export default SearchBox;
