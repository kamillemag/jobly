const { BadRequestError } = require("../expressError");

// helper function to make partial update queries
// accepts dataToUpdate which is an {Object} in this format {field1: updatedVal, field2: updatedVal,...}
// jsToSql which is an {Object} that maps js-style data fields to the related database column names
// returns an {Object} {sqlSetCols, dataToUpdate}

// example {firstName: 'John', age: 36} => {setCols: '"first_name" = $1, "age" = $2', values: ['John', 36]}

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
