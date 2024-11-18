import { revalidateTag } from "next/cache";

export default async function getSearchResult(query, from, to, guests) {
    const response = await fetch(`http://localhost:8080/api/hotels/searchResult?query=${query}&from=${from}&to=${to}&guests=${guests}`, {
        method: "GET",
        headers: {
            cache: "no-cache",
        },
        next : { tags: ["searchresult"] }
    });

    revalidateTag("searchresult");

    return response.json();
}

