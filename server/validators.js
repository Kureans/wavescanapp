const SCANNING_MODES = ["GANTRY", "CRAWLER", "AUTO", "MANUAL", "ARM"];
const INT_REGEX = /^\d+$/;
const FLOAT_REGEX = /^[+-]?\d+(\.\d+)?$/;

function isProjectNameValid(projectName) {
    return projectName.length > 3;
}

function isScanningModeValid(scanningMode) {
    for (let i = 0; i < 5; i++) {
        if (SCANNING_MODES[i] === scanningMode) {
            return true;
        }
    }
    return false;
}

function isDimensionValid(scanDimensions) {
    console.log(scanDimensions);
    isInt = INT_REGEX.test(scanDimensions);
    console.log(isInt);
    if (!isInt) {
        return false;
    }

    scanDimensionsInt = parseInt(scanDimensions);
    return scanDimensionsInt >= 1;
}

function isFrequencyValid(scannerFrequency) {

    isFloat = FLOAT_REGEX.test(scannerFrequency);
    if (!isFloat) {
        return false;
    }

    scannerFrequencyFloat = parseFloat(scannerFrequency);
    if (scannerFrequencyFloat < 1) {
        return false;
    }

    scannerFrequencyArray = scannerFrequency.split('.');
    if (scannerFrequencyArray.length === 2) {
        return scannerFrequency.split('.')[1].length === 1;
    }
    if (scannerFrequencyArray.length === 1) {
        return true;
    }

    return false;
}

module.exports = {
    isProjectNameValid,
    isScanningModeValid,
    isDimensionValid,
    isFrequencyValid
};