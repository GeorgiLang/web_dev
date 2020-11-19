import React from 'react'

const ProductDescription = ({
    card,
    description,
    className,
    display }) => {

    let list = []

    let card_list = card.acf ? card.acf : card
    let qty_fields_in_description = Object.keys(card_list[`${description}`]).length / 2

    for (let i = 1; i <= qty_fields_in_description; i++) {

        if (card_list[`${description}`][`fld_name${i}`] && card_list[`${description}`][`fld_value${i}`]) {
            list.push(
                <li key={i}>
                    <span>{card_list[`${description}`][`fld_name${i}`]}</span>
                    <span>{card_list[`${description}`][`fld_value${i}`]}</span>
                </li>
            )
        }
    }

    return (
        <ul className={`${className} ${display}`}>
            {list}
        </ul>
    )
}

export default ProductDescription
