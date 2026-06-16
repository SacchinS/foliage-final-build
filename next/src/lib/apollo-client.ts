import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, Observable, FetchResult, Operation } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { mockJobs, mockUser, mockApplications } from "./mock-data";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:8000/graphql/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

function buildMockLink(): ApolloLink {
  return new ApolloLink((operation: Operation) => {
    return new Observable<FetchResult>((observer) => {
      const { operationName } = operation;
      let data: Record<string, unknown> = {};

      if (operationName === "GetAllJobs") {
        data = { allJobs: mockJobs };
      } else if (operationName === "Me") {
        data = { me: mockUser };
      } else if (operationName === "GetAllApplications") {
        data = { allApplications: mockApplications };
      } else if (operationName === "GetJobById") {
        const id = operation.variables.id?.toString();
        data = { jobById: mockJobs.find((j) => j.id === id) ?? null };
      } else if (
        operationName === "TokenAuth" ||
        operationName === "RegisterUser"
      ) {
        data = { tokenAuth: { token: "mock-jwt-token" } };
      }

      setTimeout(() => {
        observer.next({ data });
        observer.complete();
      }, 80);
    });
  });
}

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

const client = new ApolloClient({
  link: useMock ? buildMockLink() : authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
