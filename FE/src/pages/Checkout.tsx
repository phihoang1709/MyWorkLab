import Header from '../components/Header';
import Banner from '../components/Checkout/Banner';
import Services from '../components/Services';
import Footer from '../components/Footer';

const Checkout = () => {
    return (
        <div className="container">
            <Header />
            <Banner />
            <h1 className='checkout-title'>Billing details</h1>
            <div className="checkout">
                <div className="checkout-form">
                    <form action="">
                        <div className="checkout-form__first">
                            <label htmlFor="">
                                First Name
                                <input type="text" />
                            </label>
                            <label htmlFor="">
                                Last Name
                                <input type="text" />
                            </label>
                        </div>
                        <label htmlFor="">
                        Company Name (Optional)
                                <input type="text" />
                        </label>
                        <label htmlFor="">
                        Country / Region
                        <input type="text" />
                            {/* <option value="Sri Lanka">
                                <select name="" id=""></select>
                            </option> */}
                        </label>
                        <label htmlFor="">
                        Street address
                                <input type="text" />
                        </label>
                        <label htmlFor="">
                        Town / City
                            <input type="text" />
                        </label>
                        <label htmlFor="">
                        Province
                            <input type="text" />
                            {/* <option value="Western Province">
                                <select name="" id=""></select>
                            </option> */}
                        </label>
                        <label htmlFor="">
                        ZIP code
                            <input type="text" />
                        </label>
                        <label htmlFor="">
                        Phone
                            <input type="text" />
                        </label>
                        <label htmlFor="">
                        Email address
                            <input type="text" />
                        </label>
                        <label htmlFor="">
                            <input type="text" placeholder='Additional information'/>
                        </label>
                    </form>
                </div>
                <div className="checkout-totals">
                    <table>
                        <thead>
                            <td className="checkout-totals__f">Product</td>
                            <td className="checkout-totals__s">Subtotal</td>
                        </thead>
                        <tr>
                            <td className="checkout-totals__f">Asgaard sofa x 1</td>
                            <td className="checkout-totals__s">25.000.000đ</td>
                        </tr>
                        <tr>
                            <td className="checkout-totals__f">Subtotal</td>
                            <td className="checkout-totals__s">25.000.000đ</td>
                        </tr>
                        <tr>
                            <td className="checkout-totals__f">Total</td>
                            <td className="checkout-totals__s sum">250.00.000đ</td>
                        </tr>
                        
                    </table>
                    <div className="checkout-totals__rules">
                        <p><i className="fa-solid fa-circle"></i>Direct Bank Transfer</p>
                        <p className="checkout-totals__rules-content">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                        <label htmlFor="">
                        <input type="radio" name='money' /><p></p> Direct Bank Transfer
                        </label>
                        <label htmlFor="">
                        <input type="radio" name='money' /><p></p> Cash On Delivery
                        </label>
                        <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <b>privacy policy.</b></p>
                        <button>Place order</button>
                    </div>
                    
                </div>
            </div>
            <Services />
            <Footer />
        </div>
    )
}

export default Checkout