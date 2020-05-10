## Instructions

Running the dev server:
`npm start`

Runing the tests:
`npm test`

Running webpack for hot reloading:
`npm run webpack`

## Background:

I have never used typescript before so this was a fun exercise for me to learn something I've heard a lot about. I am very familiar with strictly typed languages (mainly Java and C) so the syntax made sense to me. I think that there are things I would have done differently given more time/more familiarity in ts (for example, creating an "Events" interface vs using "Array<Events>").

I was kinda bummed you guys didn't allow for more framework flexibility-- I've worked with Flask and Graphql before for projects similar to this and that would have allowed me to really share my knowledge versus learning typescript here.

## My Approach:

Although I've made many restful APIs before and used Express before, I have never made an Express API so it seemed like a good idea to get that running first. I basically modified this tutorial: https://auth0.com/blog/use-typescript-to-create-a-secure-api-with-nodejs-and-express-getting-started/. Then I dived in to the specific requirements of this system as specified in the provided ReadMe.

For the jest tests, I just used plain js because I wanted to get those running quickly and not spend too much time on them.

## Assumptions/Additional Considerations:

I think that this project satisfies the barebones requirements as listed in the document. However, before taking a system like this into production there is a lot more work to be done.

This system needs to be wired to a database for persistant storage after server restarts. Lots of additional requirements and data modeling discussions are needed here. What is the expected volume of transactions? Can we move some of the query logic into the database by using procedures to reduce application complexity? If were going with SQL can we add indexes to improve performance? How often will we be adding additional fields and how much flexibility do we want in the event object? Based on data volume, we might want to add pagination or server side caching of some of the data.

There are also some serious security flaws with this system. Passwords would never be stored as plain text (need to salt & hash passwords). Emails are not validated. Any user of the system has access to all users data-- no LDAP/user groups to validate who has access to view events.
