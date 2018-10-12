import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection, getConnection, createQueryBuilder } from "typeorm";
import { User } from "./entity/User";
import { ResolverMap } from "./types/ResolverTypes";
import { Profile } from "./entity/Profile";
import { UserProfile } from "./entity/UserProfile";
// adding to github
const typeDefs = `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
    email: String!
  }
  type UserProfile {
    id: Int!
    email: String!
    Profile: Profile
  }
  type Profile {
    favouriteColor: String!
  }
  type Query {
    hello(name: String): String!
    user(id: Int!): User!
    users: [User!]!
    userProfiles : [UserProfile]!
  }
  input ProfileInput {
    favouriteColor : String!
  }
  type Mutation {
    createUser(firstName: String!,lastName: String!,age: Int!, email: String!): User!
    updateUser(id: Int!, firstName: String,lastName: String,age: Int, email: String): Boolean
    deleteUser(id: Int!) : Boolean 
    createUserProfile(email: String!,profile: ProfileInput) : UserProfile!
  }
`;

const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: any) => `hhello ${name || "World"}`,
    user: async (_, { id }) => await User.findOne(id),
    users: async () => await User.find(),
    userProfiles: async () => {
      // const uProfile = await getConnection()
      //   .createQueryBuilder()
      //   .select("userProfile", "profile")
      //   .from(UserProfile, "userProfile")
      //   .where("userProfile.profile = :id", { id: 3 })
      //   .getOne();

      const uProfile = await createQueryBuilder("UserProfile")
        .leftJoinAndSelect("UserProfile.profile", "profile")
        .getMany();
      console.log("======================================");
      console.log(uProfile);
      console.log("========================================");
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      console.log("====================================");
      console.log(args);
      console.log("====================================");
      await User.create(args).save();
    },
    updateUser: async (_, { id, ...args }) => {
      try {
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({
            firstName: args.firstName,
            lastName: args.lastName,
            age: args.age,
            email: args.email
          })
          .where("id = :id", { id })
          .execute();
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },
    deleteUser: async (_, { id }) => {
      try {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("id = :id", { id })
          .execute();
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },
    createUserProfile: async (_, args) => {
      console.log("====================================");
      console.log(args);
      console.log("====================================");
      const profileColor = Profile.create(args.profile);
      await profileColor.save();

      return UserProfile.create({
        email: args.email,
        profile: profileColor
      }).save();
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
