import { strict as assert } from 'node:assert';
import { validateInputs } from './validateInputs.js';

// Test valid inputs
function testValidInputs() {
    const inputs = {
        currentAge: 30,
        retirementAge: 65,
        initialSavings: 100000,
        contribution: 500,
        annualInterestRate: 5,
        years: 35,
        annualExpenses: 30000,
        inflationRate: 2,
        stocksPercentage: 70,
        bondsPercentage: 30,
        contributionFrequency: 'monthly'
    };
    const result = validateInputs(inputs);
    assert.equal(result.isValid, true, 'Valid inputs should return isValid true');
    assert.deepEqual(result.errors, [], 'Valid inputs should have no errors');
}

// Test negative inputs
function testNegativeInputs() {
    const inputs = {
        currentAge: 30,
        retirementAge: 65,
        initialSavings: -100000,
        contribution: 500,
        annualInterestRate: 5,
        years: 35,
        annualExpenses: 30000,
        inflationRate: 2,
        stocksPercentage: 70,
        bondsPercentage: 30,
        contributionFrequency: 'monthly'
    };
    const result = validateInputs(inputs);
    assert.equal(result.isValid, false, 'Negative inputs should return isValid false');
    assert.ok(result.errors.includes('Field initialSavings must be a non-negative number'), 'Should detect negative initialSavings');
}

// Test empty inputs
function testEmptyInputs() {
    const inputs = {
        currentAge: 30,
        retirementAge: 65,
        initialSavings: '',
        contribution: 500,
        annualInterestRate: 5,
        years: 35,
        annualExpenses: 30000,
        inflationRate: 2,
        stocksPercentage: 70,
        bondsPercentage: 30,
        contributionFrequency: 'monthly'
    };
    const result = validateInputs(inputs);
    assert.equal(result.isValid, false, 'Empty inputs should return isValid false');
    assert.ok(result.errors.includes('Field initialSavings cannot be empty'), 'Should detect empty initialSavings');
}

// Test invalid retirement age
function testInvalidRetirementAge() {
    const inputs = {
        currentAge: 65,
        retirementAge: 65,
        initialSavings: 100000,
        contribution: 500,
        annualInterestRate: 5,
        years: 35,
        annualExpenses: 30000,
        inflationRate: 2,
        stocksPercentage: 70,
        bondsPercentage: 30,
        contributionFrequency: 'monthly'
    };
    const result = validateInputs(inputs);
    assert.equal(result.isValid, false, 'Invalid retirement age should return isValid false');
    assert.ok(result.errors.includes('Retirement age must be greater than current age'), 'Should detect retirementAge <= currentAge');
}

// Test invalid stocks and bonds percentage
function testInvalidPercentageSum() {
    const inputs = {
        currentAge: 30,
        retirementAge: 65,
        initialSavings: 100000,
        contribution: 500,
        annualInterestRate: 5,
        years: 35,
        annualExpenses: 30000,
        inflationRate: 2,
        stocksPercentage: 70,
        bondsPercentage: 20,
        contributionFrequency: 'monthly'
    };
    const result = validateInputs(inputs);
    assert.equal(result.isValid, false, 'Invalid percentage sum should return isValid false');
    assert.ok(result.errors.includes('Sum of stocks and bonds allocation must equal 100%'), 'Should detect stocksPercentage + bondsPercentage != 100');
}

// Test invalid contribution frequency
function testInvalidContributionFrequency() {
    const inputs = {
        currentAge: 30,
        retirementAge: 65,
        initialSavings: 100000,
        contribution: 500,
        annualInterestRate: 5,
        years: 35,
        annualExpenses: 30000,
        inflationRate: 2,
        stocksPercentage: 70,
        bondsPercentage: 30,
        contributionFrequency: 'weekly'
    };
    const result = validateInputs(inputs);
    assert.equal(result.isValid, false, 'Invalid contribution frequency should return isValid false');
    assert.ok(result.errors.includes("Contribution frequency must be either 'monthly' or 'yearly'"), 'Should detect invalid contributionFrequency');
}

// Run all tests
function runTests() {
    console.log('Running validateInputs tests...');
    testValidInputs();
    testNegativeInputs();
    testEmptyInputs();
    testInvalidRetirementAge();
    testInvalidPercentageSum();
    testInvalidContributionFrequency();
    console.log('All tests passed!');
}

try {
    runTests();
} catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
}
