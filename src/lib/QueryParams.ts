/**
 * Creates a query string from the given search parameters and input parameters.
 * @param {Array<[string, string]>} searchParams - An array of key-value pairs representing the search parameters.
 * @param {...Array<string[]>} inputParams - An array of arrays containing additional key-value pairs to be added to the query string.
 * @returns {string} - The generated query string.
 */
export const createQueryString = ( searchParams: [string,string][] ,...inputParams: string[][]) => {
    const params = new URLSearchParams(searchParams);
    for (const [name, value] of inputParams) {
      params.set(name, value); 
    }
   
    const stringParams = params.toString();
    const query = stringParams ? `?${stringParams}` : '';
    return query
  };

 /**
  * Deletes specified query string parameters from the given search parameters.
  * @param {Array<[string, string]>} searchParams - The search parameters as an array of key-value pairs.
  * @param {...Array<string>[]} inputParams - The query string parameters to delete.
  * @returns None
  */
 export const deleteQueryString = (searchParams: [string, string][] , ...inputParams: string[][]) => {
    const params = new URLSearchParams(searchParams);
    for (const [name] of inputParams) {
      params.delete(name); 
    }
  };