import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";


const NewProduct = () => {
    const [productInfoTab, setProductInfoTab] = useState(true)
    const {user} = useContext(AuthContext);
    const defaultProductInfo = {name:"",description:"", price:""}
    const [productForm, setProductForm] = useState(defaultProductInfo)
    const [categories, getCategories] = useFetch('http://127.0.0.1:8000/api/product/category', 'GET',null)
    

    useEffect(()=>{
        getCategories();
    },[])






    return(
        <div>
            <h1>Add New Product</h1>
            <div className="product-info">
                <button onClick={()=>{setProductInfoTab(!productInfoTab)}}>tab 1</button>
                {productInfoTab == true && 
                <form className="product-form">
                    <label>
                        name:
                        <input type="text" name="name" value={productForm.name}/>
                    </label>
                    <label>
                        description:
                        <input type="text" name="description" value={productForm.description}/>
                    </label>
                    <label>
                        price:
                        <input type="text" name="price" value={productForm.price}/>
                    </label>
                    <select>
                        <option value="" disabled selected>Select a category</option>
                        {categories.map((category) =>(
                            <option value={category.name}>{category.name}</option>

                        ))}
                    </select>
                </form>
                
                    
                }

                
            </div>
            <div className="product-images">

            </div>




        </div>
    )
};

export default NewProduct;