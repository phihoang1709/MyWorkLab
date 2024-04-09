import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const EditProductsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, setValue } = useForm();

    const { data: cateData, isLoading: cateIsLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories?page=999`);
                return data;
            } catch (error) {
                console.error(error);
            }
        }
    });
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/drinks/${id}`);
                const { name, price, category, image } = response.data;
                setValue("name", name);
                setValue("price", price);
                setValue("category", category);
                setValue("image", image);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/drinks/${id}`, data);
            alert("Drink updated successfully!");
            navigate('/drinks')
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };
    return (
        <PageLayout>
            <div className="px-10 sm:ml-64">
                <div className="flex flex-col items-center justify-center h-48 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                        Edit Drink Categories Page DashBoard
                    </p>
                </div>
                <form className="max-w-sm mx-auto mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Drink name</label>
                        <input {...register('name')} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New drink name" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Drink price</label>
                        <input {...register('price')} type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New drink" required />
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
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                        <input {...register('image')} name="image" type="text" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New drink image" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                    <Link to={'/drinks'} className="mx-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Go back</Link>
                </form>
            </div>
        </PageLayout>
    )
}

export default EditProductsPage