import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer-list">
        <li className="footer-list__item">
          <h1>Funiro.</h1>
          <p>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
        </li>
        <li className="footer-list__item">
          <h1 className="footer-list__title">Links</h1>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/'}>Shop</Link>
            </li>
            <li>
              <Link to={'/'}>About</Link>
            </li>
            <li>
              <Link to={'/'}>Contact</Link>
            </li>
          </ul>
        </li>
        <li className="footer-list__item">
          <h1 className="footer-list__title">Help</h1>
          <ul>
          <li>
              <Link to={'/'}>Payment Options</Link>
            </li>
            <li>
              <Link to={'/'}>Returns</Link>
            </li>
            <li>
              <Link to={'/'}>About</Link>
            </li>
          </ul>
        </li>
        <li className="footer-list__item">
          <h1 className="footer-list__title">Newsletter</h1>
          <form action="">
            <input type="text" name="" id="" placeholder="Enter Your Email Address"/>
            <input type="submit"  value={'SUBSCRIBE'}/>
          </form>
        </li>
      </ul>
      <div className="copy-right">
        <p>2023 furino. All rights reverved</p>
      </div>
    </div>
  )
}

export default Footer