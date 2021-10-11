# Verify-Translation Workspace Generator

This readme serves as the documentation for this tool. This tool is purpose built to verify flat file translation documents in the parent repo against the translation documents of packages installed within the parent repo, said translation documents coming from child repositories for instance.

This tool is broken into two different kinds of verification, the first being checking for keys missing in the parent repo that the children repositories have, this is to ensure that translations will work across multi-repository applications; the second check being examining the translation values from the child against the parent to determine if recent changes have been made or other adjustments.

This tool is meant to verify if the parent has all the keys from the children and that the children and parent have the same translation values.

Currently this tool is built for Nx workspaces.

## Installation

1. Add `/tools/generators/i18n-verification` to the root of the repository.
1. Add the code into the folder above for the `index.ts` and `schema.json` files (`index.ts` is the script itself, while `schema.json` holds the command-line arguments).
1. Add command to `package.json` as follows: `"verify-translation": "nx workspace-generator i18n-verification"`
1. Two options for this next step:
    - Ensure that translations exist at the following path: `./apps/<application-name>/src/assets/translations/en.json`
    - Or change the default within the code to reflect the path where the translation files are (the default path should be somewhere around line 11 of the script in `index.ts`).
1. Create new key in `package.json` at root, name the key `translatedLibraries` and list all of the libraries that are being imported into this application that you expect to have translation files in.
    - (Optional) Either do the step above, or always pass in the libraryCheck parameter with a prefix for the script to scan through and check for translation files.

At this point the parent repo here should be pretty well setup, now to fix the children:

1. Locate the `ng-package.json` file for the library / project that needs translation files, add the following line, but feel free to customize the path and file name so long as you account for it within the script: `"assets": ["./src/i18n.json"],`.
1. Now you will need to add the translation file at that path, so add a `i18n.json` file at the library / project's `src/` root, or the other path that you decided on, so long as it is contained within `src/`.
1. Now in your library's `index.ts` file, or your project's `public-api.ts` file, add the import line to bring in the json file: `import * as keys from './i18n.json';`.
1. Let's finish off the `index.ts` / `public-api.ts` file by adding the const export: `export const i18nKeys = Object.keys(keys).filter((k) => k !== 'default);`.
1. Let's not forget to add a `"resolveJsonModule": true,` to your repo's `tsconfig.base.json` file.
1. Now more as a precaution than anything else, let's tweak the `angular.json` file to make sure that our library / project builds with the translation files included and with minified code too, so change this:

```
"build": {
    "builder": "@nrwl/angular:ng-packagr-lite",
    "options": {
        "tsConfig": "libs/manufacturers/tsconfig.lib.json",
        "project": "libs/manufacturers/ng-package.json"
    },
    "configurations": {
        "production": {
            "tsConfig": "libs/manufacturers/tsconfig.lib.prod.json"
        }
    }
},
```

to this:

```
"build": {
    "builder": "@nrwl/angular:package",
    "options": {
        "tsConfig": "libs/manufacturers/tsconfig.lib.json",
        "project": "libs/manufacturers/ng-package.json"
    },
    "configurations": {
        "production": {
            "tsConfig": "libs/manufacturers/tsconfig.lib.prod.json"
        }
    }
},
```

And now everything should be configured correctly to run the build tool.

## Usage

This script should be fairly simple to use, as long as it is setup correctly, anyone should be able to run it with a simple: `npm run verify-translation`.

If you want to target a specific npm package then use the `libraryCheck` parameter like so: `npm run verify-translation -- --libraryCheck=@child-poc/inventory`.

If you want to target any npm package with a prefix, also utilize the `libraryCheck` parameter: `npm run verify-translation -- --libraryCheck=@child-poc`.

If you want to change the location to pull the parent translation file from, use the `parentFileName` parameter, please note that the command assumes a full path starting at the root of your repository, I.E. take a look at the default while keeping in mind that this command assumes `package.json` is at `./`: `./apps/parent-poc/src/assets/translations/en.json`. The command should look like this: `npm run verify-translation -- --parentFileName=./apps/parent-poc/src/assets/translations/en.json`.

If you want to change the location to pull the child translation file from, use the `childFileName` parameter, but this time note that the command assumes a path starting from the `/src` directory within the npm package, I.E. the default is simply `i18n.json`, but the `i18n.json` file is at the root of the npm package's `/src` folder, so assuming you were to put your json file within an `assets/translation` folder then the path would change to this: `assets/translation/i18n.json`, which would correspond to a path of this: `./node_modules/<library-name>/src/assets/translations/i18n.json`. The command should look like this: `npm run verify-translation -- --childFileName=assets/translation/i18n.json`.

## Parameters

The following are parameters of this command:

##### libraryCheck

Argv position: 0

This is either a prefix or a specific library that you want to look through for translations to validate against.

##### parentFileName

Argv position: 1

This is a path from repository root to the parent translation file you are checking against.

##### childFileName

Argv position: 2

This is a path from the npm module `src/` directory to the translation file you are using to validate the parent.

## Defaults

Most of this script is built with defaults in mind in case someone was to run it without any arguments, obviously these defaults can be modified by adjusting the code. Some of these defaults include the following:

-   The script runs as if from root, so it expects to find the `package.json` file at: `./package.json`.
-   Along with locating the `package.json` file, the script expects to find prefixed libraries or to have a separate key to pull a list of libraries that need verification. If doing a prefix, please see documentation around the `libraryCheck` parameter, but the tool expects the separate key to be `translatedLibraries` if the `libraryCheck` parameter is not specified. The key should be located in `package.json` as a key within the root object (I.E. `lPackageJson.translatedLibraries`), this tool also expects `translatedLibraries` to be a list or array: `["@child-poc/inventory", "@child-poc/vehicles"]`.
-   This tool expects the parent translation file to be specified with the parentFileName parameter or it will default to the following path: `./apps/<application-name>/src/assets/translations/en.json`.
-   Assuming the `libraryCheck` parameter was not given, the tool will expect the libraries listed within `translatedLibraries` to have an exported `i18nKeys` object, this object is simply to contain a list of translation keys from the children. If the `libraryCheck` parameter is not given and this object does not exist in `translatedLibraries` then the script will throw an error.
-   Script assumes the name of the translation keys object will be `i18nKeys` and will be a constant list of strings.
-   Unless otherwise specified, the script will assume the child translation file to be at the following path for each of the `translatedLibraries`: `./node_modules/<library-name>/src/i18n.json`.
-   If you want to specify either a new location for the parent translation file or for the children translation files, you can either change the defaults in the script or pass the script the corresponding parameters of `parentFileName` and `childFileName`.
