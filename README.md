# SurveyPlanet API examples
A collection of sample api requests in different programming languages

## API Keys
Enterprise users can create API Keys to get full access to the SurveyPlanet API and all your survey data. Follow the steps below to create API Keys for your account.

### Create API Keys
1. Login
1. Click on the Menu icon  in the top right corner.
1. In the sub-menu click  Account
1. Once on the Account page click the API Keys tab.
1. Click new New Keys button at the bottom of the page.
1. Once the modal window is open download your keys or copy them to your clipboard.
It’s important that you save your API Keys in a safe and secure place. You will not see your Client Secret again and it cannot be recovered later.

### Using API Keys
You can authenticate to the SurveyPlanet API by providing your API Client Key and Client Secret in a request. See our [API Documentation](https://api-docs.surveyplanet.com) for details. You can obtain both key and secret on the Account Settings page. Once these requirements are submitted, an access token will be returned which you can use to make further requests to the API. Access tokens are valid for 30 minutes.


## Examples:

### cUrl

```sh
./surveyplanet-api-test.sh <API_KEY> <API_SECRET>
```

### Node.js / Javascript

```sh
node ./surveyplanet-api-test.mjs <API_KEY> <API_SECRET>
```

#### Node.js with Docker

```sh
docker run -it --rm -v ${PWD}:/app -w /app node:latest node ./surveyplanet-api-test.mjs <API_KEY> <API_SECRET>
```

### Python

```sh
python ./surveyplanet-api-test.py <API_KEY> <API_SECRET>
```

#### Python with Docker

```sh
docker run -it --rm -v ${PWD}:/app -w /app python:3.9 /bin/bash -c "pip install requests && python ./surveyplanet-api-test.py <API_KEY> <API_SECRET>"
```

### PHP

```sh
php ./test/surveyplanet-api-test.php <API_KEY> <API_SECRET>
```

#### PHP with Docker:

```sh
docker container run --rm -v $(pwd):/app/ php:cli php /app/surveyplanet-api-test.php <API_KEY> <API_SECRET>
```