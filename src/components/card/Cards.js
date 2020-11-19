import React from 'react';
import Card from './Card'

const Cards = ({
    purchase,
    cards,
    setBasket }) => {


    return cards.reduce((card, _card) => {

        let basket = false
        purchase.forEach(purchase => {

            if (purchase.id === _card.child_id) {
                basket = true
            }
        })
        card.push(<Card
            key={_card.id}
            card={_card}
            setBasket={setBasket}
            basket={basket}
        />)
        return card
    }, [])
}

export default React.memo(Cards)