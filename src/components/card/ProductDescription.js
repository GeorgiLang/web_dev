import React from 'react'

const ProductDescription = props => {

    let list = []

    let card_list = props.card.acf ? props.card.acf : props.card
    let qty_fields_in_description = Object.keys(card_list[`${props.description}`]).length / 2

    for (let i = 1; i <= qty_fields_in_description; i++) {

        if (card_list[`${props.description}`][`fld_name${i}`] && card_list[`${props.description}`][`fld_value${i}`]) {
            list.push(
                <li key={i}>
                    <span>{card_list[`${props.description}`][`fld_name${i}`]}</span>
                    <span>{card_list[`${props.description}`][`fld_value${i}`]}</span>
                </li>
            )
        }
    }

    return (
        <ul className={`${props.className} ${props.display}`}>
            {list}
        </ul>
    )
}

export default ProductDescription
