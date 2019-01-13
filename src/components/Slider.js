import React from 'react';

import Slide1 from '../img/slide1.jpg';
import Slide2 from '../img/slide2.jpg';
import Slide3 from '../img/slide3.jpg';
import Slide4 from '../img/slide4.jpg';

class Slider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            slides:[
                {eachSlide: `url(${Slide1})`},
                {eachSlide: `url(${Slide2})`},
                {eachSlide: `url(${Slide3})`},
                {eachSlide: `url(${Slide4})`}
            ],
            autoplay: false,
            active: 0,
            max: 0
        }

        this.state.max = this.state.slides.length;
        this.intervalBetweenSlides = this.intervalBetweenSlides.bind(this);
        this.toggleAutoPlay = this.toggleAutoPlay.bind(this);
        this.nextOne = this.nextOne.bind(this);
        this.prevOne = this.prevOne.bind(this);
    }

    componentDidMount(){
        this.interval = setInterval(() =>this.intervalBetweenSlides(), 3000);
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    intervalBetweenSlides(){
        if(this.state.autoplay === true){
            if(this.state.active === this.state.max -1){
                this.state.active = 0 
            } else{
                this.state.active++
            }
            this.setState({
                active: this.state.active
            })
        }
    }

    toggleAutoPlay(){
        this.setState({
            autoplay: !this.state.autoplay
        })
    }
    nextOne(){
        (this.state.active < this.state.max -1) ?
        this.setState({
            active: this.state.active +1
        }):
        this.setState({
            active: 0
        })
    }
    prevOne(){
        (this.state.active > 0 ) ?
        this.setState({
            active: this.state.active -1
        }):
        this.setState({
            active: this.state.max
        })
        
    }

    dots(index){
        this.setState({
            active: index
        })
    }
    isActive(value){
        if(this.state.active === value){
            return 'active'
        }
    }
    setSliderStyles(){
        
        const transition = this.state.active * - 100/this.state.slides.length

        return{
            width: (this.state.slides.length * 100) + '%',
            transform: `translateX(${transition}%)`
        }
    }
    renderSlides(){
        const transition = 100/this.state.slides.length + '%'
        return this.state.slides.map((item,index)=>(
            <div
                className='each-slide'
                key={index}
                style = {{backgroundImage: item.eachSlide, width: transition}}>
            </div>
        ))
    }
    renderDots(){
        return this.state.slides.map((item,index)=>(

            <li
                className={this.isActive(index) + ' dots'}
                key={index}
                ref = "dots"
                onClic = {this.dots.bind(this,index)}>
                <a>&#6979;</a>
            </li>
        ))
    }
    renderPlayStop(){
        let playStop;

        if(this.state.autoplay){
            playStop = <svg></svg>;
        }else{
            playStop = <svg></svg>;
        }
        return playStop
    }
    renderArrows(){
        return(
            <div>
                <button
                    type = "button"
                    className = "arrows prev"
                    onClic = {this.prevOne}>
                    <svg></svg>
                </button>
                <button
                    type = "button"
                    className = "arrows next"
                    onClic = {this.nextOne}>
                    <svg></svg>
                </button>
            </div>
        )
    }

    render(){
        return(
            <div className="slider">
                <div
                    className="wrapper"
                    styles = {this.setSliderStyles()}>
                    {this.renderSlides()}
                </div>
                {this.renderArrows()}
                <ul className = "dots-container">
                    {this.renderDots}
                </ul>
                <a
                    className = "toggle-play"
                    onClick={this.toggleAutoPlay}>
                        {this.renderPlayStop()}
                </a>

            </div>
        )
    }
}

export default Slider