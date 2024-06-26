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
