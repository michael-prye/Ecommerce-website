import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';


const NewProduct = () => {






    return(
        <div>
            <h1>Add New Product</h1>
            <Accordion defaultActiveKey='0'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Product Info</Accordion.Header>
                    <Accordion.Body>
                        <form className="product-form">
                            <label>
                                Name:{""}
                                <input

                                />
                            </label>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Product IMAGES</Accordion.Header>
                </Accordion.Item>

            </Accordion>



        </div>
    )
};

export default NewProduct;