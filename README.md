# Node proxy server

## About

A Node proxy server for a simple weather application. If the weather application communicates directly with the OpenWeather API,
it would expose the API key in the source code. In order to avoid that, the application makes a request to our proxy server, which
in turn makes the request to the OpenWeather API on behalf of the application. The API key is stored on the proxy server as an
environment variable (see `.env.example` for which environment variables are needed).

Also, since the requests must go through the proxy server, a rate limiter and API cache is implemented, in order to reduce the
amount of API calls to OpenWeather. This is done with `express-rate-limit` and `apicache`. Notice that the API cache also reduces
response time, since no request is made to the OpenWeather API.

## Running locally

Run the server locally with `npm run` or, for ease of development, run it with `nodemon` with `npm run dev`.

## Demo

[https://weather-proxy.onrender.com/](https://weather-proxy.onrender.com/).

Look at the Network tab on the DevTools. If you request weather information for the same city twice, you'll receive some special headers with the response:

```bash
X-Ratelimit-Limit: 100          // Limit to 100 requests per time frame
X-Ratelimit-Remaining: 96       // Remaining requests in the current time frame
X-Ratelimit-Reset: 1649518820   // UNIX time (epoch) at which the next time frame starts
```

and

```bash
Cache-Control: max-age=108    // Time (in seconds) during which the proxy server will cache this response
```

## Acknowledgment

Thanks to [Brad Traversy](https://github.com/bradtraversy) for his [tutorial](https://www.youtube.com/watch?v=ZGymN8aFsv4).
