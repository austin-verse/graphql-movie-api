import { ApolloServer, gql } from "apollo-server";
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
	type Mutation {
		postTweet(text: String!, userId: ID!): Tweet!
		deleteTweet(id: ID!): Boolean!
	}
`;

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

const server = new ApolloServer({ typeDefs, resolvers });

// listen()은 Promise 반환
server.listen().then(({ url }) => {
	console.log(`running on ${url}`);
});
