
function FoodMenu({foodList}: {foodList: Food}) {
    return(
        <div>
            <p>{foodList.title}</p>
            <ul>
                {foodList.content.map((line, index) => <li key={index}>{line}</li>)}
            </ul>
        </div>
    )
}

export default FoodMenu