import React from 'react'
import s from './FullCard.module.css'
import { Link } from 'react-router-dom'

const ColorButtons = ({
    current_model,
    category_name,
    models_group }) => {

    let list_buttons = []
    let color_name = ''

    for (let i = 0; i < models_group.length; i++) {

        let iDs = []

        color_name = models_group[i].color_name
        let current_color = models_group[i].color

        let ID = 0
        let product_name = ''
        for (let key in models_group[i].models_vars) {

            if (models_group[i].models_vars[key].id) {

                product_name = models_group[i].models_vars.models_var1.product_name

                iDs.push(models_group[i].models_vars[key].id)
                ID = models_group[i].models_vars[key].id
            }
        }

        let method = 'push'
        let current_product = models_group[i].color === current_model

        current_product ? method = 'unshift' : method = 'push'

        list_buttons[method](
            <Link className={s.product_color} to={`${iDs[0]}?category_name=${category_name}&product_name=${product_name}`} key={ID}>
                <button disabled={current_product}>
                    <span style={{ backgroundColor: current_color }}></span>
                    <span>{color_name}</span>
                </button>
            </Link>
        )
    }

    return (
        <div className={s.colors_block}>
            {list_buttons}
        </div>
    )
}

export default ColorButtons