import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";


const NewProduct = () => {
    const [productInfoTab, setProductInfoTab] = useState(true)
    const {user} = useContext(AuthContext);
    const defaultProductInfo = {name:"",description:"", price:""}
    const [productForm, setProductForm] = useState(defaultProductInfo)
    const [categoryForm, setCategoryForm] = useState({name:""})
    const [categories, getCategories] = useFetch('http://127.0.0.1:8000/api/product/category', 'GET',null)
    const [postCategory, sendPostCategory] = useFetch('http://127.0.0.1:8000/api/product/category','POST',categoryForm)
    const [selectedCategory, setSelectedCategory] = useState()
    const [addCategory, setAddCategory] = useState(false)
    

    useEffect(()=>{
        getCategories();
    },[])

    const handleCategory=(e) =>{
        setSelectedCategory(e.target.value)
        console.log(selectedCategory)
    }
    const handleCategoryForm=(e) =>{
        e.persist();
        setCategoryForm({...categoryForm, [e.target.name]: e.target.value})
        console.log(categoryForm)
    }
    const handleProductForm = (e)=>{
        e.persist();
        setProductForm({...productForm, [e.target.name]: e.target.value})
        console.log(productForm)
    }
    const handlePostCategory = async()=>{
        await sendPostCategory();
        await getCategories();
        setAddCategory(false);
    }






    return(
        <div>
            <h1>Add New Product</h1>
            <div className="product-info">
                <button onClick={()=>{setProductInfoTab(!productInfoTab)}}>tab 1</button>
                {productInfoTab == true && 
                <div className="product-form">
                    <label>
                        name:
                        <input type="text" name="name" value={productForm.name} onChange={handleProductForm}/>
                    </label>
                    <label>
                        description:
                        <input type="text" name="description" value={productForm.description} onChange={handleProductForm}/>
                    </label>
                    <label>
                        price:
                        <input type="text" name="price" value={productForm.price} onChange={handleProductForm}/>
                    </label>
                    <select onChange={handleCategory}>
                        <option value="" disabled selected>Select a category</option>
                        {categories.map((category) =>(
                            <option value={category.id}>{category.name}</option>

                        ))}
                    </select>
                    <button onClick={()=>setAddCategory(true)}>ADD</button>
                    {addCategory == true &&
                    <div>
                        <label>
                            Category:
                            <input type="text" name="name" value={categoryForm.name} onChange={handleCategoryForm} />
                        </label>
                        <button onClick={handlePostCategory}> Save</button>
                    </div>
                        
                    }
                </div>
                
                    
                }

                
            </div>
            <div className="product-images">

            </div>




        </div>
    )
};

export default NewProduct;