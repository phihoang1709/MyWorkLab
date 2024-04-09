import SectionLayout from '../../layouts/SectionLayout'
const Shop = () => {
  return (
    <SectionLayout className='shop' title='Shop'>
      <ul className="shop-list">
        <li className="shop-list__item">
        <img src={'../../public/assets/shop1.svg'}/>
        </li>
        <li className="shop-list__item">
        <img src={'../../public/assets/shop2.svg'}/>

        </li>
        <li className="shop-list__item">
        <img src={'../../public/assets/shop3.svg'}/>

        </li>
        <li className="shop-list__item">
        <img src={'../../public/assets/shop4.svg'}/>

        </li>
      </ul>
  </SectionLayout>
  )
}

export default Shop