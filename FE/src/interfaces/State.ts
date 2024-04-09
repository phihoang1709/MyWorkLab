/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDataProduct {
    _id: string,
    name : string;
    price: number;
    category: string;
    image: string;
} 
export interface IDataProductsState{
    productDataState : IDataProduct;

    allProductsDataState:  any;
    // allProductsDataState:  IDataProduct[];


    getAllProductData : (data:any) => void;
    getProductData: (data:any) => void;
    // storeProductData: () => void;
    // editProductData: (id: string, newVal : IDataProduct) => void;
    // deleteProductData: (id: string) => void
}

// export interface IDataUser {

// }