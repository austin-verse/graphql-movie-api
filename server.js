import { ApolloServer, gql } from "apollo-server";

// GQL = Graph Query Language
// 모든 GraphQL의 SDL(schema definition language)들이 gpl``내에 들어가야함
// SDL = 우리 data의 type에 대해 graphQL에 설명해주기 위함
// query data와 data의 shape을 설명하기 위해 같은 언어를 씀

// type Query{} 필수 - 사용자가 request할 수 있도록 하는 모든 건 type Query {} 안에 있어야함.
// type Query 내에 text: string을 넣는건 REST API에서 /text를 GET요청하게 만드는 것과 같음
const typeDefs = gql`
	type Query {
		text: String
	}
`;
const server = new ApolloServer({ typeDefs });

// listen()은 Promise 반환
server.listen().then(({ url }) => {
	console.log(`running on ${url}`);
});
