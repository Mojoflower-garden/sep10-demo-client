# Stellar SEP10 Demo Client

This demo implements the client side of a Stellar
[SEP10](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md).  
It is deployed from master to [https://mojoflower-garden.github.io/sep10-demo-client/](https://mojoflower-garden.github.io/sep10-demo-client/)

## Prerequisites

If you want to run it locally, you will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone git@github.com:mojoflower-garden/sep10-demo-client.git` this repository
* `cd sep10-demo-client`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

`ember deploy production`
