import {createContext, useEffect, useState} from 'react'
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props)=>{
    // "http://localhost:4000" 
    const url ="https://food-ordering-backend-wrr1.onrender.com"
    const [category_list, setCategoryList] = useState([]);

    const fetchCategoryList = async () => {
        const response = await axios.get(url + "/api/category/list");
        setCategoryList(response.data.data)
    }

    useEffect(()=>{
        async function loadData(){
            fetchCategoryList();
        }
        loadData();
    }, [])

    const contextValues = {
        url,
        category_list,
    }

    return (
        <StoreContext.Provider value={contextValues}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

