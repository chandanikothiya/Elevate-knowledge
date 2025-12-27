import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CategorySingal(props) {

    const { id } = useParams();
    console.log(id);
    const [data,setData] = useState({})

    const getdata = async() => {
        const response = await fetch("http://localhost:3000/category");
        const datar = await response.json();

        // console.log("datar",datar);
        const fdata = datar.filter((v) => v.id === id);
        console.log("fdata",fdata[0])
        setData(fdata[0])
    }

    useEffect(() => {
        getdata();
    },[])
    
    return (
        <div style={{textAlign:"center"}}>
            {console.log("path",data.categoryimg,data)
            // console.log("path","../public/images/" + data.categoryimg)
            }
            <h2>{data.name}</h2>
            <img src={"../public/images/" + data.categoryimg} width={"200px"} height={"200px"}/>
            <p>{data.description}</p>
        </div>
    );
}

export default CategorySingal;