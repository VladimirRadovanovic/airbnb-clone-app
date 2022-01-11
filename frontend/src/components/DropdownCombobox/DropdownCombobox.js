import React, { useState, useEffect } from 'react'

import { useCombobox } from 'downshift'
import { items, menuStyles, comboboxStyles, comboboxWrapperStyles } from './utils'
import './ComboBox.css'

function DropdownCombobox({ state, stateSetter }) {
  const [inputItems, setInputItems] = useState(items)
  const [comboState, setComboState] = useState(state)



//add
//add
//add

  useEffect(() => {
    if (comboState) {
       stateSetter(inputItems)

    }
    if (!comboState) {
       stateSetter([])
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

      <div className='combobox-container' style={comboboxStyles} {...getComboboxProps()}>
        <input {...getInputProps({ value: comboState || '', placeholder: 'State' })} />

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
