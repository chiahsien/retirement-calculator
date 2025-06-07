/**
 * Validates input parameters for the retirement calculator
 * @param {Object} inputs - Input parameters for validation
 * @param {number} inputs.currentAge - Current age of the person
 * @param {number} inputs.retirementAge - Expected retirement age
 * @param {number} inputs.initialSavings - Initial retirement savings amount
 * @param {number} inputs.contribution - Regular contribution amount
 * @param {number} inputs.annualInterestRate - Expected annual investment return rate (%)
 * @param {number} inputs.years - Investment time horizon in years
 * @param {number} inputs.annualExpenses - Expected annual expenses during retirement
 * @param {number} inputs.inflationRate - Expected annual inflation rate (%)
 * @param {number} inputs.stocksPercentage - Portfolio allocation to stocks (%)
 * @param {number} inputs.bondsPercentage - Portfolio allocation to bonds (%)
 * @param {('monthly'|'yearly')} inputs.contributionFrequency - Frequency of contributions
 * @returns {Object} Validation results
 * @returns {boolean} returns.isValid - Whether all inputs are valid
 * @returns {string[]} returns.errors - Array of validation error messages
 */
export function validateInputs({
    currentAge,
    retirementAge,
    initialSavings,
    contribution,
    annualInterestRate,
    years,
    annualExpenses,
    inflationRate,
    stocksPercentage,
    bondsPercentage,
    contributionFrequency
}) {
    const errors = [];

    // Check for empty or invalid inputs
    const requiredFields = {
        currentAge,
        retirementAge,
        initialSavings,
        contribution,
        annualInterestRate,
        years,
        annualExpenses,
        inflationRate,
        stocksPercentage,
        bondsPercentage
    };

    for (const [key, value] of Object.entries(requiredFields)) {
        if (value === undefined || value === null || value === '') {
            errors.push(`Field ${key} cannot be empty`);
        } else if (isNaN(value) || value < 0) {
            errors.push(`Field ${key} must be a non-negative number`);
        }
    }

    // Validate contributionFrequency
    if (!['monthly', 'yearly'].includes(contributionFrequency)) {
        errors.push(`Contribution frequency must be either 'monthly' or 'yearly'`);
    }

    // Validate retirementAge > currentAge
    if (Number(retirementAge) <= Number(currentAge)) {
        errors.push(`Retirement age must be greater than current age`);
    }

    // Validate stocksPercentage + bondsPercentage = 100
    const sumPercentage = Number(stocksPercentage) + Number(bondsPercentage);
    if (Math.abs(sumPercentage - 100) > 0.01) {
        errors.push(`Sum of stocks and bonds allocation must equal 100%`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
