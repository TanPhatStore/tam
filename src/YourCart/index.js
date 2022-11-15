
import './yourCart.scss'
import styles from './yourCart.module.scss'
import {Routes , Route, Link} from 'react-router-dom'

function yourCart () {
    return (<div className='col-lg-12 yourCart'>

        <div id='parentToChildren' style={{cursor : 'pointer'}} className='col-lg-12'>
                <Link className={styles.link}  to='/'>Trang Chủ </Link> 
                > Giỏ Hàng Của Bạn
        </div>
        <div className='col-lg-8 titlePage'>
            <p className='title'>Giỏ Hàng Của Bạn</p>
            <p className='description'>Có 1 Sản Phẩm Trong Giỏ Hàng</p>
        </div>

        <div className='row ContentCart'>
            <div className='col-lg-7 listProductCart'>
                <div className='col-lg-12 productAvaiable'>
                    <div className='productAvaiable__image'>
                        <img src='image/pixlr-bg-result (3).png' height='55%' />
                    </div>
                    <div className='productAvaiable__info'>
                        <div className='productAvaiable__info__name'>
                            <p>Converse All Star 1970s</p>
                        </div>
                        <div className='productAvaiable__info__sizeAndcolor'>
                            <p className='size'>Size : 42</p>
                            <p className='color'>Color : Pink</p>
                        </div>
                        <div className='productAvaiable__info__price'>
                            <p>1.900.000 VND</p>
                        </div>
                        <div className='productAvaiable__info__amount'>
                            <p>Số Lượng : 1</p>
                        </div>
                        <div className='productAvaiable__info__TotalMoney'>
                            Thành Tiền : <p> 1.900.000 VND</p>
                        </div>
                    </div>
                </div>


                <div className='col-lg-12 productAvaiable'>
                    <div className='productAvaiable__image'>
                        <img src='image/pixlr-bg-result (5).png' height='55%' />
                    </div>
                    <div className='productAvaiable__info'>
                        <div className='productAvaiable__info__name'>
                            <p>Converse All Star 1970s</p>
                        </div>
                        <div className='productAvaiable__info__sizeAndcolor'>
                            <p className='size'>Size : 42</p>
                            <p className='color'>Color : Pink</p>
                        </div>
                        <div className='productAvaiable__info__price'>
                            <p>1.900.000 VND</p>
                        </div>
                        <div className='productAvaiable__info__amount'>
                            <p>Số Lượng : 1</p>
                        </div>
                        <div className='productAvaiable__info__TotalMoney'>
                            Thành Tiền : <p> 1.900.000 VND</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-3 infoTotal'>
                <div className='infoTotal__title'>
                    <p>Thông Tin Đơn Hàng</p>
                </div>
                <div className='infoTotal__price'>
                    Tổng Cộng :
                    <p> 10.000.000 VND</p>
                </div>
                <div className='infoTotal__action'>
                    <button className='infoTotal__action__pay'>THANH TOÁN</button>
                    <button className='infoTotal__action__continueShopping'>Tiếp Tục Mua Hàng </button>
                </div>
            </div>
        </div>
    </div>)
}

export default yourCart