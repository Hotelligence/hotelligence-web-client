export default async function addToComparisonList(userId, roomId) {
  if (!userId || !roomId) {
    console.error("Missing required parameters");
    return false;
  }

  try {
    await fetch(
      `http://localhost:8080/api/comparisons/addToComparisonList/${userId}/${roomId}`,
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
