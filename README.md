# @connectk12/ik12

This library provides a convenient way to connect to Informed K12's APIs.

> **Note:** This library is not officially supported by Informed K12. Use at your own risk.

## Installation

To install the library, run the following command:

```bash
npm install @connectk12/ik12
```

## Usage

To use this library, you need to set your Informed K12 API Key as an environment variable on the server. You can do this by creating a `.env` file in the root of your project and adding the following variables:

WARNINGS:
- Do not expose this API Key publicly on the client side.
- Do not commit the `.env` file to your repository and make sure it is added to your `.gitignore` file.
- Make sure to keep your API key secure and do not share it with others.

```bash
IK12_API_KEY=your_api_key
```


Then you can import the getCampaignResponses function or other available functions in your code:

```javascript
import { getCampaignResponses } from '@connectk12/ik12';
```


## API Documentation

For detailed information on the available API methods from Informed K12, please refer to the [API documentation](https://developer.informedk12.com/reference/campaign-responses-api).


## Get Started

Here are some examples to get you started:

### Example 1: Get responses from Campaign Responses API

```javascript
import { getCampaignResponses } from '@connectk12/ik12';
```

Inside an async function, call the function with the campaign ID (Example: 123)
```javascript
const responses = await getCampaignResponses(123);
```


### Example 2: Get archived responses from Campaign Responses API

```javascript
import { getCampaignResponses } from '@connectk12/ik12';
```

Inside an async function, call the function with the campaign ID (Example: 123) and status as `archived`
```javascript
const responses = await getCampaignResponses(123, {
  status: 'archived'
});
```

## API Details

### getCampaignResponses

This function retrieves responses for a specific campaign.

```javascript
getCampaignResponses(campaignId, options)
```

#### Required Parameters

- `campaignId`: The ID of the campaign to retrieve responses for.

#### Options

| Parameter               | Type    | Description                                                                                               |
| ----------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `status`                | String  | The status of the responses to retrieve. Possible values are `active` or `archived`. Default is `active`. |
| `completedAtStart`      | Date    | Return responses that were completed after this time.                                                     |
| `completedAtEnd`        | Date    | Return responses that were completed before this time.                                                    |
| `firstSubmittedAtStart` | Date    | Return responses where step 1 was submitted after this time.                                              |
| `firstSubmittedAtEnd`   | Date    | Return responses where step 1 was submitted before this time.                                             |
| `lastSubmittedAtStart`  | Date    | Return responses that were last submitted after this time.                                                |
| `waitingOnStep`         | String  | Return responses that are currently pending on the specified step.                                        |
| `page`                  | Number  | The page number to retrieve. Default is 1.                                                                |
| `retrieveAllPages`      | Boolean | Paginate through all available pages (max: 20 pages).                                                     |

To update the soft max pages limit, set the `IK12_MAX_PAGES` environment variable to the desired number of pages.

```bash
IK12_MAX_PAGES=10
```

#### Example

```javascript
const responses = await getCampaignResponses(123, {
  status: 'archived',
  completedAtStart: new Date('2021-01-01'),
  completedAtEnd: new Date('2021-02-01'),
  page: 2
});
```

## Helpers

### getValueFromField

This function retrieves the value of a field from a response.

```javascript
getValueFromField(form, fieldNumber, opts)
```

#### Required Parameters

| Parameter     | Type   | Description                                  |
| ------------- | ------ | -------------------------------------------- |
| `form`        | Object | The form object from the response.           |
| `fieldNumber` | Number | The field number to retrieve the value from. |

#### Options

| Parameter      | Type    | Description                                                                                                                              |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `sanitize`     | Boolean | If true, the value will be sanitized to remove any symbols and special characters. Default is `true`                                     |
| `sanitizeOpts` | Object  | Options for sanitize function. Possible keys are `removeSpecialChars` (boolean), `removeWhitespace` (boolean), and `uppercase` (boolean) |

### getValueFromFieldAsNumber

This function retrieves the value of a field from a response and returns it as a number (with parseFloat).

```javascript
getValueFromFieldAsNumber(form, fieldNumber, opts)
```

#### Required Parameters

| Parameter     | Type   | Description                                  |
| ------------- | ------ | -------------------------------------------- |
| `form`        | Object | The form object from the response.           |
| `fieldNumber` | Number | The field number to retrieve the value from. |


### getArrayFromField

This function retrieves an array of values from specified fields in a response. For example, this function can be used to aggregate and then sum all input numbers in a form.

```javascript
getArrayFromField(form, fieldNumber, opts)
```

#### Required Parameters

| Parameter      | Type              | Description                                    |
| -------------- | ----------------- | ---------------------------------------------- |
| `form`         | Object            | The form object from the response.             |
| `fieldNumbers` | Array of Integers | The field numbers to retrieve the values from. |

#### Options

| Parameter      | Type    | Description                                                                                                                              |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `sanitize`     | Boolean | If true, the value will be sanitized to remove any symbols and special characters. Default is `true`                                     |
| `sanitizeOpts` | Object  | Options for sanitize function. Possible keys are `removeSpecialChars` (boolean), `removeWhitespace` (boolean), and `uppercase` (boolean) |

## Debug Mode
To enable debug mode, set the `IK12_DEBUG` environment variable to `true`:

```bash
IK12_DEBUG=true
```

To set debug mode to verbose (showing all requests and responses), set the `IK12_DEBUG_MODE` environment variable to `verbose`:

```bash
IK12_DEBUG_MODE=verbose
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/connectk12/ik12).

## License

This library is licensed under the [MIT License](https://opensource.org/licenses/MIT).