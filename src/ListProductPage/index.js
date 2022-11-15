
import { useEffect, useReducer, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {Routes , Route, Link} from 'react-router-dom'
import styles from './ListProductPage.module.scss'
import './ListProductPage.scss'


function ListProductPage () {
    function HeaderView() {
        const location = useLocation();
        return location.pathname;
    }
    const title = HeaderView().slice(5, HeaderView().length);

    function changeString(str) {
        for (let i = 0; i< str.length ; i++) {
          if (str[i] === ' ') {
            str = str.replace(' ', '_')
          }
        }
        return str;
      }


    const listProductsAPI = "http://localhost:3000/listProduct"
    const productsAPI = "http://localhost:3000/products"
    const criteriaAPI = "http://localhost:3000/criteria"
    const descriptionBrandAPI = "http://localhost:3000/descriptionBrands"
    const [descriptionBrand, setDescriptionBrand] = useState()
    const [listProduct , setListProduct] = useState()
    const [products, setProducts] = useState([])
    const [criteria, setCriteria] = useState({})
    useEffect (() => {
        fetch(listProductsAPI) 
            .then (res => res.json())
            .then (data => {
                data.forEach(item => {
                    if (item.name === title) {
                        setListProduct(item)
                        fetch(productsAPI)
                            .then(res1 => res1.json())
                            .then (data1 => {
                                data1.forEach(item1 => {
                                    if (item1.listProduct_id == item.id) {
                                        setProducts(prevProduct => [...prevProduct, item1])
                                    }
                                })
                            })
                        fetch(descriptionBrandAPI) 
                            .then(res2 => res2.json())
                            .then(data2 => {
                                data2.forEach(item2 => {
                                    if (item2.listProduct_id == item.id) {
                                        setDescriptionBrand(item2)
                                    }
                                })
                            })
                    }
                })
            })
        fetch (criteriaAPI) 
            .then (res => res.json())
            .then (data => {
                setCriteria(data)
            })
    }, [])
    let cateProducts = [
        {
            "name" : "jordan",
            "types" : ["Jordan Low", "Jordan High", "Jordan Mid"]
        },
        {
            "name" : "nike",
            "types" : ["Nike Low", "Nike High", "Nike Mid"]
        },
        {
            "name" : "adidas",
            "types" : ["adidas Low", "adidas High", "adidas Mid"]
        },
        {
            "name" : "vans",
            "types" : ["vans Low", "vans High", "vans Mid"]
        },
    ]
    let isOpenListType = false
    const handleClickCateProduct = (name) => {
        if (isOpenListType === false) {
            let listType = document.querySelector('#' + name + ' .listType')
            listType.style.display = 'block'
            listType.classList.add('active')
            isOpenListType = true
        }else {
            let listType = document.querySelector('#' + name + ' .listType')
            let active = document.querySelector('.active')
            if (listType === active) {
                isOpenListType = false
                listType.classList.remove('active')
                listType.style.display = 'none'
            }else {
                active.classList.remove('active')
                listType.classList.add('active')
                active.style.display = 'none'
                listType.style.display = 'block'
            }
        }
    }
    useEffect(() => {
        let btnOption = document.getElementById('btnOption')
        let wrapper__TOC = document.getElementById('wrapper__TOC')
        let content = document.querySelector('.content')
        let btnCloseTOC = document.getElementById('btnClose__TOC')
        let mainContent = document.getElementById('wrapper__mainContent')

        window.onscroll = () => {
           const cur_Top = window.scrollY - 55
           btnOption.style.marginTop = window.scrollY + 'px'
           wrapper__TOC.style.top =  cur_Top + 'px'
        }
        btnOption.onclick = () => {
            btnOption.style.display = 'none'
            mainContent.style.opacity = '0.3'
            wrapper__TOC.style.left = '0'
        }
        btnCloseTOC.onclick = () => {
            btnOption.style.display = 'block'
            wrapper__TOC.style.left =  content.offsetWidth + 'px'
            mainContent.style.opacity = '1'
        }   
        if (content.offsetWidth <= 1023) {
                wrapper__TOC.style.position = 'absolute'
                wrapper__TOC.style.width = content.offsetWidth
                wrapper__TOC.style.left =  content.offsetWidth + 'px'
        } 
            
    })

    function RenderPrices ({prices}) {
        return prices.map((price) => {
            return <div key={'price' + price}>
                    <p className='price'> <input type='radio' name='price' /> {price}</p>
                </div>
        })
    }
    function RenderSizes ({sizes}) {
        return sizes.map((size) => {
            return <div key={'size' + size} style={{padding : '0px 7px'}}>
                    <p className='size'> <input type='checkbox' /> {size}</p>
                </div>
        })
    }

    return (
        <div id='listProduct'>
            <div id='IntroduceBrand' className='col-lg-12'>
                <img className='col-lg-12' src={descriptionBrand === undefined ? '' : descriptionBrand.image} width={'100%'} />
                <p className='col-lg-12 descriptionBrand'>{descriptionBrand === undefined ? '' : descriptionBrand.description}</p>
            </div>

            <div id='parentToChildren' style={{cursor : 'pointer'}} className='col-lg-12'>
                <Link className={styles.link} to='/'>Trang Chủ </Link>
                {listProduct === undefined ? '> All ' : '> All ' + listProduct.name.charAt(0).toUpperCase() + listProduct.name.slice(1)}
            </div>
            <div id='wrapper'>
                <div id='btnOption'><i className="fa-solid fa-angle-left"></i></div>
                <div id='wrapper__TOC' className='col-lg-2'>
                    <div id='btnClose__TOC'><i className="fa-solid fa-xmark"></i></div>
                    <div className='wrapper__TOC_item'>
                        <h5>DANH MỤC SẢN PHẨM</h5>
                        <div className='categoryArea'>
                            {cateProducts.map((cateProduct, index) => {
                                return <div 
                                            onClick={() => handleClickCateProduct(cateProduct.name)} 
                                            id={cateProduct.name} 
                                            key={cateProduct.name + index}
                                            className='categoryProduct'
                                        >
                                        <p style={{fontSize : "15px"}}><img src={`https://bit.ly/${cateProduct.name}-icon`}width='30px' height="100%" style={{marginRight : "10px"}} alt=""/> {cateProduct.name.toUpperCase()} </p>
                                        <div className='listType' style={{display: 'none', marginLeft : '20px'}}>
                                            {cateProduct.types.map((type) => {
                                                return (
                                                    <p key={type}>{type}</p>
                                                )
                                            })}
                                        </div>
                                    </div>
                            })}
                        </div>
                    </div>
                    
                    <div className='wrapper__TOC_item'>
                        <h5>MỨC GIÁ</h5>
                        <div className='categoryArea'>
                            {criteria.allPrice !== undefined ? <RenderPrices prices={criteria.allPrice}/> : <></>}
                        </div>
                    </div>

                    <div className='wrapper__TOC_item'>
                        <h5>THEO KÍCH CỠ</h5>
                        <div className='categoryArea cateSizes'>
                            {criteria.allSize !== undefined ? <RenderSizes sizes={criteria.allSize}/> : <></>}
                        </div>
                    </div>
                </div>
                <div id='wrapper__mainContent' className='col-lg-8'>
                    <div className='row' style={{justifyContent : 'center'}}>
                        {products.map((product, index) => {
                            return (<div key={product.name + index} id={'product_'+ product.id} className='col-lg-3 product'>
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
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ListProductPage