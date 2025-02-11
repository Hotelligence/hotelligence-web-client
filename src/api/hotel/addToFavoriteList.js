export default async function addToFavoriteList(userId, hotelId) {
  if (!userId || !hotelId) {
    console.error("Missing required parameters");
    return false;
  }

  try {
    await fetch(
      `http://localhost:8080/api/favorites/addToFavoriteList/${userId}/${hotelId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      }
    );
    return true;
  } catch (error) {
    console.error("Error adding to favorite list:", error);
    return false;
  }
}
