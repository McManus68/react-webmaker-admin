import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string(),
  slug: yup.string(),
  description: yup.string(),
})
