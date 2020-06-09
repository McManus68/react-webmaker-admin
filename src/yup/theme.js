import * as yup from 'yup'

export const schema = yup.object().shape({
  color: yup.object().shape({
    primary: yup.string(),
    secondary: yup.string(),
    font: yup.string(),
    bg: yup.string(),
  }),
  footer: yup.object().shape({
    font: yup.string(),
    bg: yup.string(),
  }),
  header: yup.object().shape({
    font: yup.string(),
    bg: yup.string(),
  }),
  block: yup.object().shape({
    padding: yup.string(),
    spacing: yup.string(),
  }),
  section: yup.object().shape({
    padding: yup.string(),
  }),
  font: yup.object().shape({
    primary: yup.string(),
    secondary: yup.string(),
    body: yup.string(),
  }),
  breakpoint: yup.object().shape({
    sm: yup.string(),
    md: yup.string(),
    lg: yup.string(),
    xl: yup.string(),
  }),
})
