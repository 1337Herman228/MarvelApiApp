import './charList.scss';
import React from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = ({onCharSelected, onSizeIncrement, size, liRefs, whatCharSelected}) => {

    return (
        <div className="char__list">
            <ul className="char__grid">

            {Array.from({ length: size }).map((_, index) => (
                <Li key={index} ref={liRefs[index]} whatCharSelected={whatCharSelected} onCharSelected={onCharSelected}/>
            ))}

            </ul>
            <button onClick={()=> onSizeIncrement()} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

class Li extends React.Component{

    state={
        char:{},
        loading: true,
        error: false,
        selected: false,
    }

    getCharId = ()=>{
        return this.state.char.id
    }

    componentDidMount(){
       this.updateChar()
    }

    onSelectComponent = ()=>{
        console.log('onSelectComponent компонента CharList')
        this.setState({selected:true})
    }
    onUnSelectComponent = ()=>{
        this.setState({selected:false})
    }

    marvelService = new MarvelService()

    onCharLoaded = (char)=>{
        console.log('update')
        this.setState({char, loading:false})
    }
    onError = () =>{
        this.setState({error:true, loading:false})
    }
    updateChar = () =>{
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    render(){
        const {onCharSelected, whatCharSelected} = this.props
        const {char, loading,error} = this.state

        const errorMessage = error ? <ErrorMessage newStyle={{width:200, height:318}}/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View whatCharSelected={whatCharSelected} selected={this.state.selected} onCharSelected={onCharSelected} char={char}/> : null

        return(
            <>
            {errorMessage}
            {spinner}
            {content}
            </>
        )
    }
}

const View = ({char, onCharSelected, selected, whatCharSelected }) =>{

    const {name,thumbnail,id}=char
    const imgStyle = thumbnail=='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit:'unset'}:{objectFit:'cover'}
    const selectedClass = selected ? 'selected' : ''

    const  onClickFunc = async (id)=>{
        await onCharSelected(id);
        whatCharSelected();
    }

    return (
        <li tabIndex={0} className={"char__item" + ' ' + selectedClass} key={id} onClick={() => {onClickFunc(id)}} onKeyDown={(event) => {event.key === 'Enter' && onClickFunc(id)}}>
            <img style={imgStyle} src={thumbnail} alt={name}/>
        <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;