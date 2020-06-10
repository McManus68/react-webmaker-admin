import * as yup from 'yup'

export const YUP_PARAM_VALUE = yup
  .mixed()
  .when('name', {
    is: 'images',
    then: yup.array().of(yup.string()),
  })
  .when('type', {
    is: 'NUMBER',
    then: yup.number().nullable(),
  })
  .when('type', {
    is: 'STRING',
    then: yup.string().nullable(),
  })

export const YUP_RESPONSIVE = yup
  .object()
  .nullable()
  .shape({
    sm: yup.number().min(0).max(12).nullable(),
    md: yup.number().min(0).max(12).nullable(),
    lg: yup.number().min(0).max(12).nullable(),
    xl: yup.number().min(0).max(12).nullable(),
  })

export const YUP_ANIMATION = yup.object().nullable().shape({
  type: yup.string().nullable(),
  delay: yup.number().nullable(),
  left: yup.bool().nullable(),
  right: yup.bool().nullable(),
  top: yup.bool().nullable(),
  bottom: yup.bool().nullable(),
})
