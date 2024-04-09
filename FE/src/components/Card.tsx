import { ICart } from '../interfaces/HomePage'
import { Link } from 'react-router-dom'
const Card = (props: ICart) => {
    return (
        <div>
            <div className="product">
                <div className="product_thumbnail">
                    <span className="product_sales">{props.sale}%</span>
                </div>
                <img src={props.image} alt="" />
                <div className="product-content">
                    <p className="product__name">{props.title}</p>
                    <Link className="product_cate" to={"#"}>{props.cate}</Link>
                    <div className="product-price">
                        {props.price}đ
                    </div>
                </div>
                <div className="product-content-extra">
                    <button className='content-extra__add'>Add to cart</button>
                    <div className='content-extra__div'>
                        <Link className='content-extra__btn' to={'/'}><i className="fa-solid fa-share-nodes"></i>Share</Link>
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                        <Link className='content-extra__btn' to={'/'}><i className="fa-regular fa-heart"></i>Like</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Card