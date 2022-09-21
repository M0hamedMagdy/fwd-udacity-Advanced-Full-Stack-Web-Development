### How to build, test andrun the api

- To install dependencies: `npm install`
- Build: `npm run build`
- Run tests: `npm run test`
- Start server: `npm run start`
- Lint: `npm run lint`
- Prettify: `npm run prettify`

### EndPoints

The server will run on port 3000:

http://localhost:3000/

#### Endpoint to resize images

http://localhost:3000/api/images

Expected query arguments are:

- _filename_:
- _width_:
- _height_:

#### Example 1

http://localhost:3000/api/images
Will display an error and list available image names

#### Example 2

http://localhost:3000/api/images?filename=fjord
Will display the original fjord image.

#### Example 3

http://localhost:3000/api/images?filename=fjord&width=200&height=200
Will resize the fjord image to 200 by 200 pixels and store the resulting image.

#### Example 4

http://localhost:3000/api/images?filename=fjord&width=-200&height=200
Invalid width parameter that will display an error.

#### Example 5

http://localhost:3000/api/images?filename=fjord&width=200
Missing height parameter that will display an error.

- Image thumbs will be stored in `assets/images/thumb`
