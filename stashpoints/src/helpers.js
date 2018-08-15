// bespoke filter to pare down results. Change at will ;)
const filterFn = (element,idx) => idx<5

const arrayStringMapper = obj => `'${JSON.stringify(obj)}' `

const dataTrimmer = obj => {

}

const interpretResponse = result => result;

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
      record[key] = ''+record[key]+' . . . . . .';
    })
  })

  return result
    .filter (filterFn)
    .map (arrayStringMapper)
    .join ('\n__________________________________________________________________________________________________________________________________ ________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________\n')
}

export {interpretResponse, formatResponse};
