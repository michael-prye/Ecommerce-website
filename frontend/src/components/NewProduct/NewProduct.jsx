import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Alert } from "react-bootstrap";


const NewProduct = () => {

    // form states
    const defaultProductInfo = {name:"",description:"", price:""}
    const [productForm, setProductForm] = useState(defaultProductInfo)
    const defaultProductImage = {name:"",image:null,default:false}
    const [imageForm, setImageForm] = useState(defaultProductImage)
    const [categoryForm, setCategoryForm] = useState({name:""})
    const [selectedCategory, setSelectedCategory] = useState()

    // Declaring fetch hooks 
    const [categories, getCategories] = useFetch('http://127.0.0.1:8000/api/product/category', 'GET',null)
    const [postCategory, sendPostCategory] = useFetch('http://127.0.0.1:8000/api/product/category','POST',categoryForm)
    const [postProduct, sendPostProduct] = useFetch('http://127.0.0.1:8000/api/product/','POST',productForm)
    const [postImage, sendPostImage] = useFetch('http://127.0.0.1:8000/api/product/image','POST',imageForm)
    const [productImages, getPostImage] = useFetch('http://127.0.0.1:8000/api/product/image','GET',null)

    // render states
    const [productImageTab, setProductImageTab] = useState(false)
    const [addCategory, setAddCategory] = useState(false)
    const [productInfoAlert, setProductInfoAlert] = useState(false)
    const [productFieldset, setProductFieldset] = useState(false)




    useEffect(()=>{
        getCategories();
    },[])

    const handleAddCategoryBtn = (e) =>{
        e.preventDefault();
        setAddCategory(true)
    }

    const handleCategory=(e) =>{
        e.persist();
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
    }
    const handleImageForm = (e)=>{
        e.persist();
        if(e.target.name === "image"){
            setImageForm({...imageForm, [e.target.name]: e.target.files[0]}) 
        }else{
            setImageForm({...imageForm, [e.target.name]: e.target.value})
        }
            
    }
    const handlePostCategory = async(e)=>{
        e.preventDefault();
        await sendPostCategory();
        await getCategories();
        setAddCategory(false);
    }
    const handlePostProduct = async(e)=>{
        e.preventDefault();
        await sendPostProduct(selectedCategory);
        setProductInfoAlert(true)
        setTimeout(()=> setProductInfoAlert(false),2000 )
        setProductImageTab(true)
        setProductFieldset(true)
    }
    const handlePostImage = async (e)=>{
        e.preventDefault();
        await sendPostImage(postProduct.id, true)
        await getPostImage(postProduct.id)
    }
    const handleReset =()=>{
        setProductForm(defaultProductInfo)
        setImageForm(defaultProductImage)
        setCategoryForm({name:""})
        setSelectedCategory("")
        setProductFieldset(false)
        setProductImageTab(false)
    }






    return(
        <div>
            <h1>Add New Product</h1>
            <Alert show={productInfoAlert} variant="success" onClose={()=>setProductInfoAlert(false)} dismissible>
                <Alert.Heading>Product information saved</Alert.Heading>
            </Alert>
            <button onClick={handleReset}>New Product</button>
            <div className="product-info">                
                <form className="product-form">
                    <fieldset disabled={productFieldset}>
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
                    <button onClick={handleAddCategoryBtn}>ADD</button>
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
                    </fieldset>
                </form>
                
            </div>
            <div className="product-images">
                {productImageTab == true &&
                <>
                <h1>Product Images</h1>
                <form onSubmit={handlePostImage} dis>
                    <label>
                        Image Name:
                        <input type="text" name="name" value={imageForm.name} onChange={handleImageForm}/>
                    </label>
                    <label>
                        Select a image:
                        <input type="file" name="image" accept="image/png, image/jpeg"  onChange={handleImageForm}/>
                    </label>
                    <input type="submit" value="Save Image"/>


                </form>
                {productImages.map((image)=>(
                    <>
                    <h1>{image.name}</h1>
                    <img src={`http://127.0.0.1:8000${image.image}`} height='250' width='250'/>
                    </>
                ))}
                </>


                }
                

            </div>





        </div>
    )
};

export default NewProduct;