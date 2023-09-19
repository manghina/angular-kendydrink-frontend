# Using /product
This endpoint handles the single products in the database.<br>
**NOTE**: everywhere you see `{id}` you shoud replace it with the acual id of the product.


## GET /product/{id}
Get information about a product.

### Request Body Parameters
The resource doesn't need any parameter.

### Responses
* 200
    * The product was found and it is returned in the response body.
    * Body:
    ```json
    {
        "id":1,
        "name":"Product Name",
        "price":13.90,
        "description":"The full description of the product",
        "short_description":"A short description",
        "category_id":1
    }
    ```

## GET /product/{id}/img/{scaling}
Get the image of a product.
Replace `{scaling}` with the percentile (without `%`) of the product image

### Request Body Parameters
The resource doesn't need any parameter.

### Responses
* 200
    * The image is returned in the body
    * Mime Type: `image/png`