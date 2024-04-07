---
title: "Apollo Client: Testing Gotchas with MockProvider"
date: "6/6/2020"
excerpt: This describes some of the gotchas I encountered with Apollo Client.
---

Lately I've been debating between how to properly test apollo client. I used to test apollo client by providing a mocked schema along with `apollo-link-schema`. The downside to this is that I have to create the typedefs manually, and then create all the resolvers manually.

I wanted to do it the way that the Apollo team has suggested, which is to use `@apollo/client/testing`, which has a special Provider called `MockedProvider`. The downside is that I find it confusing to use, and this article describes some of the gotchas I have discovered, which hopefully makes it less confusing for others.

## Gotcha 1: `No more query responses for query X` error

From https://github.com/apollographql/apollo-client/blob/0340c48429b20f621d552af748527798bf6f26c5/src/utilities/testing/mocking/mockLink.ts#L75-L98:

```js
const response = (this.mockedResponsesByKey[key] || []).find((res, index) => {
  const requestVariables = operation.variables || {};
  const mockedResponseVariables = res.request.variables || {};
  if (!equal(stringify(requestVariables), stringify(mockedResponseVariables))) {
    return false;
  }
  responseIndex = index;
  return true;
});

if (!response || typeof responseIndex === "undefined") {
  this.onError(
    new Error(
      `No more mocked responses for the query: ${print(
        operation.query
      )}, variables: ${JSON.stringify(operation.variables)}`
    )
  );
}
```

Couple of reasons why this error can occur:

- A query is invoked but **no mock was provided** to `<MockedProvider mocks />`
- A query is invoked but the `requestVariables` does not match the `mockedResponseVariables` => _this should at least return back some sort of warning message, but I think they didn't put a warning message just in case the same query gets invoked many times with the different vars, didn't want N warning messages to show in log. Perhaps they could do something like we noticed this was similar.... but it isn't, or mockedResponsesByKey is > 0, this is what we tried_

## Gotcha 2: My GQL response is supposed to be `[{...}, {...}, {...}]` not `[{}, {}, {}]`

Example MockResponse:

```js
export const GET_SETLISTS_QUERY = gql`
  query getSetlists {
    setlists {
      ...Setlist
    }
  }

  ${SetlistFragment}
`;

export const SetlistFragment = gql`
  fragment Setlist on Setlist {
    id
    title
    date
    leader
    songs
    settings
    session
    notes
    share
  }
`;

[
  {
    request: {
      query: GET_SETLISTS_QUERY,
      variables: {},
    },
    result: {
      data: {
        setlists: [
          {
            id: "1",
            title: "Setlist 1",
            leader: "Test",
            date: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Setlist 2",
            leader: "Test",
            date: new Date().toISOString(),
          },
          {
            id: "3",
            title: "Setlist 3",
            leader: "Test",
            date: new Date().toISOString(),
          },
        ],
      },
    },
  },
];
```

This will return `[{}, {}, {}]` as the response. This is because Apollo doesn't know what the type is, as it is effectively writing this to its cache, which MockProvider provides.

To fix, add `__typename`. In my case, `__typename` is `Setlist`:

```js
export const GET_SETLISTS_QUERY = gql`
  query getSetlists {
    setlists {
      ...Setlist
    }
  }

  ${SetlistFragment}
`;

export const SetlistFragment = gql`
  fragment Setlist on Setlist {
    id
    title
    date
    leader
    songs
    settings
    session
    notes
    share
  }
`;

[
  {
    request: {
      query: GET_SETLISTS_QUERY,
      variables: {},
    },
    result: {
      data: {
        setlists: [
          {
            id: "1",
            title: "Setlist 1",
            leader: "Test",
            date: new Date().toISOString(),
            __typename: "Setlist",
          },
          {
            id: "2",
            title: "Setlist 2",
            leader: "Test",
            date: new Date().toISOString(),
            __typename: "Setlist",
          },
          {
            id: "3",
            title: "Setlist 3",
            leader: "Test",
            date: new Date().toISOString(),
            __typename: "Setlist",
          },
        ],
      },
    },
  },
];
```

This still doesn't fix it. It returns back `[]` now. This is because I didn't specify all the fields that the Query could potentially return, e.g.

```
  songs
  settings
  session
  notes
  share
```

is missing. In my version of Apollo, it did not result in any warnings or error messages returned, which is weird.

```js
[
  {
    request: {
      query: GET_SETLISTS_QUERY,
      variables: {},
    },
    result: {
      data: {
        setlists: [
          {
            id: "1",
            title: "Setlist 1",
            leader: "Test",
            date: new Date().toISOString(),
            songs: [],
            settings: {},
            session: "english",
            notes: "",
            share: {},
            __typename: "Setlist",
          },
          {
            id: "2",
            title: "Setlist 2",
            leader: "Test",
            date: new Date().toISOString(),
            songs: [],
            settings: {},
            session: "english",
            notes: "",
            share: {},
            __typename: "Setlist",
          },
          {
            id: "3",
            title: "Setlist 3",
            leader: "Test",
            date: new Date().toISOString(),
            songs: [],
            settings: {},
            session: "english",
            notes: "",
            share: {},
            __typename: "Setlist",
          },
        ],
      },
    },
  },
];
```

Lesson here is:

- Specify \_\_typename
- Specify all fields in the query.
