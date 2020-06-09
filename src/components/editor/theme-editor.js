import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import FieldSet from '../form/fieldset'
import { saveTheme } from '../../redux'
import TextInput from '../form/text-input'
import ColorInput from '../form/color-input'
import { schema } from '../../yup/theme.js'
import './theme-editor.scss'

const ThemeEditor = ({ theme, activeIndex, index }) => {
  const methods = useForm({
    validationSchema: schema,
    defaultValues: theme,
  })

  useEffect(() => {
    methods.reset(theme)
  }, [theme])

  const tabIndexToSave = useSelector(state => state.editor.tabIndexToSave)

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
      <div className='container'>
        <FormContext {...methods}>
          <form>
            <div className='theme-editor-params'>
              <FieldSet label='Colors' row>
                {colors.map((color, i) => {
                  return (
                    <ColorInput key={i} name={`color.${color}`} label={color} />
                  )
                })}
              </FieldSet>

              <FieldSet label='Font' row>
                <TextInput name={`font.primary`} label='primary' />
                <TextInput name={`font.secondary`} label='secondary' />
                <TextInput name={`font.body`} label='body' />
              </FieldSet>

              <FieldSet label='Footer' row>
                <ColorInput name={`footer.color`} label='color' />
                <ColorInput name={`footer.bg`} label='bg' />
              </FieldSet>

              <FieldSet label='Header' row>
                <ColorInput name={`header.color`} label='color' />
                <ColorInput name={`header.bg`} label='bg' />
              </FieldSet>

              <FieldSet label='Section' row>
                <TextInput name={`section.padding`} label='padding' />
              </FieldSet>

              <FieldSet label='Block' row>
                <TextInput name={`block.padding`} label='padding' />
                <TextInput name={`block.spacing`} label='spacing' />
              </FieldSet>
            </div>
          </form>
        </FormContext>
      </div>
    )
  )
}

export default ThemeEditor
