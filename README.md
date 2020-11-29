# gatsby-source-github-repository-contributors

Source plugin for pulling Github repository contributors using Github's REST API.

## Motivation

Github's GraphQL API does not provide an option to fetch top repository contributors ([more details](https://stackoverflow.com/questions/55055471/how-to-query-the-top-contributors-to-a-github-repository-using-graphql)).

## How to use

In your `gatsby-config.js`:

```js
plugins: [
    {
      resolve: `gatsby-source-github-repository-contributors`,
      options: {
        org: 'spring-cloud',
        repository: 'spring-cloud-aws'
      }
    }
]
```

## How to query

```
query MyQuery {
  allContributors {
    nodes {
      id
      avatar_url
      html_url
      contributions
    }
  }
}
```