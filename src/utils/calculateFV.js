/**
 * Calculates the future value of an investment with regular contributions
 * @param {Object} params - The parameters for calculating future value
 * @param {number} [params.initialSavings=0] - Initial investment amount
 * @param {number} [params.contribution=0] - Regular contribution amount
 * @param {('monthly'|'yearly')} [params.contributionFrequency='monthly'] - Frequency of contributions
 * @param {number} [params.annualInterestRate=0] - Annual interest rate as a percentage
 * @param {number} [params.years=0] - Investment time horizon in years
 * @returns {number} The future value rounded to 2 decimal places
 * @throws {Error} If any numeric input is negative
 * @throws {Error} If contribution frequency is invalid
 *
 * @example
 * calculateFV({
 *   initialSavings: 10000,
 *   contribution: 1000,
 *   contributionFrequency: 'monthly',
 *   annualInterestRate: 7,
 *   years: 10
 * });
 */
export function calculateFV({
    initialSavings = 0,
    contribution = 0,
    contributionFrequency = 'monthly',
    annualInterestRate = 0,
    years = 0,
}) {
    const r = annualInterestRate / 100; // Convert percentage to decimal
    const n = contributionFrequency === 'monthly' ? 12 : 1; // Number of compounding periods per year
    const t = years; // Time in years
    const pmt = contribution; // Periodic contribution
    const p = initialSavings; // Initial savings

    // Input validation
    if (r < 0 || t < 0 || p < 0 || pmt < 0) {
        throw new Error('Inputs must be non-negative');
    }
    if (contributionFrequency !== 'monthly' && contributionFrequency !== 'yearly') {
        throw new Error('Invalid contribution frequency');
    }

    // Handle zero interest rate case
    if (r === 0) {
        const totalContributions = pmt * n * t; // Total contributions
        return Number((p + totalContributions).toFixed(2));
    }

    // Calculate future value with compound interest
    let compoundFactor, periodRate;
    if (contributionFrequency === 'monthly') {
        // Monthly rate: r_m = (1 + r)^(1/12) - 1
        periodRate = Math.pow(1 + r, 1 / 12) - 1;
        compoundFactor = Math.pow(1 + periodRate, t * 12);
    } else {
        // Annual rate
        periodRate = r;
        compoundFactor = Math.pow(1 + r, t);
    }

    const contributionTerm = pmt * ((compoundFactor - 1) / periodRate);
    const futureValue = p * compoundFactor + contributionTerm;

    return Number(futureValue.toFixed(2));
}
