export default async function returnVNPay(bookingId) {
    const response = await fetch(`http://localhost:8080/api/payments/paymentStatus/${bookingId}`);

    if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
    }

    const returnUrl = await response.text();
    console.log(returnUrl);
    return returnUrl;
}