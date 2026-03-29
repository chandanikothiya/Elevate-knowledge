import { useState } from "react";


function Useseacrh(data, keys) {

     const [secarch,setSeacrh] = useState("");

    console.log("datakey", data, keys)

    const handlefilter = () => {
        return data?.filter
            ((v) =>
                keys.some((v1) => 
                    typeof v[v1] === 'string' ?
                    v[v1]?.toLowerCase()?.includes(secarch.toLowerCase()) :
                    v[v1].toString().includes(secarch))
            )
    }


    const sdata = handlefilter();
    return [
        secarch,
        setSeacrh,
        sdata
    ];

}

export default Useseacrh;