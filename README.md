# postman-request-sorter

Sort Postman collections

## Usage

1. In Postman, export your collection as a Collection v2.1
1. Run:

   `npx @matthewlein/postman-collection-sorter ./path/to/your/API.postman_collection.json`

1. You should see output like:

```
Sorting collection file:  ./path/to/your/API.postman_collection.json
Sorting Successful!
Sorted collection saved to: ./path/to/your/API.postman_collection.sorted.json
```

4. In Postman, import the new sorted JSON file.
