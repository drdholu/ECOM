# stack

1. typescript
2. prisma
3. postgresql (neon db)

# setup commands

> (these are for me, not everyone needs to run this)

```bash
npm init -y
npm install prisma typescript ts-node @types/node nodemon --save-dev
npm i @prisma/client

npx tsc --init # change outDir and rootDir in tsconfig.json
npx prisma init

npm i express
npm i @types/express --save-dev

npm i dotenv

npm i bcrypt
npm i @types/bcrypt --save-dev
npm i jsonwebtoken

npm start # make sure to modify the package.json file first

```

# prisma cmds

```bash
npx prisma migrate dev --name Initialize the schema # give another name
npx prisma generate # to generate client
```

## prisma extends code explanation

The `$extends` method is a feature of Prisma Client that allows you to add custom behavior to your Prisma Client instance. Let's break down the extension you've shown:

```typescript
.$extends({
    name: 'signup schema validation',
    query: {
        user: {
            create({args, query}) {
                args.data = SignUpSchema.parse(args.data)
                return query(args)
            }
        }
    }
})
```

1. `name: 'signup schema validation'`: This gives a name to your extension. It's useful for debugging and identifying the extension.

2. `query`: This object allows you to modify or extend the behavior of Prisma's query methods.

3. `user`: This targets the `user` model in your Prisma schema.

4. `create`: This specifically extends the `create` operation for the `user` model.

5. `({args, query})`: This is a function that receives the original `args` (arguments passed to the create method) and the original `query` function.

6. `args.data = SignUpSchema.parse(args.data)`: This line is applying a schema validation to the data being passed to the create method. It's using a `SignUpSchema` (which isn't shown in this snippet but is presumably defined elsewhere) to validate and potentially transform the input data.

7. `return query(args)`: After validating/transforming the data, it calls the original query function with the (potentially modified) args.

In essence, this extension is adding a validation step before creating a new user. It ensures that the data being used to create a user conforms to a specific schema (SignUpSchema) before the creation query is actually executed. If the data doesn't pass the schema validation, it will throw an error, preventing invalid data from being inserted into your database.

This is a powerful way to add consistent data validation across your application, ensuring that no matter where a user creation request comes from, it always goes through this validation step.


# File structure

src
    index.ts
    controllers
    exceptions
    middlewares
    schema
    routes
nodemon.json

# Nodemon configs

```js
//./nodemon.json
{
    "watch": ["src"],
    "ext": ".js, .ts",
    "exec":"npx ts-node ./src/index.ts"
}
```

```js
// ./package.json
//...

"scripts": {
    // ...
    "start": "npx nodemon",
    // ...
}
// ...
```

# flow of error handling

## missing field during signup
1. error handler here
2. internal exception class
3. http exception constructor
4. here error middleware

[flow](./image.png)

# resources

1. [ORM](https://stackoverflow.com/a/1279678/19996155)
2. [Prisma](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
3. [Clients](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction)
4. [Extended Clients](https://www.prisma.io/docs/orm/prisma-client/client-extensions#extended-clients)
5. [Custom validation using extended clients and zod](https://www.prisma.io/docs/orm/prisma-client/queries/custom-validation)


# typescript

1. [Type declarations](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html)
