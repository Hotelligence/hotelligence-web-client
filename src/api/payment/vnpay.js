export default async function handleVNPayPayment(amount, orderInfo, bookingId) {
    const vnPayRequest = {
        amount: amount,
        orderInfo: orderInfo,
    }
    
    try {
        const response = await fetch(`http://localhost:8080/api/payments/submitOrder/${bookingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(vnPayRequest)
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const paymentUrl = await response.text();

        

        return paymentUrl;
    } catch (error) {
        console.error('Error:', error);
    }
}