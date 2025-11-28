import type { TypedDocumentString } from './graphql'

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/graphql-response+json'
  }
  
  // Development mode: Allow simulating authentication via x-dev-user-id header
  // This can be set in localStorage: localStorage.setItem('dev-user-id', '2')
  if (import.meta.env.DEV) {
    const devUserId = localStorage.getItem('dev-user-id')
    if (devUserId) {
      headers['x-dev-user-id'] = devUserId
    }
  }
  
  const response = await fetch('/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables
    })
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const result = await response.json()
  
  // Handle GraphQL errors
  if (result.errors) {
    throw new Error(`GraphQL Error: ${result.errors.map((e: any) => e.message).join(', ')}`)
  }
  
  // Return just the data portion
  return result.data as TResult
} 