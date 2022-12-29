import { useEffect, useLayoutEffect, useState } from "react";

const useWindowSize =() =>{
    const [innerWidth, setInnerWidth] = useState();

    function handleResize(){
        setInnerWidth(window.innerWidth)
    }

    useLayoutEffect(()=>{
        handleResize();
        window.addEventListener("resize", handleResize);
        return()=>window.removeEventListener("resize",handleResize);


    },[]);

    return innerWidth
 
} 

export default useWindowSize;