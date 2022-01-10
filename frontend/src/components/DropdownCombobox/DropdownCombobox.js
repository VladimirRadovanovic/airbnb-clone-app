import React, {useState} from 'react'

import {useCombobox} from 'downshift'
import {items, menuStyles, comboboxStyles, comboboxWrapperStyles} from './utils'
import './ComboBox.css'

function DropdownCombobox({state, setState}) {
  const [inputItems, setInputItems] = useState(items)

  let able;
  if (state) able = true
  else able = false
  setState(inputItems)

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
    onInputValueChange: ({inputValue}) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      )
    },
  })
  return (
    <div className='combobox-container'>
      {/* <label {...getLabelProps()}>Choose an element:</label> */}
      <div className='combobox-container' style={comboboxStyles} {...getComboboxProps()}>
        <input {...getInputProps({disabled: able, value: state,  placeholder: 'State' })} />
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
                highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
              }
              key={`${item}${index}`}
              {...getItemProps({item, index})}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}


export default DropdownCombobox;
