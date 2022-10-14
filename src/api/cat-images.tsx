import axios from "axios";
// import { useEffect, useState } from "react";

export interface CatImage {
    artist_href: string,
    artist_name: string,
    source_url: string,
    url: string
};

interface CatImageArray {
    results: CatImage[];
};

export const getCatImage = (): Promise<CatImage> =>
    axios
        .get<CatImageArray>('/neko', {
            baseURL: 'https://nekos.best/api/v2',
        })
        .then(response => {
            console.log(response.data.results[0]);
            return response.data.results[0];
        })

// export async function getCatImage(): Promise<CatImage> {
//     try {
//         const url = "https://nekos.best/api/v2/neko";
//         const response = await axios.get<CatImageArray>(url);
//         console.log(response.data.results[0])
//         return response.data.results[0];
//     } catch (err) {
//         console.log(err);
//         return {
//             artist_href: "",
//             artist_name: "",
//             source_url: "",
//             url: ""
//         };
//     }
// }
