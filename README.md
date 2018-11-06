# myRetail
myRetail is a vertical slice of an online retail store. This consists of a product detail page with the ability to add the product to the user's cart. 

## Installation
Run `npm install` in both `client` and `server` directories

## Running
Run `npm start` in the `server` directory

### Production
Run `npm build:prd` in `client` then go to `localhost:3000`. The app will redirect to a product detail page (PDP) with a hard-coded product id to simulate a PDP url. 

### Development
Run `npm start` in `client`. This will start a `webpack-dev-server` server instance and automatically open a new browser window.

## Design decisions
Since the focus of this app is on the front-end, the Express server is very minimal. Some basic APIs are available such as `addToCart`, but as far as persistence goes, it's all in-memory and simply serves to enable the front-end to function realistically.

For a self-contained project like this, Redux is unnecessary and overcomplicates things, but it can also lay the foundation for future features - and in our pretend case-study this is intended to be a jumping off point future enhancements.

## Improvements
* Improve responsiveness implementation
* Increase test coverage :)
* The "ceremony" in handling the state from `WithProduct` is a bit much, especially with duplication of props from `ProductContainer` to `ProductDetail`. One quick solution would be to remove ProductContainer and use `WithProduct` with `ProductDetail`
* One of the the weakest parts of the app functionality-wise is the error handling.
* Even though the design mockup doesn't have a visible indicator of how many items are in the cart, I think its necessary.
* Add accessability affordances (bring in react-a11y to assess)