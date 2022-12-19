import axios from "axios";

export default axios.create({
  baseURL: "https://vast-basin-98801.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});