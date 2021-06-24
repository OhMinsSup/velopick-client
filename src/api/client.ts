import axios from "axios";

const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5500/api/"
    : process.env.REACT_APP_API_HOST || "/";

const client = axios.create({
  baseURL: host,
  withCredentials: true,
});

// * 요청이 발생하기 전에 작동합니다.
client.interceptors.request.use(
  (config) => {
    // * 브라우저에서 개발 중에 어떠한 요청이 송신되고 있는지를 알려줍니다.
    console.log(
      `%c📦 API 요청 송신  주소:${
        config.url
      } 유형:${config.method?.toUpperCase()}`,
      "color: #E19A56;"
    );
    return config;
  },
  (error) => {
    const now = new Date();
    console.error(
      `${now.toISOString()} [ ${error.config.method.toUpperCase()} ] :`,
      error.request.path
    );
    console.log("\n[ Stack ] : ", error);

    if (error.request) {
      console.log("\n[ RequestHeader ] : ", error.request._header);
    }

    if (error.config) {
      console.log("\n[ ConfigHeader ] : ", error.config.headers);
      console.log("\n[ RequestQuery ] : ", error.config.params);
      console.log("\n[ RequestBody ] : ", error.config.data);
    }

    if (error.response) {
      console.log("\n[ ResponseHeader ] : ", error.response.headers);
      console.log("\n[ ResponseData ] : ", error.response.data);
    }

    console.log("======================================================\n");

    return Promise.reject(error);
  }
);

// * 요청이 발생한 후에 작동합니다.
client.interceptors.response.use(
  (response) => {
    // * 브라우저에서 개발 중에 어떠한 응답이 수신되고 있는지를 알려줍니다.
    console.log(
      `%c📫 API 응답 수신  주소:${
        response.config.url
      } 유형:${response.config.method?.toUpperCase()}`,
      "color: #31B4D9;"
    );
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
