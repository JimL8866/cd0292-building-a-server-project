# Image Processing API Project

## API endpoint:
1. main route: http://localhost:8000/api  
it will show "main route is running"  
2. image resize: http://localhost:8000/api/images?filename=fjord&width=200&height=200  
it will show the resized picture at 500 width and 500 height  
it will create a resized image under thumbnail folder  
if continue reach the same endpoint, the cached image is loaded, and console will log "Serving cached images"  

## Scripts:
1. npm run test   
it will show all 4 tests passed
2. npm run lint  
run eslint and showing no errors
3. npm run prettier  
it will show files has been formatted successfully
4. npm start  
it will open dev server on port 8000
5. npm run build && node ./dist/app.js  
it will open build server on port 8000
