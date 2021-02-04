import React from 'react'
import s from './FullCard.module.css'
import { Link } from 'react-router-dom'

const ExtraValuesButtons = ({
    current_model,
    variants_name,
    current_value,
    category_name,
    models }) => {

    const list = []
    let isCurrent = false

    for (let i = 0; i < models.length; i++) {

        if (models[i].color === current_model) {

            let ID = models[i].id
            let value = models[i].value
            isCurrent = current_value === value

            list.push(
                <Link to={`${ID}?category_name=${category_name}&product_name=${models[i].product_name}`} key={ID}>
                    <button
                        id={ID}
                        disabled={isCurrent}
                        style={isCurrent ? { fontWeight: 'bold' } : null}>
                        {isCurrent && variants_name === "Пам'ять" ?
                            <svg width='30px' height='20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M640 130.94V96c0-17.67-14.33-32-32-32H32C14.33 64 0 78.33 0 96v34.94c18.6 6.61 32 24.19 32 45.06s-13.4 38.45-32 45.06V320h640v-98.94c-18.6-6.61-32-24.19-32-45.06s13.4-38.45 32-45.06zM224 256h-64V128h64v128zm128 0h-64V128h64v128zm128 0h-64V128h64v128zM0 448h64v-26.67c0-8.84 7.16-16 16-16s16 7.16 16 16V448h128v-26.67c0-8.84 7.16-16 16-16s16 7.16 16 16V448h128v-26.67c0-8.84 7.16-16 16-16s16 7.16 16 16V448h128v-26.67c0-8.84 7.16-16 16-16s16 7.16 16 16V448h64v-96H0v96z" />
                            </svg> : null}
                        {isCurrent && variants_name === "Диагональ" ?
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 512 512">
                                <path d="M512,0v224c0,17.688-14.312,32-32,32s-32-14.313-32-32V109.25L109.25,448H224c17.688,0,32,14.312,32,32s-14.313,32-32,32H0   V288c0-17.688,14.313-32,32-32s32,14.312,32,32v114.75L402.75,64H288c-17.688,0-32-14.313-32-32s14.312-32,32-32H512z" />
                            </svg> : null}
                        <span>{value}</span>
                    </button>
                </Link>
            )
        }
    }

    return (
        <div className={s.models}>
            {list}
        </div>
    )
}

export default ExtraValuesButtons
