import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

const Header = () => {
    const navigate = useNavigate();
    const [isShow, setShow] = useState(false);
    function showNav(){
        setShow(!isShow);
    }
    const [isShowModal, setShowModal] = useState<boolean>(false);
    function showModal(){
        setShowModal(!isShowModal);
    
    }
    return (
        <header className='header'>
            {isShowModal && <AuthForm setShowModal={setShowModal}/>}
            <Link to={'/'} className='header__logo'>
                <img  src='../../public/assets/logo.svg'/>
            </Link>
            <div className="nav">
                <nav className="main-menu">
                    <ul className="main-menu__list">
                        <li className="main-menu__item">
                            <Link className="main-menu__link" to={'/'} title='Home'>Home</Link>
                        </li>
                        <li className="main-menu__item">
                            <Link className="main-menu__link" to={'/shop'} title='Shop'>Shop</Link>
                        </li>
                        <li className="main-menu__item">
                            <Link className="main-menu__link" to={'/'} title='About'>About</Link>
                        </li>
                        <li className="main-menu__item">
                            <Link className="main-menu__link" to={'/'} title='Contact'>Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="block">
                <div onClick={showModal} className="block__item user"><i className="fa-regular fa-user"></i></div>
                <div className="block__item search"><i className="fa-solid fa-magnifying-glass"></i></div>
                <div className="block__item wishlist"><i className="fa-regular fa-heart"></i></div>
                {!!localStorage.getItem('token') && (
                    <div onClick={()=> navigate('/cart')} className="block__item cart"><i className="fa-solid fa-cart-plus"></i></div>
                )}
                <div onClick={showNav} className="block__item mylist">
                    <i className="fa-solid fa-list"></i>
                    {isShow && <ul className="block-menu__list">
                        <li className="block-menu__item">
                            <Link className="block-menu__link" to={'/'} title='Home'>Home</Link>
                        </li>
                        <li className="block-menu__item">
                            <Link className="block-menu__link" to={'/shop'} title='Shop'>Shop</Link>
                        </li>
                        <li className="block-menu__item">
                            <Link className="block-menu__link" to={'/'} title='About'>About</Link>
                        </li>
                        <li className="block-menu__item">
                            <Link className="block-menu__link" to={'/'} title='Contact'>Contact</Link>
                        </li>
                    </ul>}
                </div>
            </div>

        </header>
    )
}

export default Header