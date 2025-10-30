import jsonData from '../utils/db.json';

const companiesData = jsonData.companies;

/**
 * Simulates fetching companies with filtering, sorting, and pagination.
 * This function manually applies all transformations to the static JSON data.
 * @param {object} params - The query parameters.
 * @returns {Promise<{data: object[], headers: {'x-total-count': number}}>}
 */
export const fetchCompanies = async (params = {}) => {
  let companies = [...companiesData];

  // Manual filtering
  if (params.q) {
    companies = companies.filter((company) =>
      company.name.toLowerCase().includes(params.q.toLowerCase())
    );
  }
  if (params.industry && params.industry.length > 0) {
    companies = companies.filter((company) =>
      params.industry.includes(company.industry)
    );
  }
  if (params.location && params.location.length > 0) {
    companies = companies.filter((company) =>
      params.location.includes(company.location)
    );
  }
  if (params.foundedYear) {
    companies = companies.filter(
      (company) =>
        company.founded >= params.foundedYear[0] &&
        company.founded <= params.foundedYear[1]
    );
  }

  // Manual sorting
  if (params._sort) {
    companies.sort((a, b) => {
      if (a[params._sort] < b[params._sort]) {
        return params._order === 'asc' ? -1 : 1;
      }
      if (a[params._sort] > b[params._sort]) {
        return params._order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const totalCount = companies.length;

  // Manual pagination
  if (params._page) {
    const start = (params._page - 1) * params._limit;
    const end = start + params._limit;
    companies = companies.slice(start, end);
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return { data: companies, headers: { 'x-total-count': totalCount } };
};

/**
 * Fetches all companies without any filtering, sorting, or pagination.
 * This is used to populate the filter dropdowns.
 * @returns {Promise<{data: object[]}>}
 */
export const fetchAllCompanies = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return { data: [...companiesData] };
}
