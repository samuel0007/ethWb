// Second sketch
import p5 from "p5";
import React, { createRef } from "react";


class P5RainSketch extends React.Component {
  myRef: any;
  myP5: any;

  constructor(props:any) {
    super(props);
    this.myRef = createRef();
  }
  Sketch = (p5:any) => {
    interface IConfig {
        readonly height: number;
        readonly width: number;
    }
    let configRain: IConfig;
    let particles: p5.Vector[];
    let slider: any;

    p5.setup = () => {
      configRain = {
        width: p5.windowWidth - 50,
        height: p5.windowHeight,
      };
      console.log(this.myRef);
      p5.createCanvas(configRain.width, configRain.height);
      slider = p5.createSlider(0, 10, 2);
      slider.position(10, 60);
      slider.style('width', '150px');
      particles = [];
      p5.textSize(32);
    };

    p5.draw = () => {
     // console.log( props.test);
      p5.background(229, 231, 235);
      p5.stroke('black');
      p5.text(slider.value(), 10, 32)
      for(let i = 0; i < slider.value(); ++i) {
        let v = p5.createVector(p5.random(configRain.width), 80, p5.random(3));
        particles.push(v);
      }
      
      
      for (let i = 0; i < particles.length; ++i) {
        p5.stroke(128, 0, 128, 60 * particles[i].z);
        p5.line(
          particles[i].x,
          particles[i].y,
          particles[i].x,
          particles[i].y + 10
        );
        particles[i].y += particles[i].z;
      }
      for (let i = 0; i < particles.length; ++i) {
        if (particles[i].y > configRain.height) {
          [particles[i], particles[particles.length - 1]] = [
            particles[particles.length - 1],
            particles[i],
          ];
          particles.pop();
        }
      }
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      configRain = {
        width: p5.windowWidth,
        height: p5.windowHeight,
      };
    };
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current)
  }
  public render() {
    return(
      <div ref={this.myRef} className="relative">
      </div>
    )
  }
}


export default P5RainSketch;

