import fs from 'fs';

function fileExists(path: string): boolean {
    if (fs.existsSync(path)) {
        return true;
    }
    return false;
}

function inputValidation(
    fileName: unknown,
    width: unknown,
    height: unknown
): boolean {
    if (typeof fileName === 'undefined' || fileName === '') {
        return false;
    }

    if (Number.isNaN(Number(width)) || Number.isNaN(Number(height))) {
        return false;
    }

    if (Number(width) <= 0 || Number(height) <= 0) {
        return false;
    }
    return true;
}

export { fileExists, inputValidation };
