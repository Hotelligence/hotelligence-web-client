export default async function removeFromComparisonList(userId, roomId) {
  if (!userId || !roomId) {
    console.error("Missing required parameters");
    return false;
  }

  try {
    await fetch(
      `http://localhost:8080/api/comparisons/removeFromComparisonList/${userId}/${roomId}`,
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
