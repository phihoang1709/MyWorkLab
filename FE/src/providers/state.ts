/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand';
import { IDataProductsState, IDataProduct } from '../interfaces/State';
const initialState : IDataProduct  = {
    _id: '',
    name : '',
    price: 0,
    category: '',
    image: ''
};

export const dataStore = create<IDataProductsState>((set)=>({
    productDataState: initialState,
    allProductsDataState: [],
    getAllProductData: (data:any) => {
        set({allProductsDataState: [...data]})
    },

    getProductData: (data:any) => {
        set({productDataState: {...data}});
    },

    // storeProductData: async () => {
    //     await axios.post(`${Locals().apiUrl}`);
    // },

    // editProductData: async(id: string, newVal : IDataProduct) => {
    //     await axios.put(`${Locals().apiUrl}/${id}`, newVal);
    // },

    // deleteProductData: async(id: string) => {
    //     await axios.delete(`${Locals().apiUrl}/${id}`);
    // }
    
}));