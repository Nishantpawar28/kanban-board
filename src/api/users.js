import axios from "axios";

export default axios.create({
    baseURL: localStorage.getItem("mode") !== "local" ? "https://my-json-server.typicode.com/Mr3111/mocker" : "http://localhost:3005",
});
