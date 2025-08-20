const fetch = require("node-fetch");

async function testNewsAPI() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  console.log("Testing News API...");
  console.log("Base URL:", baseUrl);

  try {
    // Test 1: Get all news
    console.log("\n1. Testing GET /api/news...");
    const allNewsResponse = await fetch(`${baseUrl}/api/news`);
    console.log("Status:", allNewsResponse.status);
    console.log(
      "Headers:",
      Object.fromEntries(allNewsResponse.headers.entries())
    );

    if (allNewsResponse.ok) {
      const allNews = await allNewsResponse.json();
      console.log(
        "News count:",
        allNews.data ? allNews.data.length : allNews.length
      );

      // Test 2: Get specific news if available
      if (allNews.data && allNews.data.length > 0) {
        const firstNewsId = allNews.data[0].id;
        console.log("\n2. Testing GET /api/news/" + firstNewsId + "...");

        const singleNewsResponse = await fetch(
          `${baseUrl}/api/news/${firstNewsId}`
        );
        console.log("Status:", singleNewsResponse.status);

        if (singleNewsResponse.ok) {
          const singleNews = await singleNewsResponse.json();
          console.log("Single news title:", singleNews.title);
        } else {
          console.log("Error response:", singleNewsResponse.statusText);
        }
      } else if (allNews.length > 0) {
        const firstNewsId = allNews[0].id;
        console.log("\n2. Testing GET /api/news/" + firstNewsId + "...");

        const singleNewsResponse = await fetch(
          `${baseUrl}/api/news/${firstNewsId}`
        );
        console.log("Status:", singleNewsResponse.status);

        if (singleNewsResponse.ok) {
          const singleNews = await singleNewsResponse.json();
          console.log("Single news title:", singleNews.title);
        } else {
          console.log("Error response:", singleNewsResponse.statusText);
        }
      }
    } else {
      console.log("Error getting all news:", allNewsResponse.statusText);
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

// Run the test
testNewsAPI();
