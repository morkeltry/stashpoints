// bespoke filter to pare down results. Change at will ;)
const filterFn = (element,idx) => idx<5

const arrayStringMapper = obj => `'${JSON.stringify(obj)}' `

const dataTrimmer = obj => {
  
}


const interpretResponse = (result) => {
  if (!result || Object.keys(result).length === 0)
    return 'Got back some kinda nothing';
  if (!Array.isArray(result))
    return 'Got back something which was not an array';

  return result
    .filter (filterFn)
    .map (arrayStringMapper)
    .join ('\n _________________________________________________________________\n')
}

export {interpretResponse};
