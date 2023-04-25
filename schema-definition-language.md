# SDL - Schema Definition Language

- **Data**들의 **type**에 대해 설명해주기 위함

## Graph Query Language(GQL)

- 모든 GraphQL의 **SDL(schema definition language)**들이 `gpl```내에 들어가야함

```jsx
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
 // SDL 작성
`;
```

## Query

- REST API에서 **GET요청**을 위한 용도와 같음
- 단순히 **Data fetch**를 위함

```jsx
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
		author: User!
	}
	type Query {
		allTweets: [Tweet!]!
		tweet(id: ID!): Tweet
	}
`;
```

- `type Query {}`내에 사용자가 **get request** 할 수 있는 **모든 데이터**들을 넣어줘야함

## Mutation

- REST API에서 **GET, POST, PUT** 등 **서버 측 데이터를 수정**할 수 있는 request를 위해 사용함
- **서버** 측 **데이터를 수정하는 모든 작업**은 **mutation**을 통해 보내야하는 규칙
- **Query**는 operation에서 **생략** 가능(**Default**값이기 때문)하지만, **mutation**은 **필수**로 작성해줘야함

```jsx
const typeDefs = gql`
	type Mutation {
		postTweet(text: String!, userId: ID!): Tweet!
		deleteTweet(id: ID!): Boolean!
	}
`;
```

## Scalar Type

- **Scalar Type**은 GraphQL에서 **기본적으로 제공**하는 **스칼라 타입**들을 의미.
- **스칼라 타입**은 데이터베이스의 **기본 데이터 타입**과 비슷함

### GraphQL에서 제공하는 스칼라 타입

- **String**: UTF-8 문자열
- **Int**: 부호 있는 32비트 정수
- **Float**: 부동소수점 수
- **Boolean**: 참/거짓
- **ID**: 고유 식별자

```jsx
// ID, String 모두 Scalar type
type User {
	id: ID!
	username: String!
	firstName: String!
	lastName: String!
}
```

## Non nullable field (!)

- 타입 뒤에 !값을 붙이면 null값이 허용되지 않음
- 타입에 !이 붙어있지 않다면 return되어 오는 값이 null이여도 에러 발생 X
- **required, not required**를 **구분**하기 위함

```jsx
// id, username, firstName, lastName 모두 필수로 들어와야함
type User {
	id: ID!
	username: String!
	firstName: String!
	lastName: String!
}
```

### argument에서의 Non nullable field

- **argument**에 !이 붙어있지 않다면 argument를 **null값으로 보내도 괜찮다는 의미**(required가 아님)
