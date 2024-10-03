import icons from './icons'

const {AiFillStar, AiOutlineStar} = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join("-")
export const formatMoney = number => Number(number).toLocaleString()
export const renderStarFromNumber = (number) => {
    if(!Number(number)) return ;
    const stars = []
    for (let i = 0; i < +number; i++) stars.push(<AiFillStar key={i} color='gold'/>)
    for (let i = 5; i > +number; i--) stars.push(<AiOutlineStar key={i} color='gold'/>)
    return stars
}