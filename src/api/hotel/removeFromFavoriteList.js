export default async function removeFromFavoriteList(userId, hotelId) {
  if (!userId || !hotelId) {
    console.error("Missing required parameters");
    return false;
  }

  try {
    await fetch(
      `http://localhost:8080/api/favorites/removeFromFavoriteList/${userId}/${hotelId}`,
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
    console.error("Error removing from favorite list:", error);
    return false;
  }
}
