import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string(),
  slug: yup.string(),
  description: yup.string(),
  sections: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      subtitle: yup.string(),
      image: yup.string(),
      overlay: yup.string(),
      rows: yup.array().of(
        yup.object().shape({
          blocks: yup.array().of(
            yup.object().shape({
              classes: yup.string(),
              title: yup.string(),
              subtitle: yup.string(),
              buttonText: yup.string(),
              images: yup.array().of(yup.string()),
              responsive: yup.object().shape({
                sm: yup.number().min(1).max(12),
                md: yup.number().min(1).max(12),
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
              animation: yup.object().shape({
                type: yup.string(),
                delay: yup.number(),
                left: yup.bool(),
                right: yup.bool(),
                top: yup.bool(),
                bottom: yup.bool(),
              }),
            })
          ),
        })
      ),
    })
  ),
})
