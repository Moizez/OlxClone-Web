import React from "react";
import { Link } from "react-router-dom";

import { AdContainer } from "./styles";

const Item = ({ data }) => {
    const [first] = data.images ? data.images : [];
    const imageUrl = first ? first.image_url : "http://placehold.it/750";
    const price = data.negotiable !== 'false' ? "Preço Negociável" : data.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    return (
        <AdContainer className="adItem">
            <Link to={`/edit-post/${data.id}`}>
                <div className="itemImage">
                    <img src={`${imageUrl}`} alt={data.title} />
                </div>
                <div className="itemName">{data.title}</div>
                <div className="itemPrice">{price}</div>
                <div className="itemPrice">Categoria: {data.category.title}</div>
            </Link>
        </AdContainer>
    );
};

export default Item;
