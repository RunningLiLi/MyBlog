import './index.scss'
export default ({errMes})=>{
    return(
        <div className="error-container">
            <img src={require('../../resource/err.webp')}></img>
            <div>{errMes.message}</div>
        </div>
    )
}