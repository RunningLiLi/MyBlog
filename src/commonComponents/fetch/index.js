import useFetch from '../../hooks/useFetch'
import Loading from '../loading';
import RenderError from '../renderError';
export default function Fetch({url,renderSuccess}){
    const {data,err,loading}=useFetch(url);
    if(err)return <RenderError errMes={err}/>
    if(loading)return<Loading/>
    return renderSuccess(data)
}