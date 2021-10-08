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
    Object.keys(lPackageJson.dependencies).forEach((key) => {
        if (key.startsWith(schema.libraryCheck)) {
            lInstalledLibs.push(key);
        }
    });
    await checkKeys(lInstalledLibs, parentKeys, lTranslationJson);
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

async function checkKeys(libraries: string[], pKeys: string[], parentJson: any) {
    const invalidKeys: invalidKeys[] = [];
    const differentKeys: differentKeys[] = [];
    for (let library of libraries) {
        let result: any = null;
        try {
            result = await import(library);
        } catch (e) {
            throw Error(`Unable to import: ${e}`);
        }
        if (Object.keys(result).indexOf('i18nKeys') >= 0) {
            const lTranslationJson = JSON.parse(await fs.readFile(`./node_modules/${library}/src/assets/i18n.json`, { encoding: 'utf8' }));
            result.i18nKeys.forEach((key: string) => {
                if (pKeys.indexOf(key) == -1) {
                    invalidKeys.push({ key, library });
                } else if (parentJson[key] != lTranslationJson[key]) {
                    differentKeys.push({ key, library, parent_value: parentJson[key], child_value: lTranslationJson[key] });
                }
            });
        }
    }
    if (invalidKeys && invalidKeys.length > 0) {
        throw Error(
            `Missing translation keys! Please verify that your translation key is contained in the parent translation file by reviewing the list below --v\n${invalidKeyPrintout(
                invalidKeys
            )}`
        );
    } else if (differentKeys && differentKeys.length > 0) {
        throw Error(
            `Translation key in parent is different than key in child! Please verify if one has been recently updated by reviewing the list below --v\n${invalidKeyPrintout(
                differentKeys
            )}`
        );
    } else {
        return;
    }
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
    return printStatements.join('\n');
}

function instanceOf(object: any): object is differentKeys {
    return 'parent_value' in object;
}
