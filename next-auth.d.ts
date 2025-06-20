import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       firstname: string;
//       lastname: string;
//       isUserNew: boolean;
//     };
//   }

//   interface User {
//     id: string;
//     email: string;
//     firstname: string;
//     lastname: string;
//     isUserNew: boolean;
//   }
// }

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    isUserNew: boolean;
  }
}
