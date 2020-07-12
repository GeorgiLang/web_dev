import React from 'react'
import s from './FullCard.module.css'
import { Link } from 'react-router-dom'

const ColorButtons = props => {

    let { current_model,
        current_color, 
        parent_id, 
        models_group, 
        category, 
        setExtraCard } = props

    let list_buttons = []
    let color_name = ''

    for (let i = 0; i < models_group.length; i++) {

        let iDs = []

        color_name = models_group[i].color_name
        current_color = models_group[i].color

        let ID = 0

        for (let key in models_group[i].models_vars) {

            if (models_group[i].models_vars[key].id) {
                iDs.push(models_group[i].models_vars[key].id)
                ID = models_group[i].models_vars[key].id
            }
        }

        let method = 'push'
        let current_product = models_group[i].color === current_model

        current_product ? method = 'unshift' : method = 'push'

        list_buttons[method](
            <Link className={s.product_color} to={`/fullcard/${category}/${parent_id}/${iDs[0]}`} key={ID}>
                <button
                    disabled={current_product}
                    onClick={() => {
                        setExtraCard(iDs[0], category)
                    }}>
                    <span style={{ backgroundColor: current_color }}></span>
                    <span style={{ height: 'auto', width: 'auto', padding: '0 20px' }}>{color_name}</span>
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