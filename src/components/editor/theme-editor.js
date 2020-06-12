import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import FieldSet from '../form/fieldset'
import { saveTheme } from '../../redux'
import TextInput from '../form/text-input'
import ColorInput from '../form/color-input'
import { schema } from '../../yup/theme.js'
import { Container } from '../../styles/mixin'
import styled from 'styled-components'

const ThemeParams = styled.div`
  display: flex;
  flex-direction: column;
`

const ThemeEditor = ({ theme, activeIndex, index }) => {
  const methods = useForm({
    validationSchema: schema,
    defaultValues: theme,
  })

  useEffect(() => {
    methods.reset(theme)
  }, [theme])

  const tabIndexToSave = useSelector(state => state.editor.tabIndexToSave)
  const defaultTheme = useSelector(state => state.config.default.theme)

  const dispatch = useDispatch()

  useEffect(() => {
    if (tabIndexToSave.index === index) {
      methods.handleSubmit(onSaveTheme)()
    }
  }, [tabIndexToSave])

  const onSaveTheme = data => {
    console.log('THEME SAVED', data)
    dispatch(saveTheme(data))
  }

  const colors = ['primary', 'secondary', 'font', 'bg']

  return (
    activeIndex === index && (
      <Container>
        <FormContext {...methods}>
          <ThemeParams>
            <FieldSet label='Colors' row>
              {colors.map((color, i) => {
                return (
                  <ColorInput
                    key={i}
                    name={`color.${color}`}
                    label={color}
                    defaultValue={defaultTheme.color[color]}
                  />
                )
              })}
            </FieldSet>

            <FieldSet label='Fonts' row>
              <TextInput
                name='font.primary'
                label='primary'
                defaultValue={defaultTheme.font.primary}
              />
              <TextInput
                name='font.secondary'
                label='secondary'
                defaultValue={defaultTheme.font.secondary}
              />
              <TextInput
                name='font.body'
                label='body'
                defaultValue={defaultTheme.font.body}
              />
            </FieldSet>

            <FieldSet label='Footer' row>
              <ColorInput
                name='footer.color'
                label='color'
                defaultValue={defaultTheme.footer.color}
              />
              <ColorInput
                name='footer.bg'
                label='bg'
                defaultValue={defaultTheme.footer.bg}
              />
            </FieldSet>

            <FieldSet label='Header' row>
              <ColorInput
                name='header.color'
                label='color'
                defaultValue={defaultTheme.header.color}
              />
              <ColorInput
                name='header.bg'
                label='bg'
                defaultValue={defaultTheme.header.bg}
              />
            </FieldSet>

            <FieldSet label='Section' row>
              <TextInput
                name='section.padding'
                label='padding'
                defaultValue={defaultTheme.section.padding}
              />
            </FieldSet>

            <FieldSet label='Block' row>
              <TextInput
                name='block.padding'
                label='padding'
                defaultValue={defaultTheme.block.padding}
              />
              <TextInput
                name='block.spacing'
                label='spacing'
                defaultValue={defaultTheme.block.spacing}
              />
            </FieldSet>

            <FieldSet label='Breakpoints' row>
              <TextInput
                name='breakpoint.sm'
                label='sm'
                defaultValue={defaultTheme.breakpoint.sm}
              />
              <TextInput
                name='breakpoint.md'
                label='md'
                defaultValue={defaultTheme.breakpoint.md}
              />
              <TextInput
                name='breakpoint.xl'
                label='xl'
                defaultValue={defaultTheme.breakpoint.xl}
              />
              <TextInput
                name='breakpoint.lg'
                label='lg'
                defaultValue={defaultTheme.breakpoint.lg}
              />
            </FieldSet>
          </ThemeParams>
        </FormContext>
      </Container>
    )
  )
}

export default ThemeEditor
