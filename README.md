# REST OpenAPI Example

## Usage

### Server

To run the server:

```
npm run server
```

#### Testing the API

To retrieve the list of books:

```
curl http://localhost:3000/books | jq
```

To retrieve a specific book:

```
curl http://localhost:3000/books/1 | jq
```

To create a new book:

```
curl -s --request POST --url http://localhost:3000/books --header 'content-type: application/json' --data '{"id": 2, "title" : "New book", "author": "New author", "summary" : "This is a new Book"}' | jq
```

#### Swagger UI

You can visit the Swagger generated documentation at this link:

http://localhost:3000/api-docs

## Client

To generate the OpenAPI clients (that could be imported directly in any TS project):

```
npm run generate-client
```
