import React from 'react'

const ProductDescription = ({
    description,
    className }) => {

    let list = []
    let qty_fields_in_description = Object.keys(description).length / 2

    for (let i = 1; i <= qty_fields_in_description; i++) {

        if (description[`fld_name${i}`] && description[`fld_value${i}`]) {
            list.push(
                <li key={i}>
                    <span>{description[`fld_name${i}`]}</span>
                    <span>{description[`fld_value${i}`]}</span>
                </li>
            )
        }
    }
    return (
        <ul className={className}>
            {list}
        </ul>
    )
}

export default ProductDescription
