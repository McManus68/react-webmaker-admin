import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string(),
  slug: yup.string(),
  description: yup.string(),
  sections: yup.array().of(
    yup.object().shape({
      type: yup.string(),
      title: yup.string(),
      subtitle: yup.string(),
      image: yup.string(),
      overlay: yup.string(),
      rows: yup.array().of(
        yup.object().shape({
          type: yup.string(),
          blocks: yup.array().of(
            yup.object().shape({
              type: yup.string(),
              classes: yup.string(),
              title: yup.string(),
              subtitle: yup.string(),
              buttonText: yup.string(),
              images: yup.array().of(yup.string()),
              responsive: yup
                .object()
                .nullable()
                .shape({
                  sm: yup
                    .number()
                    .min(1)
                    .max(12)
                    .nullable()
                    .transform((value, originalValue) =>
                      originalValue.trim() === '' ? null : value
                    ),
                  md: yup
                    .number()
                    .min(1)
                    .max(12)
                    .nullable()
                    .transform((value, originalValue) =>
                      originalValue.trim() === '' ? null : value
                    ),
                  lg: yup
                    .number()
                    .min(1)
                    .max(12)
                    .nullable()
                    .transform((value, originalValue) =>
                      originalValue.trim() === '' ? null : value
                    ),
                  xl: yup
                    .number()
                    .min(1)
                    .max(12)
                    .nullable()
                    .transform((value, originalValue) =>
                      originalValue.trim() === '' ? null : value
                    ),
                }),
              animation: yup.object().nullable().shape({
                type: yup.string().nullable(),
                delay: yup.number().nullable(),
                left: yup.bool().nullable(),
                right: yup.bool().nullable(),
                top: yup.bool().nullable(),
                bottom: yup.bool().nullable(),
              }),
            })
          ),
        })
      ),
    })
  ),
})
