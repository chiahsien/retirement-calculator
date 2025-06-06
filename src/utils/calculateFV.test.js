import { strict as assert } from 'node:assert';
import { calculateFV } from './calculateFV.js';

// 定義測試用例
const tests = [
    {
        name: 'Test 1: Monthly contributions',
        input: {
            initialSavings: 10000,
            contribution: 500,
            contributionFrequency: 'monthly',
            annualInterestRate: 5,
            years: 20,
        },
        expected: 229435.22, // 期末供款計算結果
        tolerance: 0.1, // 容差以涵蓋浮點數精度差異
    },
    {
        name: 'Test 2: Yearly contributions',
        input: {
            initialSavings: 10000,
            contribution: 6000,
            contributionFrequency: 'yearly',
            annualInterestRate: 5,
            years: 20,
        },
        expected: 224928.70,
        tolerance: 0.1,
    },
    {
        name: 'Test 3: Zero interest rate',
        input: {
            initialSavings: 10000,
            contribution: 500,
            contributionFrequency: 'monthly',
            annualInterestRate: 0,
            years: 20,
        },
        expected: 130000,
        tolerance: 0.01,
    },
];

// 運行測試並記錄結果
let passed = 0;
let failed = 0;

tests.forEach(({ name, input, expected, tolerance }) => {
    try {
        const result = calculateFV(input);
        assert.ok(Math.abs(result - expected) <= tolerance, `${name} failed: expected ${expected}, got ${result}`);
        console.log(`${name}: PASSED`);
        passed++;
    } catch (error) {
        console.error(`${name}: FAILED - ${error.message}`);
        failed++;
    }
});

// 顯示測試總結
console.log(`\nTest Summary: ${passed} passed, ${failed} failed`);
if (failed === 0) {
    console.log('All tests passed successfully!');
} else {
    console.error('Some tests failed.');
}
