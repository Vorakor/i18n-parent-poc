import { Tree } from '@nrwl/devkit';
import * as fs from 'fs-extra';

export default async function (host: Tree, schema: any) {
    const lPackageJson = JSON.parse(await fs.readFile('./package.json', { encoding: 'utf8' }));
    const lInstalledLibs: string[] = [];
    let lTranslationJson: any = null;
    if (schema.translationFile) {
        lTranslationJson = JSON.parse(await fs.readFile(schema.translationFile, { encoding: 'utf8' }));
    } else {
        lTranslationJson = JSON.parse(await fs.readFile('./apps/parent-poc/src/assets/translations/en.json', { encoding: 'utf8' }));
    }
    const parentKeys = Object.keys(lTranslationJson).filter((k) => k !== 'default');
    if (schema.libraryCheck) {
        Object.keys(lPackageJson.dependencies).forEach((key) => {
            if (key.startsWith(schema.libraryCheck)) {
                lInstalledLibs.push(key);
            }
        });
    } else {
        lInstalledLibs.push(...lPackageJson.translatedLibraries);
    }
    await checkKeys(
        schema.libraryCheck ? true : false,
        lInstalledLibs,
        parentKeys,
        lTranslationJson,
        schema.childFileName ? schema.childFileName : ''
    );
    console.log('Translation keys are all accounted for and correct.');
}

interface invalidKeys {
    key: string;
    library: string;
}

interface differentKeys extends invalidKeys {
    parent_value: string;
    child_value: string;
}

async function checkKeys(libraryCheck: boolean = false, libraries: string[], pKeys: string[], parentJson: any, childFileName: string = '') {
    const invalidKeys: invalidKeys[] = [];
    const differentKeys: differentKeys[] = [];
    for (let library of libraries) {
        let result: any = null;
        try {
            result = await import(library);
        } catch (e) {
            throw Error(`Unable to import: ${e}`);
        }
        if (libraryCheck) {
            // If libraryCheck is true then we scanned the package.json's list of dependencies for a specific prefix, now we need to check if any of those dependencies have translations.
            if (Object.keys(result).indexOf('i18nKeys') >= 0) {
                const lTranslationJson = JSON.parse(
                    await fs.readFile(`./node_modules/${library}/src/${childFileName ? childFileName : 'i18n.json'}`, { encoding: 'utf8' })
                );
                result.i18nKeys.forEach((key: string) => {
                    if (pKeys.indexOf(key) == -1) {
                        invalidKeys.push({ key, library });
                    } else if (parentJson[key] != lTranslationJson[key]) {
                        differentKeys.push({ key, library, parent_value: parentJson[key], child_value: lTranslationJson[key] });
                    }
                });
            }
        } else {
            // If libraryCheck is false then we are using a defined list of libraries that *should* have translations, so error if we don't find translations.
            if (Object.keys(result).indexOf('i18nKeys') >= 0) {
                let lTranslationJson: any = '';
                try {
                    lTranslationJson = JSON.parse(
                        await fs.readFile(`./node_modules/${library}/src/${childFileName ? childFileName : 'i18n.json'}`, { encoding: 'utf8' })
                    );
                } catch (e) {
                    throw Error(`Could not find translation json file in order to compare translation values! Error: ${e}`);
                }
                result.i18nKeys.forEach((key: string) => {
                    if (pKeys.indexOf(key) == -1) {
                        invalidKeys.push({ key, library });
                    } else if (parentJson[key] != lTranslationJson[key]) {
                        differentKeys.push({ key, library, parent_value: parentJson[key], child_value: lTranslationJson[key] });
                    }
                });
            } else {
                throw Error(
                    `Required translation file not found! Library ${library} does not have the required translation file contained within the package.`
                );
            }
        }
    }
    let missingString: string = '';
    let differentString: string = '';
    if (invalidKeys && invalidKeys.length > 0) {
        missingString = `Missing translation keys! Please verify that your translation key is contained in the parent translation file by reviewing the list below --v\n\n${invalidKeyPrintout(
            invalidKeys
        )}`;
    }
    if (differentKeys && differentKeys.length > 0) {
        differentString = `Translation value in parent is different than value in child! Please verify if one has been recently updated by reviewing the list below --v\n\n${invalidKeyPrintout(
            differentKeys
        )}`;
    }
    if (missingString || differentString) {
        throw Error(`${missingString}${missingString && differentString ? '\n\n--------\n\n' : ''}${differentString}`);
    }
    return;
}

function invalidKeyPrintout(iKeys: invalidKeys[] | differentKeys[]) {
    const printStatements = [];
    iKeys.forEach((ik: invalidKeys | differentKeys) => {
        if (instanceOf(ik)) {
            printStatements.push(
                `Different Key: ${ik.key}, Library: ${ik.library}\nParent value: ${ik.parent_value} <----> Child value: ${ik.child_value}`
            );
        } else {
            printStatements.push(`Translation Key: ${ik.key}, Library: ${ik.library}`);
        }
    });
    return printStatements.join('\n\n');
}

function instanceOf(object: any): object is differentKeys {
    return 'parent_value' in object;
}
