import { ApolloServer, gql } from "apollo-server";

// 예시 배열
let tweets = [
	{
		id: "1",
		text: "first one!",
		userId: "2",
	},
	{
		id: "2",
		text: "second one!",
		userId: "1",
	},
];

let users = [
	{
		id: "1",
		firstName: "Austin",
		lastName: "Hwang",
	},
	{
		id: "2",
		firstName: "Elon",
		lastName: "Musk",
	},
];

const typeDefs = gql`
	type User {
		id: ID!
		firstName: String!
		lastName: String!
		"""
		Is the sum of firstName + lastName
		"""
		fullName: String!
	}
	"""
	Tweet object represents a resource for a tweet
	"""
	type Tweet {
		id: ID!
		text: String!
		author: User!
	}
	type Query {
		allUsers: [User!]!
		allTweets: [Tweet!]!
		tweet(id: ID!): Tweet
		ping: String!
	}
	type Mutation {
		postTweet(text: String!, userId: ID!): Tweet!
		"""
		Delete a tweet and return true if it found, else return false
		"""
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
		allUsers() {
			console.log("all users called");
			return users;
		},
	},
	// data엔 fullName이 없었지만 fullName이라는 resolver가 발견되어서 호출되고 resolver의 결과값을 받음
	User: {
		// The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain).
		fullName({ firstName, lastName }) {
			console.log("full name called");
			return `${firstName} ${lastName}`;
		},
	},
	Tweet: {
		author({ userId }) {
			let author = users.find((user) => user.id === userId);
			return author;
		},
	},
	Mutation: {
		postTweet(root, { text, userId }) {
			// arguments에서 값을 가져온 후 새로운 트윗을 만듦
			const newTweet = {
				id: tweets.length + 1,
				text,
			};
			// 예시 배열에 newTweet을 추가함
			tweets.push(newTweet);
			// 새로 추가된 트윗을 return
			return newTweet;
		},
		deleteTweet(root, { id }) {
			// argument에 들어온 id값을 통해 기존 예시 배열에 있는 tweets 중 id값이 일치하는 tweet 찾기
			const tweet = tweets.find((tweet) => tweet.id === id);
			// id값이 일치하는 트윗이 존재하지 않을 시 false 반환
			if (!tweet) {
				return false;
			}
			// id값이 일치하는 트윗 존재 시 해당 트윗 없애고 true 반환
			tweets = tweets.filter((tweet) => tweet.id !== id);
			return true;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

// listen()은 Promise 반환
server.listen().then(({ url }) => {
	console.log(`running on ${url}`);
});
