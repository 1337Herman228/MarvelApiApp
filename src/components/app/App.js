import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import React, { useRef, useState, useEffect } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import PropTypes from 'prop-types';
import decoration from '../../resources/img/vision.png';

class App extends React.Component {

    state={
        selectedChar:null,
        size: 9,
        liRefs:[],
    }

    // const [selectedChar,setSelectedChar] = useState(null);
    // const [size,setSize] = useState(9);
    // const [liRefs,setLiRefs] = useState([]);

    // useEffect(()=>{
    //     console.log('useEffect')
    //     IncrementLiRefsArray()
    // },[])

    componentDidMount(){
        this.IncrementLiRefsArray()
    }

    // const
     whatCharSelected = () => {
        console.log('whatCharSelected')
        this.state.liRefs.forEach(element => {
            console.log(this.state.selectedChar)
            if(this.state.selectedChar === element.current.getCharId()){
                console.log('if')
                element.current.onSelectComponent()
            }
            else{
                console.log('else')
                element.current.onUnSelectComponent()}
        })
    }
    // const
     IncrementLiRefsArray = ()=> {

        console.log('IncrementLiRefsArray()')

        // setLiRefs(()=>Array.from({ length: size }).map(() => React.createRef()))

        this.setState( ({size}) =>({
            liRefs : Array.from({ length: size }).map(() => React.createRef()),
        }))
    }

    // const
     onCharSelected = (id)=>{

        console.log('onCharSelected()')

        // setSelectedChar(()=>(id))

        this.setState({
            selectedChar:id
        })
    }
    // const
     onSizeIncrement = ()=>{

        console.log('onSizeIncrement()')

        // setSize(size => size+9);
        // IncrementLiRefsArray()

        this.setState({
            size:this.state.size+9
        })
        this.incrementLiRefsArray()
    }

        render(){
            return (
                <div className="app">
                    <AppHeader/>
                    <main>
                        <RandomChar/>
                        <div className="char__content">
                            <CharList 
                            whatCharSelected={this.whatCharSelected}
                            liRefs={this.state.liRefs}
                            // handleLiMount={this.handleLiMount}
                            size={this.state.size} 
                             onSizeIncrement={this.onSizeIncrement}
                              onCharSelected={this.onCharSelected}/>
                            <ErrorBoundary>
                                <CharInfo charId={this.selectedChar}/>
                            </ErrorBoundary>
                            
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </main>
                </div>
            )
        }
    
}

App.propTypes={
    onCharSelected: PropTypes.func
}

export default App;