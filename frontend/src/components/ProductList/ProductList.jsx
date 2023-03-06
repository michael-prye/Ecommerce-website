import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = () => {

    // Declaring Fetch Hooks
    const [products, getProducts] = useFetch('http://127.0.0.1:8000/api/product/', 'GET', null)

    useEffect(()=>{
        getProducts();

    },[])







    return ( 
    <div>

    </div> );
}
 
export default ProductList;