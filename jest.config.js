module.exports = {
    setupFiles: ['<rootDir>/tests/setup.js'],
    moduleNameMapper: {
        '^components(.*)': '<rootDir>/src/components$1',
        '^ac(.*)': '<rootDir>/src/ac$1',
        '^containers(.*)': '<rootDir>/src/containers$1',
        '^img(.*)': '<rootDir>/src/img$1',
        '^reducers(.*)': '<rootDir>/src/reducers$1',
        '^utils(.*)': '<rootDir>/src/utils$1',
        '^store(.*)': '<rootDir>/src/store$1',
        // "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    // resolveSnapshotPath: (testPath, snapshotExtension) =>
    // testPath.replace('__test__', '__snapshots__') + snapshotExtension,
};
