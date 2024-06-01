import React from 'react';
import ProductList from './components/ProductList';

function App() {
    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-8">Products</h1>
            <ProductList />
        </div>
    );
}

export default App;
