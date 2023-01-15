const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const productsInitialState = {
  productsList: [
    {
      nome: "Refined Plastic Bike",
      descricao:
        "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
      categoria: "Fantastic",
      imagem: "http://placeimg.com/640/480/business",
      preco: "127.00",
      material: "Metal",
      departamento: "Grocery",
      id: "1",
    },
    {
      nome: "Fantastic Steel Salad",
      descricao:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      categoria: "Refined",
      imagem: "http://placeimg.com/640/480/nature",
      preco: "716.00",
      material: "Metal",
      departamento: "Tools",
      id: "2",
    },
  ],
};

export type ProductItem = {
  id: string | number;
  nome: string;
  descricao: string;
  categoria: string;
  imagem: string;
  preco: string | number;
  material?: string;
  departamento?: string;
  company?: string;
};

export type productsStateType = {
  productsList: ProductItem[];
};

export type productsActionType = {
  type: typeof GET_ALL_PRODUCTS;
  payload: ProductItem;
};

export const productReducer: React.Reducer<
  productsStateType,
  productsActionType
> = (state: productsStateType, action: productsActionType) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      let productsList = state.productsList;
      let productItem = action.payload;
      console.log("productItem", productItem);
      return {
        productsList: [...productsList, productItem],
      };

    default: {
      //   let productsList = state.productsList;
      //   let productItem = action.payload;
      //   return {
      //     productsList: [...productsList, productItem],
      //   };
    }
  }
};
