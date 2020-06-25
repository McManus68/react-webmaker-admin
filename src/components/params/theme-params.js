import React from 'react'
import { useSelector } from 'react-redux'
import FieldSet from '../form/fieldset'
import TextInput from '../form/text-input'
import ColorInput from '../form/color-input'
import styled from 'styled-components'

const StyledThemeParams = styled.div`
  display: flex;
  flex-direction: column;
`

const ThemeParams = () => {
  const defaultTheme = useSelector(state => state.config.default.theme)
  const colors = ['primary', 'secondary', 'font', 'bg']

  return (
    <StyledThemeParams>
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
        <TextInput name='font.primary' label='primary' defaultValue={defaultTheme.font.primary} />
        <TextInput
          name='font.secondary'
          label='secondary'
          defaultValue={defaultTheme.font.secondary}
        />
        <TextInput name='font.body' label='body' defaultValue={defaultTheme.font.body} />
      </FieldSet>

      <FieldSet label='Footer' row>
        <ColorInput name='footer.color' label='color' defaultValue={defaultTheme.footer.color} />
        <ColorInput name='footer.bg' label='bg' defaultValue={defaultTheme.footer.bg} />
      </FieldSet>

      <FieldSet label='Header' row>
        <ColorInput name='header.color' label='color' defaultValue={defaultTheme.header.color} />
        <ColorInput name='header.bg' label='bg' defaultValue={defaultTheme.header.bg} />
      </FieldSet>

      <FieldSet label='Section' row>
        <TextInput
          name='section.padding'
          label='padding'
          defaultValue={defaultTheme.section.padding}
        />
      </FieldSet>

      <FieldSet label='Block' row>
        <TextInput name='block.padding' label='padding' defaultValue={defaultTheme.block.padding} />
        <TextInput name='block.spacing' label='spacing' defaultValue={defaultTheme.block.spacing} />
      </FieldSet>

      <FieldSet label='Breakpoints' row>
        <TextInput name='breakpoint.sm' label='sm' defaultValue={defaultTheme.breakpoint.sm} />
        <TextInput name='breakpoint.md' label='md' defaultValue={defaultTheme.breakpoint.md} />
        <TextInput name='breakpoint.xl' label='xl' defaultValue={defaultTheme.breakpoint.xl} />
        <TextInput name='breakpoint.lg' label='lg' defaultValue={defaultTheme.breakpoint.lg} />
      </FieldSet>
    </StyledThemeParams>
  )
}

export default ThemeParams
