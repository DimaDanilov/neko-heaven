import axios from "axios";

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
