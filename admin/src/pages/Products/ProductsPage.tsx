import PageLayout from "../../layouts/PageLayout";
import Table from "../../components/Table";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import useSWR from "swr";
import { fetcher, excute } from "../../utilities/swrExcute";
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";


const ProductsPage = () => {

    const header = {
        attributes: ["Products name", "Price", "Category", "Attributes", "Image"],
        path: "products"
    };
    const { register, handleSubmit, reset, control } = useForm();
    const [isShowModalAttr, setShowModalAttr] = useState(false);
    const [isShowModalDes, setShowModalDes] = useState(true);

    const initialAttribute = {
        size: 0,
        color: "",
        stock: 0
    }

    const [attributes, setAttributes] = useState([]);
    const [attribute, setAttribute] = useState(initialAttribute);


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');

    const { data, isLoading, mutate } = useSWR(
        `${import.meta.env.VITE_API_URL}/products?page=${page}`,
        async () => await fetcher(`${import.meta.env.VITE_API_URL}/products?page=${page}`)
    );

    const { data: cateData } = useSWR(
        `${import.meta.env.VITE_API_URL}/categories?page=${page}`,
        async () => await fetcher(`${import.meta.env.VITE_API_URL}/categories?page=999`)
    );

    const onDelete = async (id: string) => {
        try {
            await excute(`${import.meta.env.VITE_API_URL}/products`, id, null, mutate, "products")
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = async (formData: any) => {
        try {
            const formDataImg = new FormData();
            formDataImg.append('image', formData.image[0]);
            formData.image = `${import.meta.env.VITE_API_IMG_STORAGE}` + formData.image[0].name
            formData.attribute = attributes;

            const imgStatus = await axios.post(`${import.meta.env.VITE_API_URL}/products/uploads`, formDataImg,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            await excute(`${import.meta.env.VITE_API_URL}/products`, "", formData, mutate, "products");
            alert("Upload successful");
            setAttributes([]);
            reset();
            console.log(formData);


        } catch (error) {
            console.error(error);
        }
    };

    const onSubmitAttr = (e) => {

        e.preventDefault();
        setAttributes([...attributes, attribute]);
        setAttribute(initialAttribute);
        setShowModalAttr(false);
    }

    const handleChangeAttr = (e) => {

        const { name, value } = e.target;
        setAttribute({
            ...attribute,
            [name]: value
        });
    }

    return (
        <PageLayout>
            <div className="p-0 sm:ml-64  h-[100%] dark:bg-gray-800">
                <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                        Products Page DashBoard
                    </p>
                </div>
                <form className="max-w-sm mx-auto mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
                        <input {...register('name')} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New product name" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product price</label>
                        <input {...register('price')} type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New product" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Attribute</label>
                        <div className={`${isShowModalAttr ? '' : 'hidden'} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Attribute Modal
                                        </h3>
                                        <button onClick={() => setShowModalAttr(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-5 space-y-4">
                                        <form className="max-w-sm mx-auto mb-4">

                                            <div className="mb-5">
                                                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product size</label>
                                                <input value={attribute.size} onChange={handleChangeAttr} type="number" name="size" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New size" required />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product color</label>
                                                <div style={{ backgroundColor: attribute.color }} className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer">

                                                    <input
                                                        value={attribute.color}
                                                        name="color"
                                                        type="color"
                                                        className="opacity-0 absolute cursor-pointer"
                                                        onChange={handleChangeAttr} />
                                                </div>
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product stock</label>
                                                <input value={attribute.stock} onChange={handleChangeAttr} type="number" name="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New stock" required />
                                            </div>
                                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                <button onClick={onSubmitAttr} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            setShowModalAttr(true);
                        }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add new attribute +</button>
                        {attributes.length > 0 && (
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Color
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Size
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Stock
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attributes?.map(e => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: e?.color }}></div>
                                                </div>
                                            </td>

                                            <td className="w-4 px-6">
                                                <div className="flex items-center">
                                                    {e?.size}
                                                </div>
                                            </td>
                                            <td className="w-4 px-6">
                                                <div className="flex items-center">
                                                    {e?.stock}
                                                </div>
                                            </td>

                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        )}

                    </div>
                    <div className="mb-5">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category name</label>
                        <select {...register('category')} name="category" id="cate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value={""}>Choose a category</option>
                            {cateData?.categories?.map(e => (
                                <option key={e?._id} value={e?.name}>{e?.name}</option>
                            ))}

                        </select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Image
                        </label>

                        <input type="file" id="file" {...register('image')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New category" required />
                    </div>
                    <div className="mb-5 w-full border-b-2 pb-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descriptions</label>
                        <div className={`${isShowModalDes ? '' : 'hidden'} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                            <div className="relative p-4 w-full max-w-2xl max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Description Modal
                                        </h3>
                                        <button onClick={() => setShowModalDes(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-5 space-y-4">

                                        <input {...register('description', { required: true })} id="description" className=" hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required />
                                        <Controller
                                            name="description"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <ReactQuill
                                                    theme="snow"
                                                    modules={{
                                                        toolbar: [
                                                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                            [{ size: [] }],
                                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                            [ { 'align': [] }],
                                                            [{ list: 'ordered'}, { list: 'bullet' }],
                                                            [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                                            { 'indent': '-1' }, { 'indent': '+1' }],
                                                            ['link', 'image', 'video'],
                                                            ['clean']
                                                        ],
                                                    }}
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button  onClick={(e)=> {
                            e.preventDefault();
                            setShowModalDes(true)
                        }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add new descriptions</button>


                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add new product</button>
                </form>
                {isLoading ? <h1>Loading data table...</h1> : (<Table header={header} data={data?.products} onDelete={onDelete} total={data?.total} total_pages={data?.total_pages} />)}

            </div>
        </PageLayout>

    )
}

export default ProductsPage