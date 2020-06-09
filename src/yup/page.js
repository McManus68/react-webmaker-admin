import * as yup from 'yup'

import { YUP_PARAM_VALUE, YUP_RESPONSIVE, YUP_ANIMATION } from './utils'

export const schema = yup.object().shape({
  title: yup.string(),
  slug: yup.string(),
  description: yup.string(),
  sections: yup.array().of(
    yup.object().shape({
      params: yup.array().of(
        yup.object().shape({
          name: yup.string(),
          value: YUP_PARAM_VALUE,
          type: yup.string(),
        })
      ),
      rows: yup.array().of(
        yup.object().shape({
          type: yup.string(),
          blocks: yup.array().of(
            yup.object().shape({
              type: yup.string(),
              classes: yup.string(),
              params: yup.array().of(
                yup.object().shape({
                  name: yup.string(),
                  value: YUP_PARAM_VALUE,
                  type: yup.string(),
                })
              ),
              responsive: YUP_RESPONSIVE,
              animation: YUP_ANIMATION,
            })
          ),
        })
      ),
    })
  ),
})
