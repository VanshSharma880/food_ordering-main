import { createContext, useEffect, useState } from "react";

import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // "http://localhost:4000" 
    const url = "https://food-ordering-backend-wrr1.onrender.com"
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [category_list, setCategoryList] = useState([]);
    const [discountId, setDiscountId] = useState("");


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const fetchCoupon = async (code) => {
        const response = await axios.get(url + "/api/discount/" + code);
        setDiscountId(response.data.data._id);
        return response.data.data;
    }

    const fetchDiscountCouponById = async (id) => {
        const response = await axios.get(url + "/api/discount/get/" + id);
        return response.data.data;
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    // fetch category list
    const fetchCategoryList = async ()=>{
        const response = await axios.get(url + "/api/category/list");
        setCategoryList(response.data.data);
    }

    // fetch food by id
    const fetchFood = async (id) => {
        const response = await axios.get(url + "/api/food/" + id);
        return response.data.data;
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchCategoryList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
            }
        }
        loadData()
    }, [])

    const contextValue = {
        url,
        food_list,
        cartItems,
        category_list,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        fetchFood,
        loadCartData,
        setCartItems,
        fetchCoupon,
        discountId,
        fetchDiscountCouponById
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;