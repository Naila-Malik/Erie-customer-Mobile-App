// export function phoneValidator(phone) {
//   if (!phone) return "phone can't be empty."
//   if (phone.length < 5) return 'phone must be at least 5 characters long.'
//   return ''
// }


export function meterReadingValidator(reading, last, type) {
  console.log({reading, last, type})
  last = last || 0;
  if (!reading) return "Meter reading can't be empty."
  if (last > reading && type == 'start') return `Meter reading must be greater than ${last}.`
  if (last >= reading && type == 'end') return `Meter reading must be greater than ${last}.`
  return ''
} 
