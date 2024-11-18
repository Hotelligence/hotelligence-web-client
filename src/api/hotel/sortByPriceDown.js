import getSearchResult from "../getSearchResult";

export default async function sortByPriceDown() {
    const response = await fetch(`http://localhost:8080/api/hotels/sortByDiscountPriceDesc`, {
        method: "GET",
        headers: {
            cache: 'no-cache',
        }
    });
    const hotel = awa

}