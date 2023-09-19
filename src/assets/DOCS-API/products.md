# Using /products
This endpoint handles the products in the database.

## GET /products
Get information about all the products in the database.

### Request Body Parameters
The resource doesn't need any parameter.

### Responses
* 200
    * The products are returned in the body.
    * Body:
    ```json
    [
        {
            "id":1,
            "name":"Product Name",
            "price":13.90,
            "description":"The full description of the product",
            "short_description":"A short description",
            "category_id":1
        },
        {
            "id":2,
            "name":"Product Name 2",
            "price":12.30,
            "description":"The full description of the product",
            "short_description":"A short description",
            "category_id":2
        }
    ]
    ```

## GET /products/{category_id}
Get information about all the products in the database of a category (`{category_id}`).

### Available category ids
* 1: Linea Frutti
* 2: Linea Step
* 3: Dessert e Granite

### Request Body Parameters
The resource doesn't need any parameter.

### Responses
* 200
    * The products are returned in the body.
    * Body:
    ```json
    [
        {
            "id":1,
            "name":"Product Name",
            "price":13.90,
            "description":"The full description of the product",
            "short_description":"A short description",
            "category_id":{category_id}
        },
        {
            "id":2,
            "name":"Product Name 2",
            "price":12.30,
            "description":"The full description of the product",
            "short_description":"A short description",
            "category_id":{category_id}
        }
    ]
    ```