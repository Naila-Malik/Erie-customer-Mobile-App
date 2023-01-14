// export function phoneValidator(phone) {
//   if (!phone) return "phone can't be empty."
//   if (phone.length < 5) return 'phone must be at least 5 characters long.'
//   return ''
// }

export function phoneValidator(phone) {
  const re = /^(\+92|0|92)[0-9]{10}$/
  if (!phone) return "Phone number can't be empty."
  if (!re.test(phone)) return 'Please enter valid phone i.e. 03033232323'
  return ''
}

