import { strict as assert } from 'node:assert';
import { saveInputs, loadInputs, resetInputs } from './storage.js';

// Mock localStorage
const mockLocalStorage = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; },
    };
})();
global.localStorage = mockLocalStorage;

const tests = [
    {
        name: 'Test 1: Save and load inputs',
        run: () => {
            const inputData = {
                initialSavings: 100000,
                contribution: 500,
                contributionFrequency: 'monthly',
                annualInterestRate: 5,
                years: 20,
                annualExpenses: 50000,
                inflationRate: 2,
                retirementAge: 65,
            };
            saveInputs(inputData);
            const loadedData = loadInputs();
            assert.deepStrictEqual(loadedData, inputData, 'Loaded data does not match saved data');
        },
    },
    {
        name: 'Test 2: Load default inputs when no data',
        run: () => {
            mockLocalStorage.clear();
            const loadedData = loadInputs();
            const expected = {
                initialSavings: 0,
                contribution: 0,
                contributionFrequency: 'monthly',
                annualInterestRate: 0,
                years: 0,
                annualExpenses: 0,
                inflationRate: 0,
                retirementAge: 0,
            };
            assert.deepStrictEqual(loadedData, expected, 'Default values not returned when no data exists');
        },
    },
    {
        name: 'Test 3: Reset inputs',
        run: () => {
            const inputData = {
                initialSavings: 100000,
                contribution: 500,
                contributionFrequency: 'monthly',
                annualInterestRate: 5,
                years: 20,
                annualExpenses: 50000,
                inflationRate: 2,
                retirementAge: 65,
            };
            saveInputs(inputData);
            const resetData = resetInputs();
            const expected = {
                initialSavings: 0,
                contribution: 0,
                contributionFrequency: 'monthly',
                annualInterestRate: 0,
                years: 0,
                annualExpenses: 0,
                inflationRate: 0,
                retirementAge: 0,
            };
            assert.deepStrictEqual(resetData, expected, 'Reset did not return default values');
            const loadedData = loadInputs();
            assert.deepStrictEqual(loadedData, expected, 'Data not cleared after reset');
        },
    },
];

let passed = 0;
let failed = 0;

tests.forEach(({ name, run }) => {
    try {
        run();
        console.log(`${name}: PASSED`);
        passed++;
    } catch (error) {
        console.error(`${name}: FAILED - ${error.message}`);
        failed++;
    }
});

console.log(`\nTest Summary: ${passed} passed, ${failed} failed`);
if (failed === 0) {
    console.log('All tests passed successfully!');
} else {
    console.error('Some tests failed.');
}
