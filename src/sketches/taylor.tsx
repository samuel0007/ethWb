import p5 from "p5";
import React, { createRef } from "react";


class P5TaylorSketch extends React.Component {
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

    interface ITaylorConfig extends IConfig {
      readonly r: number;
      speed: number;
    }

    interface ITaylorState {
      j: number;
      graphEl: number[][];
    }

    let configTaylor: ITaylorConfig;
    let stateTaylor: ITaylorState;
    let slider: any;
    let speedSlider: any;

    p5.setup = () => {
      speedSlider = p5.createSlider(0, 0.00005, 0.000005, 0.000005);
      speedSlider.position(250, 30);
      speedSlider.style('width', '200px');

      configTaylor = {
        r: 50,
        height: 500,
        width: p5.windowWidth - 50,
        speed: speedSlider.value(),
      };
      stateTaylor = {
        j: 0,
        graphEl: [],
      };
      p5.createCanvas(configTaylor.width, configTaylor.height);
      slider = p5.createSlider(0, 10, 2, 0.01);
      slider.position(10, 30);
      slider.style('width', '200px');
      p5.textSize(15);
    };

    p5.draw = () => {
      let width = configTaylor.width;
      let height = configTaylor.height;
      let r = configTaylor.r;
      let k = slider.value();
      configTaylor.speed = speedSlider.value();

      p5.background(229, 231, 235);
      p5.stroke("black");
      p5.strokeWeight(1);
      p5.fill('black');
      p5.text('Frequency (x1, x2, x3): '+ k.toString(), 10,20);
      p5.text('Speed', 250, 20)
      //Center
      p5.translate(width / 2, height / 2);
      p5.scale(1, -1);

      //p5.line(0, 1* height / 4, 0, -height / 2);
      //p5.line(width / 2, 0, -width / 2, 0);

      p5.strokeWeight(2);
      p5.noFill();
      p5.beginShape();
      let i = 0;
      let sumX = 0;
      let sumY = 0;
      let ctr = 0;
      for (let t = 0; t < 3 * p5.TWO_PI; t += 0.001) {
        i += stateTaylor.j;
        let x =
          (2 * p5.cos(k * t) + p5.cos(2 * k * t) + p5.cos(3 * k * t)) *
          r *
          p5.cos(i);
        let y =
          (2 * p5.cos(k * t) + p5.cos(2 * k * t) + p5.cos(3 * k * t)) *
          r *
          p5.sin(i);
        p5.vertex(x, y);
        sumX += x;
        sumY += y;
        ++ctr;
      }
      p5.endShape();

      // Center of Mass
      let massX = sumX / ctr;
      let massY = sumY / ctr;
      stateTaylor.graphEl.push([massX, massY]);
      p5.strokeWeight(3);
      p5.stroke("red");
      p5.point(massX, massY);

      // Plot in time
      p5.strokeWeight(2);
      p5.noFill();
      p5.beginShape();
      for (let i = 0; i < stateTaylor.graphEl.length; ++i) {
        if(i / 5 - width / 2 + 10 > width) break;
        p5.vertex(i / 2 - width / 2 + 10, stateTaylor.graphEl[i][0] + height * 0.3);
      }
      p5.endShape();
      p5.stroke("blue");
      p5.beginShape();
      for (let i = 0; i < stateTaylor.graphEl.length; ++i) {
        if(i / 5 - width / 2 + 10 > width) break;
        p5.vertex(i / 2 - width / 2 + 10, stateTaylor.graphEl[i][1] + height * 0.3);
      }
      p5.endShape();

      stateTaylor.j += configTaylor.speed;
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
};

export default P5TaylorSketch;
