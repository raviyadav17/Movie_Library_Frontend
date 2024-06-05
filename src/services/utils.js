import { jwtDecode } from "jwt-decode";

// Example utility function to handle JWT decoding
export const decodeJWT = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    throw error;
  }
};

// Utility function to capitalize keys
export const capitalizeKeys = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === 'imdbID') {
        newObj[key] = obj[key];  // Keep 'imdbID' as is
      } else {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        newObj[capitalizedKey] = obj[key];
      }
    }
  }
  return newObj;
};

