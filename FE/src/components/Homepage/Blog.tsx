import { Link } from 'react-router-dom';
import SectionLayout from '../../layouts/SectionLayout';
const Blog = () => {
  return (
    <SectionLayout className='blog' title='Blog'>
      <ul className="blog-list">
        <li className="blog-item">
          <img src="../../public/assets/blog1.svg" alt="" />
          <div className="blog-item__content">
            <h1 className=''>THE ULTIMATE SOFA BUYING GUIDE</h1>
            <p className=''></p>
            <div className='blog-item__btn'>
              <Link to={'#'}>About <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>

        </li>
        <li className="blog-item">
          <img src="../../public/assets/blog2.svg" alt="" />
          <div className="blog-item__content">
            <h1 className=''>A BEDROOM MUST HAVE SOME THING LIKE THIS</h1>
            <p className=''>Your level of comfort when geting into and out of bed can be greatly influenced by the bed frame you choose. It may significantly affect how  want your bedroom to feet and look</p>
            <div className='blog-item__btn'>
              <Link to={'#'}>About <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>
        </li>
        <li className="blog-item">
          <img src="../../public/assets/blog3.svg" alt="" />
          <div className="blog-item__content">
            <h1 className=''>WHY IS A TV CONSOLE A MUST IN EVERY HOUSE</h1>
            <p className=''>People do a lot of research to make sure they purchase the ideal
              televisoin. And like the rest of us, you want to keep that gorgeous flat srceen in your living or bedroom on a table or stand</p>
            <div className='blog-item__btn'>
              <Link to={'#'}>About <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>
        </li>
      </ul>
    </SectionLayout>
  )
}

export default Blog