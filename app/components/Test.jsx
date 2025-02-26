import { useEffect, useRef } from "react";

const fetchData = (url, controller) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        console.log(`Fetched from ${url}`, data);
        resolve(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(`Request aborted: ${url}`);
        } else {
          reject(error);
        }
      }
    }, 5000); // Độ trễ 0.5s
  });
};

export default function TestComponent() {
  const controllers = useRef([
    new AbortController(),
    new AbortController(),
    new AbortController(),
  ]);

  // useEffect(() => {
  //   const urls = ["/api/category", "/api/category", "/api/category"];

  //   urls.forEach((url, index) => {
  //     fetchData(url, controllers.current[index]);
  //   });

  //   return () => {
  //     controllers.current.forEach((controller) => controller.abort()); // Hủy tất cả request khi unmount
  //   };
  // }, []);

  return <div>Fetching APIs...</div>;
}
