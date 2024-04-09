/* eslint-disable @typescript-eslint/no-explicit-any */

const ShopList = ({ children }: any) => {
    return (
        <>
            <div className='shop-main-list'>
                {children}
            </div>
            <div className='pagination'>
                <button className='pagination_btn'>1</button>
                <button className='pagination_btn'>2</button>
                <button className='pagination_btn'>3</button>
                <button className='pagination_btn'>Next</button>
            </div>
        </>

    )
}

export default ShopList