import gql from "graphql-tag";

export const FIND_SIGHTINGS = gql`
  query {
    sightings(query: { isApproved: true }, limit: 3, sortBy: SEENDATE_DESC) {
      _id
      description
      imageUrl
      isApproved
      seenDate
      submitDate
      witness
      location {
        lat
        lng
      }
    }
  }

`;
