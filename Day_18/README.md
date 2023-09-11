# Getting Started with TypeScript

TypeScript is a superset of JavaScript that adds static types to the language, helping catch errors early and make your code more maintainable. This guide will walk you through the process of installing TypeScript, configuring it using a `tsconfig.json` file, and debugging TypeScript code.

## Table of Contents

1. [Installation](#installation)
2. [Creating a TypeScript Project](#creating-a-typescript-project)
3. [Using a tsconfig.json File](#using-a-tsconfigjson-file)
4. [Compiling TypeScript](#compiling-typescript)
5. [Debugging TypeScript](#debugging-typescript)

## Installation

To get started with TypeScript, you need to install it globally on your system. You can do this using npm (Node Package Manager) by running the following command:

```bash
npm install -g typescript


mkdir my-typescript-project
cd my-typescript-project


Here's an example tsconfig.json file:

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}

To compile your TypeScript code, run the following command:

```bash
tsc



Debugging TypeScript
Debugging TypeScript is similar to debugging JavaScript. You can use debugging tools available in your code editor or browser to set breakpoints and inspect variables. Make sure you've generated source maps by including the "sourceMap" option in your tsconfig.json file:

json
{
  "compilerOptions": {
    // ...other options...
    "sourceMap": true
  }
}

Once source maps are enabled, you can debug your TypeScript code directly, and the debugger will map back to your TypeScript source files.