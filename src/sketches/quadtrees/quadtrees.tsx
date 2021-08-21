// Second sketch
import p5 from "p5";
import React, { createRef } from "react";
import { Minimize, MyArray, Sum } from "./utils";
 

class P5QuadTrees extends React.Component {
    myRef: any;
    myP5: any;
  
    constructor(props:any) {
      super(props);
      this.myRef = createRef();
    }
    Sketch = (p5:any) => {
      let img:any;
      let imgInput:any;
      let density:any;
      let ctr:number;
      let done:boolean;
      let slider:any;
      let gamma:number;

      p5.setup = () => {
        p5.createCanvas(256, 256);
        imgInput = p5.createFileInput(handleFile);
        imgInput.position(300,0);
        p5.pixelDensity(1);
        density = p5.pixelDensity();
        ctr = 10;
        slider = p5.createSlider(0.01, 2, 0.01, 0.01);
        slider.position(300, 80);
        slider.style('width', '150px');
        gamma = slider.value();
        let button = p5.createButton('Change gamma');
        button.position(300, 40);
        button.mousePressed(buttonRefresh);
        button.style('background-color', 'white');
        button.style('padding-left', '10px');
        button.style('padding-right', '10px');
        button.style('padding-top', '5px');
        button.style('padding-bottom', '5px');
        button.style('border-radius', '3px');
      };
  
      p5.draw = () => {
        if (img && ctr > 0) {
            p5.image(img, 0, 0, 256, 256);
            --ctr;
        } else if (img && !done) {
            p5.loadPixels();
            done = true;
            let red = new MyArray(256*density, 256*density);
            let green = new MyArray(256*density, 256*density);
            let blue = new MyArray(256*density, 256*density);
            let alpha = new MyArray(256*density, 256*density);
    
            for (let i = 0; i < 4 * (256 * 256 * density * density); i += 4) {
                let j = i/4;
                red.push(j, p5.pixels[i]);
                green.push(j, p5.pixels[i+1]);
                blue.push(j, p5.pixels[i+2]);
                alpha.push(j, p5.pixels[i+3]);
            }

            // Normalize colors between 0 and 1
            red = red.normalize();
            green = green.normalize();
            blue = blue.normalize();
            alpha = alpha.normalize();

            // Prefix Sum for all channels
            let sumRed = Sum(256*density, 256*density, red);
            let sumBlue = Sum(256*density, 256*density, blue);
            let sumGreen = Sum(256*density, 256*density, green);
            let sumAlpha = Sum(256*density, 256*density, alpha);

            // Prefix Sum of the squared value of all channels;
            let ssqRed = Sum(256*density, 256*density, red.squared())
            let ssqBlue = Sum(256*density, 256*density, blue.squared())
            let ssqGreen = Sum(256*density, 256*density, green.squared())
            let ssqAlpha = Sum(256*density, 256*density, alpha.squared())
    
            let result = new Array(4 * (256 * 256 * density * density));
            console.log(Minimize(density, gamma, result, sumRed, ssqRed, sumGreen, ssqGreen,sumBlue, ssqBlue, sumAlpha, ssqAlpha, 0, 0, 256*density, 256*density));
            for (let i = 0; i < 4 * (256 * 256 * density * density); ++i) {
                p5.pixels[i] = result[i];
            }
            p5.updatePixels();
        }
      };

      function handleFile (file:any):any {
        if (file.type === 'image') {
          img = p5.createImg(file.data, '');
          img.hide();
        } else {
          img = null;
        }
      };
      function buttonRefresh():any {
          gamma = slider.value();
          done = false;
          ctr = 10;
      }
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
  
  export default P5QuadTrees;