import React from "react";
export interface ISectionLayout { 
    className : string;
    title : string;
    children : React.ReactNode
}

export interface ICart{
    sale: number;
    title: string;
    cate: string;
    price: number;
    image:string;
}