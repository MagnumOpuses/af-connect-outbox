![alt text][logo]

[logo]: https://github.com/MagnumOpuses/project-meta/blob/master/img/jobtechdev_black.png "JobTech dev logo"
[A JobTech Project](https://www.jobtechdev.se)

# AF-Connect Outbox

AF-Connect Outbox is a internerl cache service used by AF-Connect and AF-Portability to cache the envelop CV data [AF-Connect Outbox](https://github.com/MagnumOpuses/af-connect-outbox/).

## Versions, current dev state and future

No versions yet.

## Getting started

No getting started guidelines yet.

### Prerequisites

Install docker and docker-compose in your machine

### Installation

```bash
git clone https://github.com/MagnumOpuses/af-connect-outbox.git
cd af-connect-outbox
```

Create a file called `.env` in the project's root directory
And Paste the following line:
```bash
PORT=8100
```
Then run the following command
```bash
docker-compose up
```
Then open `localhost:8100` in the browser.
For successful installation you will the following line
```bash
AF-connect-outbox is alive
```


## Development
After making changes and see it's effect, do the following

Quit the running project by typing `ctrl + c` and then
```bash
docker-compose build
docker-compose up
```

## API Specification
1. `\registerToken` POST API for registering the session token with some value.
The body is JSON Object like the following
```javascript
{
    "token": String, // required
    "value": String  // Optional
}
```

2. `\envelop?sessionToken={sessionToken}` GET API for getting the value that is stored against the token. If no value found api will return null.



## Test

No tests yet.

## Built with

  - [Node.js v10.15.3](https://nodejs.org/) (Runtime environment)
  - [NPM v6.4.1](https://www.npmjs.com/) (Node package manager)
  - [Express v4.17.1](https://expressjs.com/) (Web application framework)
  - [Redis](https://redis.io/) (Open Source In-memoriy data store)

## Contributing

We would love if you'd like to help us build and improve this product for the benefit of everyone. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

Any contributions, feedback and suggestions are more than welcome.

Please read our guidelines for contribution [here](CONTRIBUTING_TEMPLATE.md).

## License

[Apache License 2.0](LICENSE.md)

## Acknowledgments

No acknowledgments yet.
