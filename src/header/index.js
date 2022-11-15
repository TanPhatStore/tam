
import styles from './header.module.scss'
import './header.css'
import {useEffect} from 'react'
import clsx from 'clsx'
import {Routes , Route, Link} from 'react-router-dom'

function Header ({Content}) {
    var i = 0
    useEffect(() => {
        var cate = document.getElementById('cate')
        var mobile_nav = document.querySelector('.nav-mobile')
        var content = document.querySelector('.content');
    
        document.onscroll = () => {
            const header= document.getElementById(styles.header)

            if (window.scrollY <= 120) {
                header.style.top = window.scrollY * -1 + 'px'
            }
            else {
                header.style.top = '-120px'
            }
        }

        cate.onclick =  e => {
            if (i == 0) {
                mobile_nav.style.marginLeft = '0px';
                content.style.opacity = '0.4';
                i = 1;
            } else {
                mobile_nav.style.marginLeft = '-300px';
                content.style.opacity = '1';
                i = 0;
            }
        }

        content.onclick = e => {
            if (i == 1) {
                mobile_nav.style.marginLeft = '-300px';
                content.style.opacity = '1';
                i = 0;
            }
        }
    })
    const handleCloseMenu = () => {
        document.querySelector('.nav-mobile').style.marginLeft = '-300px';
        document.querySelector('.content').style.opacity = '1';
        i = 0;
    }

    let cateProducts = [
        'jordan','nike','adidas','converse','mlb','vans','yeezy','newbalance','matkinh','vo','daygiay'
    ]
    function RenderCateProduct ({cateProducts}){
        return cateProducts.map((cateProduct, index) => {
            return <li key={cateProduct} className={`all-${cateProduct}`}>
                        <img src={`https://bit.ly/${cateProduct}-icon`}
                            height="100%" alt=""/>
                        <p className="sub">{cateProduct.toUpperCase()}</p>
                        
                        <div className={`col-lg-9 m-2 sub-${cateProduct} sub-shoes`}>
                            <div className={`col-lg-4 sub-jordan-item sub-shoe-item`}>
                                <a href=""><img src="image/pixlr-bg-result (1).png" width="80%"
                                        alt=""/></a>
                                <p>JORDAN 1 LOW</p>
                            </div>
                            <div className={`col-lg-4 sub-jordan-item sub-shoe-item`}>
                                <a href=""><img src="image/pixlr-bg-result (5).png" width="80%"
                                        alt=""/></a>
                                <p>JORDAN 1 HIGH</p>
                            </div>
                            <div className={`col-lg-4 sub-jordan-item sub-shoe-item`}>
                                <a href=""><img src="image/pixlr-bg-result (6).png" width="80%"
                                        alt=""/></a>
                                <p>JORDAN 1 MID</p>
                            </div>
                        </div>
                    </li>
            
        })
    }

    return (
        <div id={styles.header}>
            <div className="row">
                <div className="col-lg-12" id={styles.logo_header} style={{backgroundColor : 'white'}}>
                    <img src="./image/logo-store.png" height={'100%'}  />
                </div>
            </div>
            <div className="row">
                <div className={clsx('navtotal', 'col-lg-12')} id={clsx(styles.nav)}>
                    <ul className="nav">
                        <li className={clsx(styles.nav__navitem, 'nav__navitem')}><Link to='/'><i className='bx bx-home'></i> TRANG CHỦ</Link></li>
                        <li className={clsx(styles.nav__navitem, 'nav__navitem')} id='menu-cate' ><i className='bx bx-duplicate'></i> DANH MỤC SẢN PHẨM <i className='bx bxs-down-arrow'></i>
                            <div className="list-menu-cate">
                                <div className="col-lg-3 m-3" style={{marginLeft: '30px' ,borderRight: '1px solid #ccc'}}>
                                    <ul className="all-products" id="all-products">    
                                        <RenderCateProduct cateProducts={cateProducts}/>                    
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className={clsx(styles.nav__navitem, 'nav__navitem')}><i className='bx bx-money-withdraw'></i> GIẢM GIÁ</li>
                        <li className={clsx(styles.nav__navitem, 'nav__navitem')}><a href="#lienhe"><i className='bx bx-phone'></i> LIÊN HỆ</a></li>
                        <li className={clsx(styles.nav__navitem, 'nav__navitem', 'cart')}> <Link to='/gio-hang-cua-ban'><i className="fa-solid fa-cart-shopping"></i> <p className='amount_in_cart'>1</p> GIỎ HÀNG </Link></li>
                        <li className={clsx(styles.nav__navitem, 'nav__navitem')}><i className="fa-solid fa-user"></i> TÀI KHOẢN</li>
                        <li className={clsx(styles.nav__navitem, 'nav__navitem')}><i className="fa-solid fa-magnifying-glass"></i> TÌM KIẾM</li>
                    </ul>
                </div>
                <div className="menu-mobile" id="menu-mobile">
                    <div className="cate" id="cate">
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className="icon-action" id="icon-action">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <i className="fa-solid fa-user"></i>
                    </div>
                </div>
                <nav className="nav-mobile" id="nav-mobile">
                    <li className="navbar-item">
                        <a href="" style={{display: 'flex', justifyContent: 'center'}}>
                            <img src="image/logo-store.png" width="80%" alt=""/>
                        </a>
                    </li>
                    <li onClick={handleCloseMenu} className="navbar-item"><Link to='/'><i className='bx bx-home'></i> TRANG CHỦ</Link></li>
                    <li onClick={handleCloseMenu} className="navbar-item"><a href=""><i className='bx bx-duplicate'></i> DANH MỤC SẢN PHẨM</a></li>
                    <li onClick={handleCloseMenu} className="navbar-item"><a href="">NIKE <i className='bx bx-chevron-down'></i></a></li>
                    <li onClick={handleCloseMenu} className="navbar-item"><a href="">ADIDAS <i className='bx bx-chevron-down'></i></a></li>
                    <li onClick={handleCloseMenu} className="navbar-item"><a href="">VANS <i className='bx bx-chevron-down'></i></a></li>
                    <li onClick={handleCloseMenu} className="navbar-item"><i className='bx bx-money-withdraw'></i> GIẢM GIÁ</li>
                    <li onClick={handleCloseMenu} className="navbar-item"><a href="#lienhe"><i className='bx bx-phone'></i> LIÊN HỆ</a></li>
                </nav>
            </div>
        </div>
    )
}

export default Header