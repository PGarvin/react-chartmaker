export const bubbleCSS = `.bubbleChart {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
}

.bubble__holder {
	float: left;
	position:relative;
	width:46%;
	margin: 2%;
	text-align:center;
	-moz-box-shadow:    0px 0px 2px 2px rgba(0,0,0,.1);
	-webkit-box-shadow: 0px 0px 2px 2px rgba(0,0,0,.1);
	box-shadow:         0px 0px 2px 2px rgba(0,0,0,.1);
	padding: 10px;
	font-family:'BentonSans', Helvetica, Arial, sans-serif;
}

.bubble__holder .Name {
     font-family:'BentonSans', Helvetica, Arial, sans-serif;
     float:left;
     text-align:center;
     font-size:0.9rem;
     margin-bottom: 1rem;
     display: contents;
}

.bubble__holder .square {
  position: relative;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}


.bubble__holder .Value {
	width:100%;
	text-align:center;
}


@media screen and (min-width: 480px) {

.bubble__holder {
	width:30%;
	margin: 1.5%;
}

}

@media screen and (min-width: 1160px) {

.bubble__holder {
	width:23%;
	margin: 1%;
}

}
`