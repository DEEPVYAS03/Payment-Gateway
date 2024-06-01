import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap">
                {products.map(product => (
                    <div key={product._id} className="w-full md:w-1/3 lg:w-1/4 p-2">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
