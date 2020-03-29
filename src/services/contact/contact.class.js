const SendGridMail = require('@sendgrid/mail')
const validator = require('validator')
const xssFilters = require('xss-filters')
const { GeneralError, Unprocessable } = require('@feathersjs/errors')

SendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

/* eslint-disable no-unused-vars */
exports.Contact = class Contact {
  async create (data, params) {
    const attributes = [
      'name',
      'email',
      'areaCode',
      'phoneNumber',
      'contactPreference',
      'msg'
    ]
    const sanitizedAttributes = attributes.map(n => validateAndSanitize(n, data[n]))

    const someInvalid = sanitizedAttributes.some(r => !r)
    if(someInvalid) {
      throw new Unprocessable({ error: 'Hmm... parece que algum campo está inválido.' })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }

    await sendMail(...sanitizedAttributes)
    return { message: 'E-mail enviado com sucesso.' }
  }
}

const rejectFunctions = new Map([
  ['name', v => v.length < 4],
  ['email', v => !validator.isEmail(v)],
  ['areaCode', v => v.length != 2],
  ['phoneNumber', v => v.length > 9],
  ['contactPreference', v => !['email', 'phone', 'whatsapp'].includes(v)],
  ['msg', v => v.length < 15]
])

const validateAndSanitize = (key, value) => {
  return rejectFunctions.has(key) && !rejectFunctions.get(key)(value) && xssFilters.inHTMLData(value)
}

const sendMail = (name, email, areaCode, phoneNumber, contactPreference, msg) => {
  const contactInfo = `${name} | +55 ${areaCode} ${phoneNumber} | Preferência de contato: ${contactPreference}`
  return SendGridMail.send({
    to: 'oi@clarific.com.br',
    from: 'contactform@clarific.com.br',
    reply_to: email,
    subject: `Website: Formulário de contato [${name}]`,
    text: contactInfo + '\n\n' + msg
  })
}
