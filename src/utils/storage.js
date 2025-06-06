/**
 * Saves retirement calculator inputs to localStorage
 * @param {Object} data - The input data to save
 * @param {number} data.initialSavings - Initial savings amount
 * @param {number} data.contribution - Regular contribution amount
 * @param {('monthly'|'yearly')} data.contributionFrequency - Contribution frequency
 * @param {number} data.annualInterestRate - Annual interest rate
 * @param {number} data.years - Investment time horizon
 * @param {number} data.annualExpenses - Annual expenses in retirement
 * @param {number} data.inflationRate - Expected inflation rate
 * @param {number} data.retirementAge - Age at retirement
 * @throws {Error} If data cannot be saved to localStorage
 */
export function saveInputs(data) {
    try {
        localStorage.setItem('retirementInputs', JSON.stringify(data));
    } catch (error) {
        throw new Error('Failed to save data to localStorage');
    }
}

/**
 * Loads retirement calculator inputs from localStorage
 * @returns {Object} The saved input data or default values
 * @throws {Error} If data cannot be loaded from localStorage
 */
export function loadInputs() {
    try {
        const savedData = localStorage.getItem('retirementInputs');
        if (savedData) {
            return JSON.parse(savedData);
        }
        return {
            initialSavings: 0,
            contribution: 0,
            contributionFrequency: 'monthly',
            annualInterestRate: 0,
            years: 0,
            annualExpenses: 0,
            inflationRate: 0,
            retirementAge: 0,
        };
    } catch (error) {
        throw new Error('Failed to load data from localStorage');
    }
}

/**
 * Resets retirement calculator inputs to default values
 * @returns {Object} Default input values
 * @throws {Error} If data cannot be reset in localStorage
 */
export function resetInputs() {
    try {
        localStorage.removeItem('retirementInputs');
        return {
            initialSavings: 0,
            contribution: 0,
            contributionFrequency: 'monthly',
            annualInterestRate: 0,
            years: 0,
            annualExpenses: 0,
            inflationRate: 0,
            retirementAge: 0,
        };
    } catch (error) {
        throw new Error('Failed to reset localStorage data');
    }
}
