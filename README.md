# have-you-tried

When you have no results, have you tried will show machine learning query suggestions to try.

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/have-you-tried
```

2. Use the Component or extend it

Typescript:

```javascript
import { HaveYouTried, IHaveYouTriedOptions } from '@coveops/have-you-tried';
```

Javascript

```javascript
const have-you-tried = require('@coveops/have-you-tried').HaveYouTried;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/have-you-tried'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/have-you-tried@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the component in your template as follows:



```html
<div class="CoveoHaveYouTried"></div>
```


## Options

The following options can be configured:

| Option | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | No | string | `<b>No results?</b> You can also try:` | Title rendered |



## Extending

Extending the component can be done as follows:

```javascript
import { HaveYouTried, IHaveYouTriedOptions } from "@coveops/have-you-tried";

export interface IExtendedHaveYouTriedOptions extends IHaveYouTriedOptions {}

export class ExtendedHaveYouTried extends HaveYouTried {}
```


The following methods can be extended to provide additional functionalities or handle more complex use cases.

### applyCommunityUrlRewriter

```javascript
protected renderTitle():string
```

The `renderTitle` should render the title for the component.


## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`
