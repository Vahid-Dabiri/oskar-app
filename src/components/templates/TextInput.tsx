import React from 'react'

type Props = {
    inputId: string,
    lableStyle: string,
    inputStyle: string,
    inputTitle: string,
    value: string,
    onChangeState: React.Dispatch<React.SetStateAction<string>>
}

function TextInput({inputId, lableStyle, inputStyle, inputTitle, value, onChangeState}: Props) {
    return (
        <label htmlFor={inputId} className={lableStyle}><span>{inputTitle}<span className='text-red-600'>*</span></span>
            <input className={inputStyle} type="text" name={inputId} id={inputId} value={value} onChange={(event) => onChangeState(event.target.value)} />
        </label>
    )
}

export default TextInput