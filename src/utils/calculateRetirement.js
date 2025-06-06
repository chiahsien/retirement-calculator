/**
 * Calculates how long retirement savings can last and when funds will be depleted
 * @param {Object} params - The calculation parameters
 * @param {number} [params.initialSavings=0] - Initial retirement savings amount
 * @param {number} [params.annualExpenses=0] - Expected annual expenses during retirement
 * @param {number} [params.annualInterestRate=0] - Annual investment return rate (%)
 * @param {number} [params.inflationRate=0] - Annual inflation rate (%)
 * @param {number} [params.retirementAge=0] - Age at retirement
 * @param {number} [params.years=0] - Number of years to simulate
 * @returns {Object} Retirement calculation results
 * @returns {number} returns.sustainableYears - Number of years savings will last
 * @returns {number} returns.depletionAge - Age at which savings will be depleted
 * @returns {boolean} returns.canSustain - Whether savings can last throughout simulation period
 * @throws {Error} If any input parameter is negative
 *
 * @example
 * const result = calculateRetirement({
 *   initialSavings: 1000000,
 *   annualExpenses: 40000,
 *   annualInterestRate: 5,
 *   inflationRate: 2,
 *   retirementAge: 65,
 *   years: 30
 * });
 */
export function calculateRetirement({
    initialSavings = 0,
    annualExpenses = 0,
    annualInterestRate = 0,
    inflationRate = 0,
    retirementAge = 0,
    years = 0,
}) {
    const r = annualInterestRate / 100;
    const infl = inflationRate / 100;
    let assets = initialSavings;
    let sustainableYears = 0;

    if (initialSavings < 0 || annualExpenses < 0 || r < 0 || infl < 0 || retirementAge < 0 || years < 0) {
        throw new Error('Inputs must be non-negative numbers');
    }

    for (let t = 0; t < years; t++) {
        const adjustedExpenses = annualExpenses * Math.pow(1 + infl, t);
        assets = (assets - adjustedExpenses) * (1 + r);
        if (assets <= 0) {
            sustainableYears = t + 1;
            break;
        }
        if (t === years - 1) {
            sustainableYears = years;
        }
    }

    const canSustain = assets > 0;

    return {
        sustainableYears,
        depletionAge: retirementAge + sustainableYears,
        canSustain,
    };
}
