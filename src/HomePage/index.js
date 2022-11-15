import styles from './content.module.scss'
import clsx from 'clsx'
import Banner from './banner'
import NewArrival from './newArrival'
import ListProduct from './listProduct'
import './HomePage.css'


function HomePage () {
    return (
        <div id={styles.content}>
            <Banner />
            <NewArrival />
            <ListProduct />
        </div>
    )
}

export default HomePage