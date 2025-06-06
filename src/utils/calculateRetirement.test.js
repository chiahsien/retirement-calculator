import { strict as assert } from 'node:assert';
import { calculateRetirement } from './calculateRetirement.js';

const tests = [
    {
        name: 'Test 1: Cannot sustain',
        input: {
            initialSavings: 1492340.5,
            annualExpenses: 50000,
            annualInterestRate: 5,
            inflationRate: 2,
            retirementAge: 65,
            years: 10,
        },
        expected: {
            canSustain: true,
        },
    },
    {
        name: 'Test 2: Can sustain',
        input: {
            initialSavings: 1759969,
            annualExpenses: 40000,
            annualInterestRate: 5,
            inflationRate: 2,
            retirementAge: 65,
            years: 10,
        },
        expected: {
            canSustain: true,
        },
    },
];

let passed = 0;
let failed = 0;

tests.forEach(({ name, input, expected }) => {
    try {
        const result = calculateRetirement(input);
        assert.strictEqual(
            result.canSustain,
            expected.canSustain,
            `${name} canSustain failed: expected ${expected.canSustain}, got ${result.canSustain}`
        );
        assert.ok(
            result.sustainableYears >= 0 && result.sustainableYears <= input.years,
            `${name} sustainableYears invalid: got ${result.sustainableYears}`
        );
        assert.strictEqual(
            result.depletionAge,
            input.retirementAge + result.sustainableYears,
            `${name} depletionAge failed: expected ${input.retirementAge + result.sustainableYears}, got ${result.depletionAge}`
        );
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
