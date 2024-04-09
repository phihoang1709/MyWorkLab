const Services = () => {
  return (
    <div className='services'>
      <ul className="services-menu">
        <li className="services-item">
          <i className="fa-solid fa-trophy"></i>
          <div className="services-item__content">
            <h1>High Quality</h1>
            <p>crafted from top materials</p>
          </div>
        </li>
        <li className="services-item">
          <i className="fa-regular fa-circle-check"></i>
          <div className="services-item__content">
            <h1>Warranty Protection</h1>
            <p>Over 2 years</p>
          </div>
        </li>
        <li className="services-item">
          <i className="fa-solid fa-gifts"></i>
          <div className="services-item__content">
            <h1>Free Shipping</h1>
            <p>Order over 150 $</p>
          </div>
        </li>
        <li className="services-item">
          <i className="fa-solid fa-user-astronaut"></i>
          <div className="services-item__content">
            <h1>24 / 7 Support</h1>
            <p>Dedicated support</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Services