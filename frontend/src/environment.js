const server = process.env.NODE_ENV === "production"
    ? process.env.BACKEND_URL
    : "http://localhost:8000";

export default server;