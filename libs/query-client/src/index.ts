// Query client configuration
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Re-export React Query for convenience
export { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// GraphQL utilities (to be implemented with codegen)
// These can be imported from the frontend app or implemented separately
export type TypedDocumentString<TResult, TVariables> = string & {
  __resultType?: TResult
  __variablesType?: TVariables
}

export const createGraphQLExecutor = (endpoint: string) => {
  return async function execute<TResult, TVariables>(
    query: TypedDocumentString<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  ) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    return response.json() as TResult
  }
} 