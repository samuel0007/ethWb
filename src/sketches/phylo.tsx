// Second sketch
import p5 from "p5";
import React, { createRef } from "react";


class P5PhyloSketch extends React.Component {
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

    let n = 0;
    let c = 7;
    let angle: number;
    let radius = 7;
    let slider: any;
    let offset = 0;
    let configRain: IConfig;

    p5.setup = () => {
      configRain = {
        width: 500,
        height: 500,
      };
      p5.createCanvas(configRain.width, configRain.height);
          
      p5.angleMode(p5.DEGREES);
      p5.colorMode(p5.HSB);
      p5.background(0);
      slider = p5.createSlider(132.5, 142.5, 137.5, 0.1);
      slider.position(10,10);
      angle = slider.value();
      let button = p5.createButton('Change angle');
      button.position(150, 10);
      button.mousePressed(buttonRefresh);
      button.style('background-color', 'white');
      button.style('padding-left', '10px');
      button.style('padding-right', '10px');
      button.style('padding-top', '5px');
      button.style('padding-bottom', '5px');
      button.style('border-radius', '3px');
      p5.noStroke();
    };

    p5.draw = () => {
        p5.fill("black");
        p5.rect(0,0, 108, 50);
        p5.fill("white");
        p5.text("slider angle: " + slider.value().toString(), 10,50);
        p5.text("current angle: " + (angle+offset).toString(), 10, 65);
        let phi = n * (angle+offset);
        let r = c * p5.sqrt(n);
        p5.fill(n % 256, 255, 255);
        p5.ellipse(r*p5.cos(phi) + p5.width/2, r*p5.sin(phi) + p5.height/2, radius, radius);
        ++n;
        radius -= 0.005;
        c -= 0.001;
        if(radius < 0.1) refresh();
    };
    function refresh():void {
        n = 0;
        c = 7;
        radius = 7;
        offset += 0.1;
        if(offset > 1) offset = 0;
        p5.clear();
        p5.background(0);
    }
    function buttonRefresh():void {
        offset = 0;
        n = 0;
        c = 7;
        radius = 7;
        angle = slider.value();
        p5.clear();
        p5.background(0);
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

export default P5PhyloSketch;

