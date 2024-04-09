const Banner = () => {
    return (
      <div className='shop-banner'>
        <div className='shop-banner__content'>
          <h1>Shop</h1>
          <p>Home  {' > '}  Shop</p>
        </div>
        <div className="shop-banner-filter">
            <div className="filter">
                <ul className="filter-list">
                    <li className="filter-list__item">
                      <i className="fa-solid fa-bars"></i> Filter
                    </li>
                    <li className="filter-list__item">
                        <i className="fa-brands fa-microsoft"></i>
                    </li>
                    <li className="filter-list__item">
                        <i className="fa-solid fa-tv"></i>
                    </li>
                </ul>
                
                <p>Showing 1–16 of 32 results</p>
            </div>
            <div className="filter-form">
                <label htmlFor="">
                    Show
                    <input type="number" name="" id="" placeholder="16" />
                </label>
                <label htmlFor="">
                    Short by
                    <input type="text" name="" id="" placeholder="Default"/>
                </label>
            </div>
        </div>
      </div>
    )
  }
  
  export default Banner