import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Alert } from "react-bootstrap";


const NewProduct = () => {
    const [productInfoTab, setProductInfoTab] = useState(true)
    const {user} = useContext(AuthContext);
    const defaultProductInfo = {name:"",description:"", price:""}
    const [productForm, setProductForm] = useState(defaultProductInfo)
    const [categoryForm, setCategoryForm] = useState({name:""})
    const [categories, getCategories] = useFetch('http://127.0.0.1:8000/api/product/category', 'GET',null)
    const [postCategory, sendPostCategory] = useFetch('http://127.0.0.1:8000/api/product/category','POST',categoryForm)
    const [postProduct, sendPostProduct] = useFetch('http://127.0.0.1:8000/api/product/','POST',productForm)
    const [selectedCategory, setSelectedCategory] = useState()
    const [addCategory, setAddCategory] = useState(false)
    const [productInfoAlert, setProductInfoAlert] = useState(false)
    

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
    const handlePostProduct = async()=>{
        await sendPostProduct(selectedCategory);
        setProductForm(defaultProductInfo)
        setSelectedCategory("")
        setProductInfoAlert(true)
        setTimeout(()=> setProductInfoAlert(false),2000 )
    }






    return(
        <div>
            <h1>Add New Product</h1>
            <Alert show={productInfoAlert} variant="success" onClose={()=>setProductInfoAlert(false)} dismissible>
                <Alert.Heading>Product information saved</Alert.Heading>
            </Alert>
            <div className="product-info">
                <button onClick={()=>{setProductInfoTab(!productInfoTab)}}>product information</button>
                
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
                    <select value={selectedCategory} onChange={handleCategory}>
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
                    <button onClick={handlePostProduct}>SAVE PRODUCT</button>

                </div>

                
                    
                }

                
            </div>
            <div className="product-images">

            </div>




        </div>
    )
};

export default NewProduct;