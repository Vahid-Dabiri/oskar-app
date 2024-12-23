import React from 'react'

type Props = {
    headerTitles: string[]
}

function TableHeader({ headerTitles }: Props) {
    return (
        <thead>
            <tr>
                {
                    headerTitles.map((head, index) => <th key={index} className='table-col'>{head}</th>)
                }
            </tr>
        </thead>
    )
}

export default TableHeader