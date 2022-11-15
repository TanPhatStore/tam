
import Iframe from 'react-iframe'
import styles from './footer.module.scss'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

function Footer () {
    const infoAPI = "http://localhost:3000/infoAboutUs"
    const [info, setInfo] = useState({})
    useEffect(() => {
        fetch(infoAPI) 
            .then (res => res.json())
            .then (data => {
                setInfo(data)
            })
    }, [])
    return (
        <div id="footer">
            <div className="row" style={{marginTop: '50px',justifyContent: 'center',backgroundColor: '#333'}}>
                <div className="col-lg-5 col-12">
                    <a name="lienhe"></a>
                    <div className={styles.map}>
                        <Iframe
                            src={info.local}
                            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                              />
                    </div>
                </div>
                <div className="col-lg-5 col-12">
                    <div className={clsx(styles.info, "info")}>
                        <p style={{fontSize : '30px'}} id="active">CHÚNG TÔI LÀ <b>{info.weAre}</b></p>
                        <p><i className='bx bx-location-plus'></i> Address : {info.address}</p>
                        <p><i className='bx bx-phone'></i> Phone : {info.phone}</p>
                        <p><i className='bx bx-envelope'></i> Email : {info.email}</p>
                        <div className="social">
                            <a href={info.facebook}><i className='bx bxl-facebook-square'></i></a>
                            <a href={info.instagram}><i className='bx bxl-instagram-alt'></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{backgroundColor: '#333'}}>
                <div className="col-lg-12">
                    <div className={styles.copy}>
                        <p>{info.copyRight}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer