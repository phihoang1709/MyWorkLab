import { Link } from 'react-router-dom';
import Banner from '../components/Cart/Banner'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Services from '../components/Services';
import { fetcher, excute } from '../utilities/swrExcute';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
const Cart = () => {

    const token = localStorage.getItem('token');
    const { data, isLoading, mutate } = useSWR(
        `${import.meta.env.VITE_API_URL}/cart`,
        async () => await fetcher(`${import.meta.env.VITE_API_URL}/cart`, null, token)
      );
      const [total, setTotal] = useState(0);

      useEffect(() => {
        if (data && Array.isArray(data)) { 
            setTotal(
                data.reduce((curr, val) => {
                    curr += (+val.price * +val.product.quantity);
                    return curr;
                }, 0)
            );
        }
    }, [data]);

      async function deleteItem(id){
        if(confirm("Are you sure to delete this ?")){
            await excute(`${import.meta.env.VITE_API_URL}/cart`, id, null, mutate, 'cart')
        }
      }
      
    return (
        <div className="container">
            <Header />
            <Banner />

            <div className="cart">
                <table className="cart-list">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quatity</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(e => (
                            <tr className='cart-item'>
                            <td><img style={{width : '5rem'}} className='cart-item_img' src={e?.image} alt=""/></td>
                            <td>{e?.name}</td>
                            <td>{e?.price}đ</td>
                            <td>
                                <form action="">
                                    <input type="number" value={e?.product?.quantity} min={1}/>
                                </form>
                            </td>
                            <td>{+e?.product?.quantity*(+e?.price)}đ</td>
                            <td><button onClick={()=> deleteItem(e?._id)}><i className="fa-solid fa-trash"></i></button></td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
                <div className="cart-totals">
                    <h1 className='cart-totals__title'>Cart Totals</h1>
                    <table>
                        <tr>
                            <th>Subtotal</th>
                            <th> {total}đ</th>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th className='cart-totals__sum'> {total}đ</th>
                        </tr>
                    </table>
                    <Link className='cart-totals__btn' to={'/checkout'}>Check out</Link>
                </div>
            </div>
            <Services />
            <Footer />
        </div>
    )
}

export default Cart