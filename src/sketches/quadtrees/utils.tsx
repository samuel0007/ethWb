class MyArray {
    public _array: number[];
    constructor(public width: number, public height: number) {
        this._array = new Array<number>(width*height);
    }
    public get(x:number, y:number) {
        return this._array[y*this.width + x];
    }
    public set(x:number, y:number, value:number) {
        this._array[y*this.width + x] = value;
    }
    public Width() {
        return this.width;
    }
    public Height() {
        return this.height;
    }
    public push(index:number, value:number) {
        this._array[index] = value;
    }
    public squared() {
        let squared = new MyArray(this.width, this.height);
        this._array.forEach((value, index) => {
            squared.push(index, value*value);
        });
        return squared;
    }
    public normalize() {
        let normalized = new MyArray(this.width, this.height);
        this._array.forEach((value, index) => {
            normalized.push(index, value/255);
        });
        return normalized;
    }
}


function Sum(width: number, height:number, f:MyArray) : MyArray {
    let sum = new MyArray(width+1,height+1);
    for (let y=0; y<=height; ++y){
        let sx: number = 0; // sum along x-axis
        for (let x=0; x <= width; ++x){
            if(x === 0 || y === 0){
                sum.set(x,y,0);
            }
            else{
                sx += f.get(x-1,y-1);
                sum.set(x,y, sx+sum.get(x,y-1));
            }
        }
    }
    return sum;
}

function GetSum( sum:MyArray, x:number, y:number, w:number, h:number): number{
    return sum.get(x+w,y+h)-sum.get(x+w,y)-sum.get(x,y+h)+sum.get(x,y);
}

function Fill(d:number, result:number[], red:number, green:number, blue:number, alpha:number, x:number, y:number, w:number, h:number):void{
    for (let ox = 0; ox<w; ox++){
        for (let oy = 0; oy<h; oy++){
            let index = 4 * 256 *((y+oy))  + 4*(x+ox) ;
            result[index] = red*255;
            result[index+1] = green*255;
            result[index+2] = blue*255;
            result[index+3] = alpha*255;          
        }
    }
}

function Minimize(d:number, gamma:number, result:any, sumRed:MyArray, ssqRed:MyArray,sumGreen:MyArray, ssqGreen:MyArray,sumBlue:MyArray, ssqBlue:MyArray,sumAlpha:MyArray, ssqAlpha:MyArray, x:number, y:number, w:number, h:number) :number{
    if(w*h === 0) return 0;
    let totalRed:number = GetSum(sumRed, x, y, w, h);
    let totalGreen:number = GetSum(sumGreen, x, y, w, h);
    let totalBlue:number = GetSum(sumBlue, x, y, w, h);
    let totalAlpha:number = GetSum(sumAlpha, x, y, w, h);
    
    let totalssqRed:number = GetSum(ssqRed, x, y, w, h);
    let totalssqGreen:number = GetSum(ssqGreen, x, y, w, h);
    let totalssqBlue:number = GetSum(ssqBlue, x, y, w, h);
    let totalssqAlpha:number = GetSum(ssqAlpha, x, y, w, h);

    let muRed:number = totalRed/(w*h);
    let muGreen:number = totalGreen/(w*h);
    let muBlue:number = totalBlue/(w*h);
    let muAlpha:number = totalAlpha/(w*h);

    let mCurr:number = 4*gamma + totalssqRed - 2*(muRed)*(totalRed) + w*h*(muRed)*(muRed)
                             + totalssqGreen - 2*(muGreen)*(totalGreen) + w*h*(muGreen)*(muGreen)
                             + totalssqBlue - 2*(muBlue)*(totalBlue) + w*h*(muBlue)*(muBlue)
                             + totalssqAlpha - 2*(muAlpha)*(totalAlpha) + w*h*(muAlpha)*(muAlpha)
    let mDeeper:number;
    if(w*h > 1) {
      let costLL = Minimize(d, gamma, result, sumRed, ssqRed, sumGreen, ssqGreen,sumBlue, ssqBlue, sumAlpha, ssqAlpha, x, y, w/2, h/2);
      let costLR = Minimize(d, gamma, result, sumRed, ssqRed, sumGreen, ssqGreen,sumBlue, ssqBlue, sumAlpha, ssqAlpha, x + w/2, y, w/2, h/2);
      let costUL = Minimize(d, gamma, result, sumRed, ssqRed, sumGreen, ssqGreen,sumBlue, ssqBlue, sumAlpha, ssqAlpha, x, y + h/2, w/2, h/2);
      let costUR = Minimize(d, gamma, result, sumRed, ssqRed, sumGreen, ssqGreen,sumBlue, ssqBlue, sumAlpha, ssqAlpha, x + w/2, y + h/2, w/2, h/2);
      mDeeper = costLL + costLR + costUL + costUR;
    } else {
      Fill(d, result, muRed, muGreen, muBlue, muAlpha, x, y, w, h);
      return mCurr;
    }
    if(mDeeper < mCurr) {
      mCurr = mDeeper;
    } else {
      Fill(d, result, muRed, muGreen, muBlue, muAlpha, x, y, w, h);
    }
    return mCurr;
  }

export {MyArray, Sum, GetSum, Fill, Minimize};