
import './DetailProduct.scss'
import {Routes , Route, Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './DetailProduct.module.scss'

function DetailProduct () {
    const title1 = 'adidas'
    const productsAPI = "http://localhost:3000/products"
    const listProductAPI = "http://localhost:3000/listProduct"
    const [product, setProduct] = useState()
    const [listProduct, setListProduct] = useState()

    function changeString(str) {
        for (let i = 0; i< str.length ; i++) {
          if (str[i] === ' ') {
            str = str.replace(' ', '_')
          }
        }
        return str;
      }
    function HeaderView() {
        const location = useLocation();
        return location.pathname;
    }
    const title = HeaderView().slice(1, HeaderView().length);
    useEffect (() => {
        fetch(productsAPI)
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    if (title === changeString(item.name)) {
                        setProduct(item)
                        fetch(listProductAPI)
                            .then(res1 => res1.json())
                            .then (data1 => {
                                data1.forEach(item1 => {
                                    if (item1.id === item.listProduct_id) {
                                        setListProduct(item1)
                                    }
                                })
                            })
                    }
                }) 
            })
    },[])
    let products = [
        'image/pixlr-bg-result (1).png',
        'image/pixlr-bg-result (2).png',
        'image/pixlr-bg-result (3).png',    
        'image/pixlr-bg-result (4).png',
        'image/pixlr-bg-result (5).png',
        'image/pixlr-bg-result (6).png',
        'image/pixlr-bg-result (7).png',
        'image/pixlr-bg-result (8).png',
        'image/pixlr-bg-result (9).png',
        'image/pixlr-bg-result (10).png',
        'image/pixlr-bg-result (11).png',
        'image/pixlr-bg-result (12).png'
    ]
    let sizes = [36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5]

    useEffect(() => {
        const containerImage = document.getElementById('imageDetailProduct')
        const myImage = document.getElementById('myImageProduct')
        containerImage.addEventListener("mousemove", (e) => {
            let _x = e.clientX - e.target.offsetLeft;
            let _y = e.clientY - e.target.offsetTop;
            myImage.style.transformOrigin = `${_x}px ${_y}px `
            myImage.style.transform = "scale(2)"
        })
        containerImage.addEventListener("mouseleave", () =>{
            myImage.style.transform = "scale(1)"
            myImage.style.transformOrigin = 'center'
        })


    })

    const handleChangeImageDetail = (e) => {
        const myImage = document.getElementById('myImageProduct')
        const eleActive = document.querySelector('.active')
        const getStyles = window.getComputedStyle(e.target)
        const url = getStyles.backgroundImage.slice(5, -2)
        eleActive.classList.remove('active')
        e.target.classList.add('active')
        myImage.src = url
    }

    function RenderImagesMini ({product}) {
        return product.images.map((image, index) => {
            if (index === 0) {
                return (
                    <div key={image} onClick={e => handleChangeImageDetail(e)} className='active imageMiniItem col-lg-3' style={{backgroundImage : `url("${image}")`}}>
                    </div>
                )
            }
            return (
                <div key={image} id={'mimiImage__' + index} onClick={e => handleChangeImageDetail(e)} className='imageMiniItem col-lg-3' style={{backgroundImage : `url("${image}")`}}>
                </div>
            )
        })
    }
    function RenderSizes ({product}) {
        return product.sizes.map((size) => {
            return <div key={size} className='sizeItem'>{size}</div>
        })
    }

    return (
        <div id="detailProduct">
            <div id='parentToChildren' style={{cursor : 'pointer'}} className='col-lg-12'>
                <Link className={styles.link}  to='/'>Trang Chủ </Link>
                > 
                {product === undefined ? <></> : <Link className={styles.link} to={listProduct === undefined ? '' : '/all-' +listProduct.name}> {listProduct === undefined ? <></> : 'All '+  listProduct.name.charAt(0).toUpperCase() + listProduct.name.slice(1)} </Link>}
                >
                {product === undefined ? <></> :' ' + product.name}
            </div>
            <div id='wrapperDetailProduct'>
                <div className='row' style={{justifyContent: 'space-evenly'}}>
                    <div className='col-lg-9'>
                        <div className='row' style={{justifyContent: 'space-evenly'}}>
                            <div className='col-lg-4'>
                                <div id='imageDetailProduct' className='col-lg-12'>
                                    <img id="myImageProduct" src={product === undefined ? '' : product.images[0] } width={'100%'}/>
                                </div>
                                <div id='listImageMini' className='col-lg-12'>
                                    {product === undefined ? <></> : <RenderImagesMini product={product} />}
                                </div>
                            </div>
                            <div className='col-lg-7'>
                                <div id='infoProductDetail' className='col-lg-12'>
                                    <div className='row'>
                                        <div id='title' className='col-lg-12'>
                                            <h3><i className="fa-solid fa-scissors"></i> {product === undefined ? '' : product.name}</h3>
                                        </div>
                                        <div className='col-lg-12'>
                                            <div id='brandName' className='titleItem'>
                                                <p>Thương Hiệu : <Link className='link' to='/allProducts' 
                                                                    onClick={() => {window.scrollTo(0, 0)}} state={{from : title1}}>
                                                                    {listProduct === undefined ? '' : listProduct.name.charAt(0).toUpperCase() + listProduct.name.slice(1)}</Link></p>
                                            </div>
                                            <div id='warehouse' className='titleItem'>
                                                <p>Kho : {product === undefined ? '' : product.amount > 0 ? 'Còn Hàng' : 'Hết Hàng'}</p>
                                            </div>
                                            <div id='type' className='titleItem'>
                                                <p>Loại : {product === undefined ? '' : product.type}</p>
                                            </div>
                                            <div id='color' className='titleItem'>
                                                <p>Màu Sắc : {product === undefined ? '' : product.color}</p>
                                            </div>
                                            <div id='sizes' className='titleItem'>
                                                Size
                                                <div style={{display:'flex', flexWrap: 'wrap'}}>
                                                    {product === undefined ? <></> : <RenderSizes product={product} />}
                                                </div>
                                            </div>
                                            <div id='price'>
                                                {product === undefined ? 0 : new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.price)}
                                            </div>
                                            <div id='amount'>
                                                <p>Số Lượng :</p>  
                                                <i id={styles.left} className='bx bx-left-arrow-alt left'></i>
                                                1
                                                <i id={styles.right} className='bx bx-right-arrow-alt right'></i>
                                            </div>
                                            <div id='buttons' className='row'>
                                                <div className='col-lg-12'>
                                                    <button id='button1'>Mua Ngay <i className="fa-solid fa-dollar-sign"></i></button>
                                                    <button id='button2'>Thêm Vào Giỏ Hàng <i className="fa-solid fa-cart-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id='MoProductDetail' className='col-lg-8'>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3' id='infoDetail'>
                        <div className='tableHeader'>Thông Tin Sản Phẩm</div>
                        <div className='tableGroup'>
                            <div className='tableItem1'>
                                Loại Sản Phẩm
                            </div>
                            <div className='tableItem2'>
                                {product === undefined ? '' : product.type}
                            </div>
                        </div>
                        <div className='tableGroup'>
                            <div className='tableItem1'>
                                Giới Tính
                            </div>
                            <div className='tableItem2'>
                                {product === undefined ? '' : product.sex}
                            </div>
                        </div>
                        <div className='tableGroup'>
                            <div className='tableItem1'>
                                Màu Sắc
                            </div>
                            <div className='tableItem2'>
                                {product === undefined ? '' : product.color}
                            </div>
                        </div>
                        <div className='tableGroup'>
                            <div className='tableItem1'>
                                Phụ Kiện Kèm
                            </div>
                            <div className='tableItem2'>
                                {product === undefined ? '' : product.accessory}
                            </div>
                        </div>
                        <div className='tableGroup'>
                            <div className='tableItem1'>
                                Bảo Hành
                            </div>
                            <div className='tableItem2'>
                                {product === undefined ? '' : product.insurance}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct;