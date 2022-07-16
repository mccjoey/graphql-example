const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
    type Query {
        products: [Product]
        orders: [Order]
    }

    type Product {
        id: ID!
        description: String!
        price: Float!
        reviews: [Review]
    }

    type Review {
        id: ID!
        rating: Int!
        comment: String
    }

    type Order {
        id: ID!
        date: String!
        subtotal: Float!
        items : [OrderItem]
    }

    type OrderItem {
        product: Product!
        quantity: Int!
    }


`);

const root = {
  products: [
    {
      id: "redshoe",
      description: "Red Shoe",
      price: 42.12,
      reviews: [],
    },
    {
      id: "bluejean",
      description: "Blue Jeans",
      price: 55.55,
      reviews: [],
    },
  ],
  orders: [
    {
      date: "2005-05-05",
      subtotal: 90.22,
      items: [
        {
          product: {
            id: "redshoe",
            description: "Old Red Shoe",
            price: 45.11,
          },
          quantity: 2,
        },
      ],
    },
  ],
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Running GraphQL server...");
});
