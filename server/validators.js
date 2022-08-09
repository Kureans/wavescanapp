const SCANNING_MODES = ["GANTRY", "CRAWLER", "AUTO", "MANUAL", "ARM"];

function isProjectNameValid(projectName) {
    console.log(typeof projectName);
    return (
        typeof projectName === "string" && 
        projectName.length > 3
        );
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
    return (
        Number.isInteger(scanDimensions) &&
        scanDimensions >= 1
    );
}

function isFrequencyValid(scannerFrequency) {

    console.log(scannerFrequency);
    const isFloat = (value) => {
        if (
            typeof value === 'number' &&
            !Number.isNaN(value) &&
            !Number.isInteger(value)
          ) {
            return true;
          }
        
          return false;
    }

    if (!isFloat(scannerFrequency) || scannerFrequency < 1) {
        return false;
    }

    const scannerFrequencyString = String(scannerFrequency);
    return (
        scannerFrequencyString.split('.')[1].length === 1
    );
}

module.exports = {
    isProjectNameValid,
    isScanningModeValid,
    isDimensionValid,
    isFrequencyValid
};