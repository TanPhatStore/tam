import logo from './logo.svg';
import './App.css';
import {Routes , Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Header from './header'
import HomePage from './HomePage'
import YourCart from './YourCart'
import ListProductPage from './ListProductPage';
import DetailProduct from './DetailProduct'
import Footer from './Footer'

function App() {
  const listProductsAPI = "http://localhost:3000/listProduct"
    const productsAPI = "http://localhost:3000/products"
    const [listProducts , setListProducts] = useState([])
    const [products, setProducts] = useState([])
    function changeString(str) {
      for (let i = 0; i< str.length ; i++) {
        if (str[i] === ' ') {
          str = str.replace(' ', '_')
        }
      }
      return str;
    }
    useEffect (() => {
        fetch(listProductsAPI) 
            .then (res => res.json())
            .then (data => {
                setListProducts(data)
            })

        fetch(productsAPI)
          .then(res => res.json())
          .then(data => {
            setProducts(data)
          })    
    }, [])

  function Content () {
    return (<Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/gio-hang-cua-ban' element={<YourCart />} />
      {
        listProducts.map(listProduct => {
          return <Route key={listProduct.id} path={`/all-${listProduct.name}`} element={<ListProductPage/>} />
        })
      }
      {
        products.map(product => {
          return <Route key={product.id} path={`/${changeString(product.name)}`} element={<DetailProduct/>} />
        })
      }
      <Route path='/detail' element={<DetailProduct />} />
    </Routes>)
  }
 
  return (
    <div className="container-fluid">
        <Header />
        <div className='content'>
          <Content />
        </div>
        <div className='footer'>
          <Footer />
        </div>
    </div>
  );
}

export default App;
