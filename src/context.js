import React, { Component } from 'react';
import {storeProducts, detailProduct} from "./data"


const ProductContext = React.createContext();
//provider
//consumer

class ProductProvider extends Component {
    state ={
        product: [],
        detailProduct: detailProduct
    };
    componentDidMount(){
        this.setProduct();
    }
    setProduct = () =>{
        let tempProducts = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];
        });
        this.setState(()=>{
            return {product:tempProducts};
        });
    };

    getItem = (id) =>{
        const product = this.state.product.find(item => item.id === id);
        return product;
    };

    handleDetail = (id) =>{
       const product = this.getItem(id);
       this.setState(()=>{
           return {detailProduct:product}
       })
    };
    addToCart = id =>{
        console.log(`hello from add to cart.id is ${id}`);
    };
   
    render() {
        return (
            <ProductContext.Provider 
            value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart
            }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer};