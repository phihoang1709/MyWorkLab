import Banner from '../components/Homepage/Banner';
import Blog from "../components/Homepage/Blog";
import Header from "../components/Header";
import News from "../components/Homepage/News";
import Services from "../components/Services";
import Shop from "../components/Homepage/Shop";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="container">
    <Header/>
    <Banner/>
    <News/>
    <Shop/>
    <Blog/>
    <Services/>
    <Footer/>
  </div>
  )
}

export default HomePage