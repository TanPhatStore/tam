
import styles from './banner.module.scss'
import './banner.scss'
import clsx from 'clsx'
import {Routes , Route, Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

function Banner () {
    const APIBanner = 'http://localhost:3000/banners'
    const APILogoBrands = 'http://localhost:3000/logoBrands'
    const APIBannerMini = 'http://localhost:3000/bannerMini'
    const [banners, setBanners] = useState([])
    const [logoBrands, setLogoBrands] = useState([])
    const [bannersMini, setBannersMini] = useState([])
    let lengthBanners = 0;
    useEffect(() => {
        fetch (APIBanner)
            .then ((response) => response.json())
            .then (data => {
                setBanners(data)
            })
        fetch(APILogoBrands) 
            .then (res => res.json())
            .then (data => {
                setLogoBrands(data)
            })
        fetch(APIBannerMini)
            .then (res => res.json())
            .then (data => {
                setBannersMini(data)
            })
    },[]) 

    function handleListBanners () {
        const listBannerMain = document.querySelector('.listBannerMain')
        const boxListBanner = document.querySelector('.boxListBanner')
        let count = 0;
        const intervalListBanner =  setInterval(() => {
            count++;
            if ( count != banners.length ) {

                listBannerMain.style.marginLeft = '-' + listBannerMain.offsetWidth * count + 'px'
                
                setTimeout(() => {
                    const active = document.querySelector('.activeBoxList')
                    const CurBox = document.querySelector('.boxListBannerItem' + count)
                    active.classList.remove('activeBoxList')
                    CurBox.classList.add('activeBoxList')
                }, 500);
                
            } 
            else {
                count = 0;
                listBannerMain.style.marginLeft = '-' + listBannerMain.offsetWidth * count + 'px'

                setTimeout(() => {
                    const active = document.querySelector('.activeBoxList')
                    const CurBox = document.querySelector('.boxListBannerItem' + count)
                    active.classList.remove('activeBoxList')
                    CurBox.classList.add('activeBoxList')
                }, 500);
            }
        }, 4000);
    }


    return (
        <div id='banner'>
            <div className="row" id={styles.bigBanner} style={{position : 'relative'}}>
                <div className="col-lg-12 listBannerMain" style={{padding: '0'}}>
                    {banners.map((banner, index) => {
                        if (banner.type === "bannerMain") {
                            return (<img key={'image' + index} id='BigBanner' src={banner.urlBanner}
                        width="100%" alt=""/>)
                        }
                    })}
                    {banners.length != 0 ? handleListBanners() : console.log()}
                </div>
                <div id = 'boxListBanner'>
                    {banners.map((banner, index) => {
                        if (index === 0) {
                            return (<div key={'banner' + index} className={'boxListBannerItem boxListBannerItem'+ index + ' activeBoxList'} style={{ borderRadius : '50%'}}></div>)
                        } else {
                            return (<div key={'banner' + index} className={'boxListBannerItem boxListBannerItem'+ index } style={{ borderRadius : '50%'}}></div>)
                        }
                    })}
                </div> 
            </div>
            <div className="row" id="brands">
                <div className={styles.logoBrands}>
                    {logoBrands.map((logoBrand) => {
                        return (
                            <div key={logoBrand.name} className={clsx('col-lg-1', styles.logoBrand__item)}>
                                <Link to={`/all-${logoBrand.name}`} state={{from : logoBrand.listProduct_id}}><img onClick={() => {window.scrollTo(0, 0)}} src={logoBrand.urlImage} width="100%" alt=""/></Link>
                            </div>
                        )
                    })}
                </div>
            </div> 
            <div className="row">
                <div className={styles.call}>
                    {bannersMini.map((banner, index) => {
                        return <div key={'banner' + index} className={clsx('col-lg-4', 'col-6', styles.call__item)}>
                                    <img src={banner.urlBanner} width="100%" alt="" />
                                </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Banner