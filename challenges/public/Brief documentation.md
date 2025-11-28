2. **Brief Documentation** (5-10 minutes)
   - Explain your approach to handling concurrent registrations

I handled client concurrent registration with `useMutation`'s scope option. Per the docs, `Mutations with the same scope id will run in serial`, so by giving the registration mutations the same scope, they're prevented from running at the same time. 

If I'd had more time, I would have set up something to handle concurrent registrations on the server too.

   - Describe how you implemented the authorization

In `builder.mutationType` we have access to the current user via `ctx.user`.

To enforce `Only authenticated users can register for events`, we check for the presence of `ctx.user`. If it doesn't it exist, we know the user is not logged in, and we throw an error to exit the mutation early.

To enforce `Users can only cancel their own registrations`, we use ctx.user to filter the event participants table so that we only get data that belongs to the current user.

   - Note any trade-offs or assumptions you made

If I was submitting this work as a PR, I'd clean up my commit history with a rebase. However, since this is an exercise, I thought you might want to see my process (however messy).

If I'd had more time, I would have liked to:
- handle concurrent updates on the server
- use the status from `eventParticipant` rather than hardcoding on the frontend (I took a crack at it in bdd7ab16a8e367959d3f8e1917ce7d7f596079db but stopped to better respect the timebox)
- run accessibility checks
- write tests