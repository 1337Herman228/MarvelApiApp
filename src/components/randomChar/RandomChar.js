import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import React from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends React.Component {

    componentDidMount(){
       this.updateChar()
    }

    state={
        char:{},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService()

    onCharLoaded = (char)=>{
        this.setState({char, loading:false, error:false})
    }

    onError = () =>{
        this.setState({error:true, loading:false})
    }

    updateChar = () =>{
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.setState({loading:true})
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

   render(){
    const{char, loading,error}=this.state
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <View char={char}/> : null

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={this.updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
   }

}

const View = ({char}) => {
    const {name,description,thumbnail,homepage,wiki}=char

    const imgStyle = thumbnail=='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit:'contain'}:{objectFit:'cover'}

    return(
        <div className="randomchar__block">
                <img style={imgStyle} src={thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p style={{overflow:'auto',maxHeight:'90px'}} className="randomchar__descr">
                        {description}
                        </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default RandomChar;