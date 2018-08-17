// bespoke filter to pare down results. Change at will ;)
const filterFn = (element,idx) => {
  return idx<5
}

const arrayStringMapper = obj => `'${JSON.stringify(obj)}' `

// legit, since random number collisions are rare. Though in production, keys should be generated more systematically.
const randomKey = () => 'key'+ Math.random().toString().slice(2);


// interpretResponse
// TODO: Make this use streams once it's working
const interpretResponse = (result, log) => {
  if (log) console.log ('Before interpret:', result);
  if (Array.isArray(result)) {
    result= result.slice(0,5);
    result.forEach (record => {
      Object.keys(record).forEach (key => {
        if (typeof record[key] === 'object')
          record[key] = JSON.stringify(record[key])
      })
    });
  };
  if (log) console.log('After interpret:', result);
  return result
}


// return something which is an array. If not object, make it a single element array,
// If array, stringify its elements
// if non-array object (as we expect), return array of objects containing {key, value}
const interpretRecord = record => {
  return typeof record !== 'object' ?
    [record]
    : (Array.isArray(record)) ?
      (record.map (innerObject => JSON.stringify(innerObject)))
        : Object.keys(record).map (key =>
            ({key : key,
            value : record[key]})
          )
};


// formatResponse is used for debugging and returns a message based on JSON.
// MessageBar can be used for debugging by passing it formatResponse(result)
const formatResponse = result => {
  if (!result || Object.keys(result).length === 0)
    return 'Got back some kinda nothing';
  if (!Array.isArray(result)) {
    return result.message ?
      `message: ${result.message}`
      : result.error ?
        `error: ${result.error}`
        : 'Got back something which was not an array- '+JSON.stringify(result);
  }

  result.forEach (record => {
    Object.keys(record).forEach (key => {
      record[key] = ''+record[key];
    })
  })

  return result
    .filter (filterFn)
    .map (arrayStringMapper)
    .join ('\n\n')
}

export {interpretResponse, formatResponse, interpretRecord, randomKey};
