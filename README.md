# REST OpenAPI Example

## Usage

### Server

To run the server:

```
npm run server
```

To test the API:

```
curl http://localhost:3000/books | jq
```

You can visit the Swagger generated documentation at this link:

http://localhost:3000/api-docs

## Client

To generate the OpenAPI clients (that could be imported directly in any TS project):

```
npm run generate-client
```
