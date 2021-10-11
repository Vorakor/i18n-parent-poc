# Verify-Translation Workspace Generator

This readme serves as the documentation for this tool. This tool is purpose built to verify flat file translation documents in the parent repo against the translation documents of packages installed within the parent repo, said translation documents coming from child repositories for instance.

This tool is broken into two different kinds of verification, the first being checking for keys missing in the parent repo that the children repositories have, this is to ensure that translations will work across multi-repository applications; the second check being examining the translation values from the child against the parent to determine if recent changes have been made or other adjustments.

## Installation

1. Add /tools/generators/i18n-verification to the root of the repository.
1. Add the code into the folder above for the index.ts and schema.json files (index.ts is the script itself, while schema.json holds the command-line arguments).
1. Add command to `package.json` as follows: `"verify-translation": "nx workspace-generator i18n-verification"`
1. Two options for this next step:
    - Ensure that translations exist at the following path: `./apps/<application-name>/src/assets/translations/en.json`
    - Or change the default within the code to reflect the path where the translation files are (the default path should be somewhere around line 11 of the script in `index.ts`).
1. Create new key in `package.json` at root, name the key `translatedLibraries` and list all of the libraries that are being imported into this application that you expect to have translation files in.

-   (Optional) Either do the step above, or always pass in the libraryCheck parameter with a prefix for the script to scan through and check for translation files.

## Usage

This script should be fairly simple to use, as long as it is setup correctly, anyone should be able to run it with a simple: `npm run verify-translation`.

## Parameters

## Defaults

Most of this script is built with defaults in mind in case someone was to run it without any arguments, obviously these defaults can be modified by adjusting the code. Some of these defaults include the following:

-   The script runs as if from root, so it expects to find the package.json file at: `./package.json`.
-   Along with locating the package.json file, the script expects to find prefixed libraries or to have a separate key to pull a list of libraries that need verification. If doing a prefix, please see documentation around the libraryCheck parameter, but the tool expects the separate key to be `translatedLibraries` if the libraryCheck parameter is not specified. The key should be located in package.json as a key within the root object (I.E. `lPackageJson.translatedLibraries`), this tool also expects translatedLibraries to be a list or array: `["@child-poc/inventory", "@child-poc/vehicles"]`.
-   This tool expects the parent translation file to be specified with the translationFile parameter or it will default to the following path: `./apps/<application-name>/src/assets/translations/en.json`.
-   Assuming the libraryCheck parameter was not given, the tool will expect the libraries listed within `translatedLibraries` to have an exported `i18nKeys` object, this object is simply to contain a list of translation keys from the children. If the libraryCheck parameter is not given and this object does not exist in `translatedLibraries` then the script will throw an error.
