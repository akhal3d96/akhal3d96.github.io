class Benefit {
	constructor(benefitName,benefitText,benefitNumber){
		this.benefitName = benefitName;
		this.benefitText = benefitText;
		this.benefitNumber = benefitNumber;
	}

    get benefitName() {
        return this._benefitName;
    }
    set benefitName (value){
      this._benefitName = value;
    }
    get benefitNumber() {
        return this._benefitNumber;
    }
    set benefitNumber(value){
      this._benefitNumber = value
    }
    get benefitText() {
        return this._benefitText;
    }
    set benefitText(value){
      this._benefitText = value
    }

    showBenefit(){
	    bootbox.alert({ 
  	size: "large",
 	 title: "<b>"+this.benefitNumber + "</b> appears to be your lucky number!",
  	message: "<b>"+this.benefitNumber+"</b> means: "+this.benefitText, 
 	 callback: function(){ /* your callback code */ }
})
    }

}
var BenefitsArray = [];

BenefitsArray.push(new Benefit("ASME Access Engineering","An Online tool powered by McGraw-Hill Education contains more than 600 categorized volumes and references, in addition to Curriculum Maps in thousands of engineering fields.",1));
BenefitsArray.push(new Benefit("E-Mentoring Program","One-to-one advice that provide you with career-guiding insights, help you solve engineering problems or expand your networking opportunities with professionals.",2));
BenefitsArray.push(new Benefit("ASME SmartBrief","A frequent e-newsletter especially for mechanical engineers that provide them with a quick digest of the latest engineering news and trends from around the world and across their profession.",3));
BenefitsArray.push(new Benefit("Mechanical Engineering Magazine","A monthly publication that keeps you updated with the latest technology worldwide. It delivers an interdisciplinary view into engineering trends and breakthroughs.",4));
BenefitsArray.push(new Benefit("More!","In addition to more benefits like attending regional and international conferences, Internships and Scholarships.",5));
	
var canvas = document.querySelector('canvas');

var height = canvas.height,
	width = canvas.width;
var rotationAngle = 0;


var wheel = new Image();
var arrow = new Image(); // Create new img element
wheel.addEventListener("load", function() {
	arrow.addEventListener('load',function(){
		MainDrawFunction();
	},false);
}, false);
wheel.src = 'img/wheel.png'; // Set source path
arrow.src = 'img/arrow.png';

var button = document.querySelector('button');

button.addEventListener('click',function(){
	var angle = Math.round(Math.asin(Math.sin(rotationAngle))*(180/Math.PI));
	switch (angle){
		case 0:
			BenefitsArray[0].showBenefit();
			break;
		case 72:
			BenefitsArray[1].showBenefit();
			break;
		case 36:
			BenefitsArray[2].showBenefit();
			break;
		case -36:
			BenefitsArray[3].showBenefit();
			break;
		case -72:
			BenefitsArray[4].showBenefit();
			break;
	}

},false);

function MainDrawFunction()
{
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, width, height);



		ctx.drawImage(wheel,0,0);
		ctx.translate(width/2,height/2);
		ctx.rotate(rotationAngle);

		ctx.drawImage(arrow,-30,-20);
		/*ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(100, 0);
		ctx.stroke();
		*ctx.closePath();*/

		rotationAngle += (72*(Math.PI/180));

		//window.requestAnimationFrame(MainDrawFunction);
	} else {
		alert("Canvas isn't supported");
	}
}
function displayTheBenefit()
{

}
window.setInterval(MainDrawFunction,500);
//window.requestAnimationFrame(MainDrawFunction);
//MainDrawFunction();
