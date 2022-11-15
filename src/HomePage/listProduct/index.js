
import {Routes , Route, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './listProduct.scss'
import DecimalFormat from 'decimal-format';

function ListProduct () {

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
            .then (data => {
                setProducts(data)
            })
    }, [])

    function handleListProduct (rowProduct, index) {
        let CurMargin = 0;
        let x = 6
        let y = 0;
        let btnLeft = document.querySelector(`.btnLeft` + index)
        let btnRight = document.querySelector(`.btnRight` + index)
        products.forEach(item => {
            if (item.listProduct_id == index) {
                y++;
            }
        })
        if (btnLeft != null && btnRight != null) {
            if (y < 6) {
                btnLeft.style.display = 'none'
                btnRight.style.display = 'none'
            }
            btnLeft.onclick = () => {
                if (y >= 6){
                    if (x != 6) {
                        const widthProduct = document.getElementById('product_1').offsetWidth + 8
                        CurMargin -= widthProduct
                        rowProduct.style.marginLeft = '-' + CurMargin + 'px'
                        x --;
                    } else {
                        const widthProduct = document.getElementById('product_1').offsetWidth + 8
                        CurMargin = widthProduct * (y - x)
                        rowProduct.style.marginLeft = '-' + CurMargin + 'px'
                        x = y
                    }
                }
            }
            btnRight.onclick = () => {
                if (y >= 6) {
                    if (x != y) {
                        const widthProduct = document.getElementById('product_1').offsetWidth + 8
                        CurMargin += widthProduct
                        rowProduct.style.marginLeft = '-' + CurMargin + 'px'
                        x ++;
                    } else {
                        const widthProduct = document.getElementById('product_1').offsetWidth + 8
                        CurMargin = 0
                        rowProduct.style.marginLeft = '-' + CurMargin + 'px'
                        x = 6
                    }
                } 
            }
        }
        setInterval(() => {
            if (y >= 6) {
                if (x != y) {
                    const widthProduct = 233 + 8
                    CurMargin += widthProduct
                    rowProduct.style.marginLeft = '-' + CurMargin + 'px'
                    x ++;
                } else {
                    const widthProduct = document.getElementById('product_1').offsetWidth + 8
                    CurMargin = 0
                    rowProduct.style.marginLeft = '-' + CurMargin + 'px'
                    x = 6
                }
            }
        },4000)

    }
    function changeString(str) {
        for (let i = 0; i< str.length ; i++) {
          if (str[i] === ' ') {
            str = str.replace(' ', '_')
          }
        }
        return str;
      }


    return (
        <div className='listProducts'>
            {listProducts.map((listProduct , index) => {
                if (listProduct.amount != 0) {
                    return (<div key={'listProduct' + index} className='listProductBanner'>
                            <div className='col-lg-12 bannerListProduct' style={{display:'flex'}}>
                                <div className='col-lg-4 imageProductBanner'>
                                    <img src={listProduct.bannerHome} width="100%" alt=""/>
                                </div>
                                <div className='col-lg-7 descriptionProductBanner'>
                                    <p className='title'>{listProduct.title}</p>
                                    <p>{listProduct.description}</p>
                                    <Link style={{color : 'black'}} to={`/all-${listProduct.name}`} onClick={() => {window.scrollTo(0, 0)}} state={{from : listProduct.name}}><p className='call'>XEM TẤT CẢ</p></Link>
                                </div>
                            </div>
                            <div className='listProduct'>

                                <button className={`btnLeft${listProduct.id} btnLeft btnTotal`}><i className='bx bx-chevron-left'></i></button>
                                <button className={`btnRight${listProduct.id} btnRight btnTotal`}><i className='bx bx-chevron-right' ></i></button>
                                <div className='ProductsTotal'>
                                    <div className={`Products${listProduct.id} Products row`}>
                                        {products.map((product, index) => {
                                            if (product.listProduct_id === listProduct.id) {
                                                return (<div key={product.name + index} id={'product_'+ product.id} className='product'>
                                                    <div className='product__image'>
                                                        <img src={product.images[0]}  width= '80%'/>
                                                    </div>
                                                    <div className='product__name'>
                                                        <p>{product.name}</p>
                                                    </div>
                                                    <div className='product__color'>
                                                        <p className='color'>Color : </p>
                                                        {product.color.map((colorItem, index) => {
                                                            return (<div key={product.name + colorItem + index} className={'colorProduct' + ' ' + colorItem}>
                                                            </div>)
                                                        })}
                                                    </div>
                                                    <div className='product__price'>
                                                        <p>Giá :  {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                                                    </div>
                                                    <div className='product__action'>
                                                        <button className='btnDatHang'><i className='bx bx-cart-add'></i> Order</button>
                                                        <Link to={`/${changeString(product.name)}`} onClick={() => {window.scrollTo(0, 0)}} state={{from : changeString(product.name)}}><button className='btnXem'><i className='bx bx-info-circle'></i> Xem</button></Link>
                                                    </div>
                                                </div>)
                                            }
                                        })}
                                    </div>
                                </div>

                                {products.length != 0 ? handleListProduct(document.querySelector(`.Products${listProduct.id}`), listProduct.id) : console.log()}
                            </div>
                        </div>)
                }
            })}
        </div>
    )
}

export default ListProduct;