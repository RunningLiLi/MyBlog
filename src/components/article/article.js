import './article.scss'
import Fetch from '../../commonComponents/fetch'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { micromark } from 'micromark' 
export default function Article(){
    const location=useLocation()
    useEffect(()=>{
        console.log()
    },[])



    return(
        <Fetch renderSuccess={renderSuccess} url={`/articles/getArticleById${location.search}`}></Fetch>
    )
    function renderSuccess(data){
        return(
            <div id='article-container'>
                <section className='content'> 
                    <header>
                        <h1 className='title'>{data[0].title}</h1>
                        <span className='author-date'>
                            <span >{data.userName}</span>
                            <span >{new Date(data[0].date*1).toLocaleString()}</span>
                        </span>
                        <span className='type'>{data[0].classes}</span>
                        <ul className='keys'>
                           {
                               data[0].keys.map((v,k)=><li key={k}>{v}</li>)
                           }
                        </ul>
                    </header>
                    <main className='body' dangerouslySetInnerHTML={{__html: micromark(data[0].body)}}>

                    </main>
                </section> 
           </div>
        )
    }
}