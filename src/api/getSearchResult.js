import { revalidateTag } from "next/cache";

export default async function getSearchResult(query, from, to, guests, sortBy, sortOrder, minPrice, maxPrice, minRatingScore, stars) {
    const params = new URLSearchParams();
    
    // Only add parameters that are defined and not empty
    if (query) params.append('query', query);
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (guests) params.append('guests', guests);
    if (sortBy) params.append('sortBy', sortBy);
    if (sortOrder) params.append('sortOrder', sortOrder);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (minRatingScore) params.append('minRatingScore', minRatingScore);
    if (stars) params.append('stars', stars);

    const response = await fetch(`http://localhost:8080/api/hotels/searchResult?${params.toString()}`, {
        method: "GET",
        headers: {
            cache: "no-cache",
        },
        next: { tags: ["searchresult"] }
    });

    revalidateTag("searchresult");

    return response.json();
}

