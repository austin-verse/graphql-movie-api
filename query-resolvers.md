# Query Resolver

## resolver 함수

- 데이터베이스에 엑세스한 다음 데이터를 반환함

```jsx
// 예시 json db
const tweets = [
	{
		id: "1",
		text: "first one!",
	},
	{
		id: "2",
		text: "second one!",
	},
];

// gql
const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		firstName: String!
		lastName: String!
	}
	type Tweet {
		id: ID!
		text: String!
		author: User
	}
	type Query {
		allTweets: [Tweet!]!
		tweet(id: ID!): Tweet
		ping: String!
	}
`;

// resolver function
const resolvers = {
	Query: {
		allTweets() {
			return tweets;
		},
		// 1번째 인자는 root, 2번째 인자는 arguments
		tweet(root, { id }) {
			return tweets.find((tweet) => tweet.id === id);
		},
	},
};
```

- **gql**의 구조와 **resolver**의 구조는 항상 **같아야함**

## parameters

```jsx
// resolver function
const resolvers = {
	Query: {
		allTweets() {
			return tweets;
		},
		// 1번째 인자는 root, 2번째 인자는 arguments
		tweet(root, arguments) {
			return tweets.find((tweet) => tweet.id === id);
		},
	},
};
```

### 2번째 param: arguments

- 데이터를 조회할 때 필요한 `arguments`들이 **2번째 인자**로 들어감
- `argument`를 `console.log()`할 시 object형식으로 출력됨
- 함수 내 return에서 arguments를 통한 필터링이나 연산 등을 통해 결과값 제공 가능
