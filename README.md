# GraphQL Tech Screen Project.

This challenge is designed to emulate the daily activities of a person writing a graphQL middle layer that sits between a client and a REST api. This layer is used to transform and abstract the underlying systems to create contracts with UIs that can be fulfilled as underlying systems change.

## Interviewing

If you are interviewing for a position that requires this challenge, please familiarize yourself with the project and see [the pre-interview instructions](PRE-INTERVIEW-INSTRUCTIONS.md) for more information.

# Getting Started.

1. run `yarn install` or `npm install` to install the dependencies
2. run `yarn start:dev` or `npm run start:dev` to start the server in dev/reload mode.
    - This will start the server and reload it when changes are made to the code.
3. The GraphQL Playground will be available at `http://localhost:4000/graphql`
    - You can use this ide to run queires and mutations against the server. By default the server should provide a response to this query:
    ```
       query MyFavoriteStarWarsPerson {
           swapiCharacterById(id: 1) {
               name
               height
               mass
               gender
           }
       }
    ```
