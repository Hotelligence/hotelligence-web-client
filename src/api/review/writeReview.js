import { revalidateTag } from 'next/cache'

export default async function writeReview(roomId, reviewData) {
    try {
        const response = await fetch(`http://localhost:8080/api/reviews/writeReview/${roomId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData),
            next : { tags: ["reviewList"] }
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        revalidateTag('reviewList');
        const reviewResult = JSON.stringify(reviewData, null, 2);
        return reviewResult;
        
    } catch (error) {
        console.error('Error placing booking:', error);
        throw error;  // Re-throw the error after logging it
    }
}