# myRetail
myRetail is a vertical slice of an online retail store. This consists of a product detail page with the ability to add the product to the user's cart. 

## Installation
Run `npm install` in both `client` and `server` directories

## Running
Run `npm start` in the `server` directory

#### Production
Run `npm build:prd` in `client` then go to `localhost:3000`. The app will redirect to a product detail page (PDP) with a hard-coded product id to simulate a PDP url. 

#### Deploying

**Proposed CI flow:**

![CI Flow](./myretail-ci-flow.png?raw=true)

#### Development
Run `npm start` in `client`. This will start a `webpack-dev-server` server instance and automatically open a new browser window.

## Design decisions
**Stack**:
* React
* Redux
* Styled-Components
* Jest + Enzyme and WebdriverIO for testing

Since the focus of this app is on the front-end, the Express server is very minimal. Some basic APIs are available such as `addToCart`, but as far as persistence goes, it's all in-memory and simply serves to enable the front-end to function realistically.

I chose Redux since I don't have as much experience with it as I would like given its popularity and utility, but for a small, self-contained project like this I think Redux is unnecessary and overcomplicates things. However it can lay the foundation for future features - and in our pretend case-study this is intended to be a jumping off point future enhancements. 
A simpler and easier to understand approach might be to use React's context API its own inside containers. The selectors, however, are still handy given the gnarly structure of the dummy json response. Another improvement would be to do as much data processing on the server as possible, such as parsing dates and rearranging the data how the UI most easily consume it.
## Tests
`npm test` for unit tests and `npm run e2e` for end-to-end tests. Be sure to start the node server and stop the webpack-dev-server before running `e2e`. 

## Improvements
* Improve responsiveness implementation
* Increase test coverage :)
* Production webpack config could be more optimized. We could trim the dependencies more as well - for example, dayjs could be dropped in favor of parsing dates on the server.
* The "ceremony" in handling the state from `WithProduct` is a bit much, especially with duplication of props from `ProductContainer` to `ProductDetail`. One quick solution would be to remove ProductContainer and use `WithProduct` with `ProductDetail`
* One of the the weakest parts of the app functionality-wise is the error handling.
* Even though the design mockup doesn't have a visible indicator of how many items are in the cart, I think its necessary.
* Add accessability affordances (bring in react-a11y to assess)
* Adopting TypeScript for static typing. I'd prefer it over Flow simply due to stronger overall support
* For a real app, the structure would need to be rearranged so ProductContainer isn't the core, but just another page. We could also use React-Router if we wanted this to be an single page app.