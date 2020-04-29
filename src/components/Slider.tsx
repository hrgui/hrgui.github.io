import React from 'react'
import styled from 'styled-components'

const SliderImageHolder = styled.div`
  background: black;
  position: relative;
  height: 520px;
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: 167px;
  }

  div {
    top: 0;
    left: 0;
    opacity: 0;
    transform: translate3d(0, 0, 0);
    position: absolute;
    width: 100%;

    img {
      width: 100%;
    }
  }

  div.active {
    opacity: 1;
    z-index: 1001;
    display: block;
    transition: opacity 1000ms ease-in;
  }
`

const SliderPager = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  

  & span {
    padding: 10px;
    cursor: pointer;
    display: inline-block;
  }

  & span.active {
    border-bottom: 3px solid ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
  }
`

export default class Slider extends React.Component {
  static defaultProps = {
    speed: 5000,
    transitionSpeed: 1500,
  }

  constructor(props) {
    super(props)
    this.state = { currentSlide: 0 }
  }

  async onChangeSlide(index) {
    if (index < 0) {
      index = this.props.children.length - 1
    }

    if (index >= this.props.children.length) {
      index = 0
    }

    await this.setState({ currentSlide: index })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.slideTimer()
    }, this.props.transitionSpeed)
  }

  slideTimer() {
    this.timer = setTimeout(() => {
      this.onChangeSlide(this.state.currentSlide + 1)
    }, this.props.speed)
  }

  componentDidMount() {
    if (this.props.speed) {
      this.slideTimer()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    let slides = this.props.children

    let pager = (
      <SliderPager>
        <span
          onClick={this.onChangeSlide.bind(this, this.state.currentSlide - 1)}
        >
          &lt;
        </span>
        {slides.map((slide, i) => (
          <span
            onClick={this.onChangeSlide.bind(this, i)}
            className={this.state.currentSlide === i && 'active'}
          >
            {i + 1}
          </span>
        ))}
        <span
          onClick={this.onChangeSlide.bind(this, this.state.currentSlide + 1)}
        >
          &gt;
        </span>
      </SliderPager>
    )

    return (
      <div {...this.props}>
        <SliderImageHolder>
          {slides.map((slide, idx) =>
            idx === this.state.currentSlide
              ? React.cloneElement(slide, { className: 'active' })
              : slide
          )}
        </SliderImageHolder>
        {pager}
      </div>
    )
  }
}
