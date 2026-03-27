import React from 'react';

function Useseacrh(data,keys) {

    console.log("datakey",data,keys)

    const handlefilter = () => {
        return categorys?.category?.filter
            ((v) => v.name?.toLowerCase()?.includes(secarch.toLowerCase())
                || v.description?.toLowerCase()?.includes(secarch.toLowerCase()));
    }


    const sdata = handlefilter();

    return (
        <div>

        </div>
    );
}

export default Useseacrh;