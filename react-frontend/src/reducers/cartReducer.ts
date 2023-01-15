const CHANGE_CART_AMOUNT = "CHANGE_CART_AMOUNT";

export const cartInitialState = {
  cartList: [
    // {
    //   price: 250,
    //   name: "Lord 2019",
    //   imgUrl: "/assets/images/products/Automotive/1.Ford2019.png",
    //   id: "7222243834583537",
    //   qty: 1,
    // },
    // {
    //   price: 250,
    //   name: "Xorsche 2020",
    //   imgUrl: "/assets/images/products/Automotive/28.Porsche2020.png",
    //   id: "38553442244076086",
    //   qty: 1,
    // },
    // {
    //   price: 250,
    //   name: "Heavy 20kt Gold Necklace",
    //   imgUrl:
    //     "/assets/images/products/Fashion/Jewellery/9.Heavy20ktGoldNecklace.png",
    //   id: "9573201630529315",
    //   qty: 1,
    // },
  ],
};

export type CartItem = {
  id: string | number;
  name: string;
  qty: number;
  price: number;
  imgUrl?: string;
};

export type cartStateType = {
  cartList: CartItem[];
};

export type cartActionType = {
  type: typeof CHANGE_CART_AMOUNT;
  payload: CartItem;
};

export const cartReducer: React.Reducer<cartStateType, cartActionType> = (
  state: cartStateType,
  action: cartActionType
) => {
  switch (action.type) {
    case CHANGE_CART_AMOUNT:
      let cartList = state.cartList;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      //verify if the cartList is empty
      if (cartList.length === 0) {
        // console.log("cartList is empty");
        // //get cartList from sessionStorage
        // cartList = JSON.parse(sessionStorage.getItem("cartList")!);
        // console.log("cartLists", cartList);
      }

      if (cartItem.qty < 1) {
        const cartLists = {
          cartList: cartList.filter((item) => item.id !== cartItem.id),
        };
        sessionStorage.setItem("cartList", JSON.stringify(cartLists));
        return cartLists;
      } else if (exist) {
        const cartLists = {
          cartList: cartList.map((item) => {
            if (item.id === cartItem.id) return { ...item, qty: cartItem.qty };
            else return item;
          }),
        };
        console.log("cartItems", cartItem);
        sessionStorage.setItem("cartList", JSON.stringify(cartLists));
        return cartLists;
      } else {
        console.log("cartItem", cartItem);
        const cartLists = {
          cartList: [...cartList, cartItem],
        };
        sessionStorage.setItem("cartList", JSON.stringify(cartLists));
        return cartLists;
      }

    default: {
    }
  }
};
