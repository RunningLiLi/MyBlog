import './index.scss'
export default function Loading(){
    return (
        <div id='loading-container'>
            <div>
                <img src={require('../../resource/loading.gif')}></img>
                <span>加载中...</span>
            </div>
        </div>
    )
}