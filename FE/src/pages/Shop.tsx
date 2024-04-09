import Header from '../components/Header';
import Banner from '../components/Shoppage/Banner';
import Footer from '../components/Footer';
import Services from '../components/Services';
import ShopList from '../components/Shoppage/ShopList';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { IDataProduct } from '../interfaces/State';
import { fetcher } from '../utilities/swrExcute';
import useSWR from "swr";
const Shop = () => {
    const { data, isLoading} = useSWR(
        `${import.meta.env.VITE_API_URL}/products?page=999`,
        async () => await fetcher(`${import.meta.env.VITE_API_URL}/products?page=999`)
    );
    console.log(data);
    return (
        <div className="container">
            <Header />
            <Banner />

            {!isLoading ? (<ShopList>
                {data?.products ? (
                    <ul className="news__list">
                        {data?.products?.map((e : IDataProduct) => (
                            <li className="news__item">
                                <Link to={'/detail/'+ e?._id}>
                                    <Card sale={-10} title={e?.name} cate={e?.category} price={e?.price} image={e?.image} />
                                </Link>
                            </li>
                        ))}

                    </ul>
                ) : (<h1>Not Found</h1>)}
            </ShopList>) : (<h1>Loading...</h1>)}
            <Services />
            <Footer />
        </div>
    )
}

export default Shop