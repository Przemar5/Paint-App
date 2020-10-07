// HTML elements
const CANVAS = document.querySelector('#canvas')
const BOTTOM_PANEL = document.querySelector('.bottom-panel')
const CTX = CANVAS.getContext('2d')

const btnDraw = document.getElementById('btnDraw')

// Utility functions
const getMousePos = event => ({
	x: event.clientX - CANVAS.offsetLeft,
	y: event.clientY - CANVAS.offsetTop
})
const printMousePos = target => position => $(target).text(position.x + ', ' + position.y)
const printMousePosition = printMousePos(BOTTOM_PANEL)



let Pencil = function() {
	this.width = 2
	this.color = '#000'
	this.pressed = false

	this.draw = start => end => {
		CTX.lineWidth = this.width
		CTX.lineCap = 'round'
		CTX.fillStyle = this.color
		CTX.beginPath()
		CTX.moveTo(start.x, start.y)
		CTX.lineTo(end.x, end.y)
		CTX.stroke()
	}

	return this
}


let Line = function() {
	this.width = 2
	this.color = '#000'
	this.pressed = false
	this.eventConstraints = ['mousedown', 'mousemove']

	this.draw = start => end => {
		CTX.lineWidth = this.width
		CTX.lineCap = 'round'
		CTX.fillStyle = this.color
		CTX.beginPath()
		CTX.moveTo(start.x, start.y)
		CTX.lineTo(end.x, end.y)
		CTX.stroke()
	}

	return this
}


let events = {
	mousedown: false,
	mousemove: false,
	click: false
}

let previousPosition = null
let current = new Pencil()

CANVAS.addEventListener('mousedown', function(e) {
	events.mousedown = true
	doAction(e)
})

CANVAS.addEventListener('mouseup', function(e) {
	events.mousedown = false
})

CANVAS.addEventListener('mousemove', function(e) {
	if (isMouseDown())
		doAction(e)

	previousPosition = getMousePos(e)
})

/* 
PENCIL
ENTER:
	mousedown (true)
ESCAPE:
	mousedown (false) 
*/

/*
LINE
ENTER:
	mousedown (event)
ESCAPE:
	mouseup (event)
*/

/*
BRUSH
ENTER:
	mousedown (true)
ESCAPE:
	mousedown (false)
*/

const isMouseDown = () => events.mousedown

const doAction = (e) => {
	let mousePos = getMousePos(e)
	
	if (previousPosition != null) {
		// Functional strategy pattern equivalent
		current.draw(previousPosition)(mousePos)
	}
}

init = () => {
	if (events.mousedown)
		doAction(previousPosition)

	window.requestAnimationFrame(init)
}

// document.addEventListener('mousemove', handler(e))

// function handler(e) {
//     e = e || window.event;

//     var pageX = e.pageX;
//     var pageY = e.pageY;

//     // IE 8
//     if (pageX === undefined) {
//         pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//         pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//     }

//     console.log(pageX, pageY);
// }


// // Drawing modes
// const pencil = ctx => (width, color) => start => end => {
// 	ctx.lineWidth = width
// 	ctx.lineCap = 'round'
// 	ctx.fillStyle = color
// 	ctx.beginPath()
// 	ctx.moveTo(start.x, start.y)
// 	ctx.lineTo(end.x, end.y)
// 	ctx.stroke()
// }

// const line = ctx => (width, color) => start => end => {
// 	ctx.lineWidth = width
// 	ctx.lineCap = 'round'
// 	ctx.fillStyle = color
// 	ctx.beginPath()
// 	ctx.moveTo(start.x, start.y)
// 	ctx.lineTo(end.x, end.y)
// 	ctx.stroke()
// }

// // Function factories
// const basicFactory = func => func(CTX)(toolParams.width, toolParams.color) 
// const pencilFactory = event => 
// 	basicFactory(pencil)(previousPosition)(getMousePos(event))

// // Factory builders
// const pencilBuilder = event => {
// 	if (toolParams.pressed) {
// 		if (previousPosition != null) {
// 			pencilFactory(event)
// 		}
// 		previousPosition = getMousePos(event)
// 	}
// 	else {
// 		previousPosition = null
// 	}
// }

// const lineBuilder = event => {
// 	if (toolParams.pressed) {
// 		if (toolParams.released.x != null && toolParams.released.y != null) {
// 			line(CTX)(toolParams.width, toolParams.color)(toolParams.clicked)(getMousePos(event))
// 		}
// 	}
// }

// // Global variables
// var toolParams = {
// 	width: 2,
// 	color: '#000',
// 	pressed: false
// }
// let previousPosition = null
// let currentMode = pencilBuilder


// // Mementos
// let mementos = []

// const save = array => ctx => (width, height) => {
// 	let imgData = ctx.getImageData(0, 0, width, height)
// 	array.push(imgData)
// 	console.log(array)
// }
// const restore = array => ctx => () => {
// 	if (array.length >= 0) {
// 		ctx.putImageData(array.pop(), 0, 0)
// 	}
// }
// const saveMemento = save(mementos)(CTX)
// const restoreMomento = restore(mementos)(CTX)

// $(CANVAS).ready(() => {
// 	saveMemento(CANVAS.width, CANVAS.height)
// })
// // Event handlers
// $(CANVAS).mousedown(e => {
// 	toolParams.pressed = getMousePos(e)
// })
// $(CANVAS).mouseup(e => {
// 	toolParams.pressed = false
// 	saveMemento(CANVAS.width, CANVAS.height)
// })
// $(CANVAS).mousemove(e => {
// 	// if (toolParams.pressed != null) {
// 		currentMode(e);
// 	// }
// 	printMousePosition(getMousePos(e))
// })
// $(document).keydown(e => {
// 	if (e.ctrlKey && e.key === 'z') {
// 		restoreMomento()
// 	}
// })

// line(CTX)(toolParams.width, toolParams.color)({x:0, y: 0})({x:100, y:100})

// $(CANVAS).mousedown(e1 => {
// 	$(e1.target).mousemove(e2 => drawCTX(10)(getMousePos(e2)))
// }).mouseup(() => $(this).unbind('mousemove'))
// .mouseout(() => $(this).unbind('mousemove'))
// $(CANVAS).drag(e => drawCTX(10)(getMousePos(e)))


// drawCTX(20)({x: 200, y:200})

// CTX.beginPath()
// CTX.moveTo(300, 300)
// CTX.lineTo(300, 300)
// CTX.stroke()


