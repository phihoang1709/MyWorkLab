import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { fetcher } from "../utilities/swrExcute";
import { useEffect, useState } from "react";
import useSWR from 'swr';
import axios from "axios";
const DetailProduct = () => {

  const { id } = useParams();
  const { data, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/products/${id}`,
    async () => await fetcher(`${import.meta.env.VITE_API_URL}/products/${id}`)
  );
  const [size, setSize] = useState(0);
  const [color, setColor] = useState('');
  const [chooseColors, setChooseColor ] = useState([]);
  const [quantity, setQuantity] = useState(1);
  
  const [filterProduct, setFilterProduct] = useState({});
  const onChangeQuantity = (e) => {
    switch (e?.target?.id) {
      case "add":
        setQuantity(quantity + 1);
        break;
      case "sub":
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
        break;
      default:
        setQuantity(quantity)
        break;
    }
  }

  useEffect(() => {
    const transformedObj = data?.attribute?.reduce((acc, item) => {
      const { color, size } = item;
      if (!acc[size]) {
        acc[size] = { colors: [color] };
      } else {
        if (!acc[size]?.colors?.includes(color)) {
          acc[size]?.colors?.push(color);
        }
      }
      return acc;
    }, {});
    setFilterProduct(transformedObj)
  }, []);


  const handleSizeAndColor = (e) => {
    setSize(e);
    setChooseColor(filterProduct[e].colors);
  }
  
  const addToCart = async () => {
    if (localStorage.getItem('token') && new String(localStorage?.getItem('token')).length > 0) {
      if (quantity && size && color && size != 0 && color !== "" && quantity > 0) {
        const dataF = {
          attribute: {
            color: color,
            size: size
          },
          product_id: id,
          quantity: quantity,
          image: data?.image
        }

        const dataRes = await axios.post(`${import.meta.env.VITE_API_URL}/addtocart`, dataF, {
          headers:{
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        });

        if(dataRes.status == 200){
          alert("Add to cart successfully");
        }
        
      } else {
        alert("Please select enough attribute");
      }
    } else {
      alert("You need to login to add to your cart")
    }

  }
  return (
    <div className="container">
      <Header />

      <div className="breadcrum">
        <ul className="breadcrum-menu">
          <li className="breadcrum-menu-item">
            <Link to={'/'}>Home</Link>
          </li>
          <li className="breadcrum-menu-item">
            <i className="fa-solid fa-chevron-right"></i>
          </li>
          <li className="breadcrum-menu-item">
            <Link to={'/shop'}>Shop</Link>
          </li>
          <li className="breadcrum-menu-item">
            <i className="fa-solid fa-chevron-right"></i>
          </li>
          <li className="breadcrum-menu-item item-name">
            <p>{data?.name}</p>
          </li>
        </ul>
      </div>
      <div className="detail">
        <div className="detail-show">
          <ul className="detail-show-subs">
            <li><img className="detail-show-subs__item" src="../../public/assets/detail1.png" alt="" /></li>
            <li><img className="detail-show-subs__item" src="../../public/assets/detail2.png" alt="" /></li>
            <li><img className="detail-show-subs__item" src="../../public/assets/detail3.png" alt="" /></li>
            <li><img className="detail-show-subs__item" src="../../public/assets/detail4.png" alt="" /></li>
          </ul>
          <div className="detail-show__main">
            <img src={data?.image} alt="" />
          </div>
        </div>
        <div className="detail-content">
          <h1>{data?.name}</h1>
          <h2>{data?.category}</h2>
          <h2>{data?.price}đ</h2>
          <div className="detail-content__star">
            <div><i className="fa-solid fa-star"></i></div>
            <p>5 Customer Review</p>
          </div>
          <p className="detail-content__main">Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.</p>
          <div className="detail-content-size">
            <p className="detail-content-size__title">Size</p>
            <ul className="detail-content-size-menu">

              {(filterProduct && Object?.keys(filterProduct)) 
              ? Object?.keys(filterProduct)?.map((e) =>  
                <li key={e} onClick={() => handleSizeAndColor(e)} id="size" value={e} className="detail-content-size-menu-item">{e}</li>)

              : <h1>Loading</h1>}

            </ul>
          </div>
          <div className="detail-content-color">
            <p className="detail-content-color__title">Color</p>
            <ul className="detail-content-color-menu">
              {chooseColors?.map(e => (
                <li onClick={() => setColor(e)} id="color" value={e} style={{ backgroundColor: e }} className="detail-content-color-menu-item"></li>
              ))}

            </ul>
          </div>
          <div className="detail-content-add">
            <div className="detail-content-add__mount">
              <button id="sub" onClick={onChangeQuantity}>-</button>
              <input type="number" min={1} value={quantity} />
              <button id="add" onClick={onChangeQuantity}>+</button>
            </div>
            <button onClick={addToCart} className="detail-content-add-cart">Add To Cart</button>
            <button className="detail-content-add-compare">+ Compare</button>
          </div>
          <table className="detail-content-table">
            <tr>
              <td>SKU</td>
              <td>:</td>
              <td>{data?._id}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>:</td>
              <td>{data?.category}</td>
            </tr>
            <tr>
              <td>Tags</td>
              <td>:</td>
              <td>Sofa, Chair, Home, Shop</td>
            </tr>
            <tr>
              <td>Share</td>
              <td>:</td>
              <td>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-square-twitter"></i>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className="divide"></div>

      <div className="description">
        <ul className="description-menu">
          <li className="description-menu-item">Description</li>
          <li className="description-menu-item">Additional Information</li>
          <li className="description-menu-item">Reviews [5]</li>
        </ul>
        <div className="description-content">
          <p>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
          <p>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
        </div>
        <div className="description-menu-image">
          <img src="../../public/assets/detail5.png" alt="" />
          <img src="../../public/assets/detail5.png" alt="" />
        </div>
      </div>

      <div className="divide"></div>


      <div className="related-product">
        <h1>Related Products</h1>
        <ul className="news__list">
          <li className="news__item">
            <Card sale={-10} title={'Syltherine'} cate={'Stylish cafe chair'} price={3500000} image={'new1'} />
          </li>
          <li className="news__item">
            <Card sale={-10} title={'Syltherine'} cate={'Stylish cafe chair'} price={2500000} image={'new2'} />
          </li>
          <li className="news__item">
            <Card sale={-10} title={'Syltherine'} cate={'Stylish cafe chair'} price={14000000} image={'new3'} />
          </li>
          <li className="news__item">
            <Card sale={-10} title={'Syltherine'} cate={'Stylish cafe chair'} price={5000000} image={'new1'} />
          </li>
        </ul>
        <button className="related-product-more">
          Show More
        </button>
      </div>
      <div className="divide"></div>

      <Footer />
    </div>
  )
}

export default DetailProduct