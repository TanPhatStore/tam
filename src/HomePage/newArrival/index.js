import {useEffect, useState, useRef} from 'react'
import {Routes , Route, Link} from 'react-router-dom'
import styles from './newArrival.module.scss'
import './newArrival.scss'
import clsx from 'clsx'

function NewArrival () {

    const NewArrivalAPI = "http://localhost:3000/newArrivals"
    const productsAPI = "http://localhost:3000/products"
    const [listNewArrival, setListNewArrival] = useState ([])
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
        fetch(NewArrivalAPI)
            .then (res => res.json())
            .then (data => {
                setListNewArrival(data)
            }) 
        fetch(productsAPI)
            .then (res => res.json())
            .then (data => {
                data.forEach(item => {
                    if (item.newArrival === true) {
                       setProducts(prevProducts => [...prevProducts, item]) 
                    }
                })
            }) 
    },[])

    function handleListNewArrivals () {
        const rowsListNewArrival = document.querySelector('.new_Products_Total')
        let x = Math.ceil(products.length / 2)
        let y = 4
        let marginLeftOfNewProduct = 0;
        let btnLeft = document.querySelector('.btnLeft')
        let btnRight = document.querySelector('.btnRight')
        setInterval(() => {
            if (x >= 4) {
                if (y == x) {
                    let NewProductWidth = 180 + 14;
                    marginLeftOfNewProduct = 0 
                    rowsListNewArrival.style.marginLeft = '-' + marginLeftOfNewProduct + 'px'
                    y = 4
                } else {
                    let NewProductWidth = 180 + 14;
                    marginLeftOfNewProduct += NewProductWidth
                    rowsListNewArrival.style.marginLeft = '-' + marginLeftOfNewProduct + 'px' 
                    y++;
                }
            }
            
        } , 5000)

        btnLeft.onclick = () => {
            if (x >= 4){
                if (y == 4) {
                    let NewProductWidth = 180 + 14;
                    marginLeftOfNewProduct = (x - y) * NewProductWidth
                    rowsListNewArrival.style.marginLeft = '-' + marginLeftOfNewProduct + 'px'
                    y = x
                } else {
                    let NewProductWidth = 180 + 14;
                    marginLeftOfNewProduct -= NewProductWidth
                    rowsListNewArrival.style.marginLeft = '-' + marginLeftOfNewProduct + 'px' 
                    y--;
                }
            }
        }
        btnRight.onclick = () => {
            if (x >= 4) {
                if (y == x) {
                    let NewProductWidth = 180 + 14;
                    marginLeftOfNewProduct = 0 
                    rowsListNewArrival.style.marginLeft = '-' + marginLeftOfNewProduct + 'px'
                    y = 4
                } else {
                    let NewProductWidth = 180 + 14;
                    marginLeftOfNewProduct += NewProductWidth
                    rowsListNewArrival.style.marginLeft = '-' + marginLeftOfNewProduct + 'px' 
                    y++;
                }
            }
        }
    }

    return (
        <div className="row" id={styles.newArrival}>
            <div className="col-lg-5 new_arrivals_desktop">
                <img src={listNewArrival.imagePC} width="100%" alt=""/>
            </div>  
            <div className='col-lg-6 new_Products' >
                <button className='btnLeft btnTotal'><i className='bx bx-chevron-left'></i></button>
                <button className='btnRight btnTotal'><i className='bx bx-chevron-right' ></i></button>
                <div className='new_Products_Total' style={{transition : '0.5s'}}>
                    <div className='new_Products_row'>
                        {products.map((product, index) => {
                            if (index <= Math.floor((products.length -1 ) / 2)) {
                                return (<div key={'productNew' + index} id = {'productNew' + index} className='col-lg-3 product'>
                                    <div className='product__image col-lg-12'>
                                        <img src={product.images[0]} width={'85%'} />
                                    </div>
                                    <div className='product__name col-lg-12'>
                                        <p>{product.name}</p>
                                    </div>
                                    <div className='product__price'>
                                        <p>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                                    </div>
                                    <div className='product__action'>
                                        <button className='btnDatHang'>Đặt Hàng</button>
                                        <button className='btnThongTin'>Thông Tin</button>
                                    </div>
                                </div>)
                            }
                        })}
                    </div>
                    <div className='new_Products_row'>
                        {products.map((product, index) => {
                            if (index > Math.floor((products.length-1) / 2)) {
                                return (<div key={'productNew' + index} id = {'productNew' + index} className='col-lg-3 product'>
                                    <div className='product__image col-lg-12'>
                                        <img src={product.images[0]} width={'85%'} />
                                    </div>
                                    <div className='product__name col-lg-12'>
                                        <p>{product.name}</p>
                                    </div>
                                    <div className='product__price'>
                                        <p>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                                    </div>
                                    <div className='product__action'>
                                        <button className='btnDatHang'>Đặt Hàng</button>
                                        <button className='btnThongTin'>Thông Tin</button>
                                    </div>
                                </div>)
                            }
                        })}
                        {products.length != 0 ? handleListNewArrivals() : console.log()}
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default NewArrival