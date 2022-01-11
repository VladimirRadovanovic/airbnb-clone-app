import React, { useState, useEffect } from 'react'

import { useCombobox } from 'downshift'
import { items, menuStyles, comboboxStyles, comboboxWrapperStyles } from './utils'
import './ComboBox.css'

function DropdownCombobox({ state, setState }) {
  const [inputItems, setInputItems] = useState(items)
  const [comboState, setComboState] = useState(state)

  console.log(inputItems, 'whyyyyyy*************')
  console.log(comboState, 'combo state')

  // let able;
  // if (state) able = true
  // else able = false

  // this is causing the modal to render twice and overlap causing the background to be darker


  useEffect(() => {
    if (comboState) {
       setState(inputItems)

    }
    if (!comboState) {
       setState([])
    }

  }, [inputItems, comboState])

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      console.log(inputValue, 'inputValue')
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase()),
        ),

      )
      setComboState(inputValue)
    },
  })
  return (
    <div className='combobox-container'>
      {/* <label {...getLabelProps()}>Choose an element:</label> */}
      <div className='combobox-container' style={comboboxStyles} {...getComboboxProps()}>
        <input {...getInputProps({ value: comboState || '', placeholder: 'State' })} />
        {/* <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </button> */}
      </div>
      <ul {...getMenuProps()} style={menuStyles}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}


export default DropdownCombobox;
