var borders = []; //������� ������
var seedPixel; //����������� �������

//������� ��������� ������ �� ������ �� ������
function paintArea() {
	borders = [];
	for (var i = 0; i < controlMap.length-1 ; i++) {
		var array = [];
		array[0] = controlMap[i];
		array[1] = controlMap[i+1];
        drawBrez({x1:controlMap[i].x, y1:controlMap[i].y, x2:controlMap[i+1].x, y2:controlMap[i+1].y});
    }	
	drawBrez({x1:controlMap[controlMap.length-1].x, y1:controlMap[controlMap.length-1].y, x2:controlMap[0].x, y2:controlMap[0].y});
	drawAllPoints();
	map = borders;
}


//�������, ����������� �������� ���������� � ���������
function simpleFilling() {
	var stack = new Array();
	stack.push(seedPixel);
	while (stack.length != 0) {
		var point = stack.pop();
		var x = point.x;
		var y = point.y;
		if (pointExists(x, y) == null) {
			drawPoint(x, y);
		} 
		x++;
		if (pointExists(x, y) == null) stack.push({"x": x, "y":y, "z":1});
		x--; y++;
		if (pointExists(x, y) == null) stack.push({"x": x, "y":y, "z":1})
		y--; x--;
		if (pointExists(x, y) == null) stack.push({"x": x, "y":y, "z":1})
		y--; x++;
		if (pointExists(x, y) == null) stack.push({"x": x, "y":y, "z":1})
	}
}

// �������, ����������� ���������� �������� ���������� � ���������
function stringFilling() {
	var stack = new Array();
	stack.push(seedPixel);
	drawPoint(seedPixel.x, seedPixel.y);
	var minX = getXLeft() - 1;
	var maxX = getXRight() + 1;
	while (stack.length != 0) {
		var point = stack.pop();
		var x = point.x;
		var y = point.y;
		if (pointExists(x, y) == null) {
			drawPoint(x, y);
		} else {
			continue;
		}
		var i = x;
		while (i > minX) {
			i--;
			if (pointExists(i, y) != null) {
				stack.push({"x": i+1, "y":y-1, "z":1})
				stack.push({"x": i+1, "y":y+1, "z":1})
				break;
			}
			if (pointExists(i, y+1) == null) stack.push({"x": i, "y":y+1, "z":1})
			if (pointExists(i, y-1) == null) stack.push({"x": i, "y":y-1, "z":1})
			drawPoint(i, y);
		}
		i = x;
		while (i < maxX) {
			i++;
			if (pointExists(i, y) != null) {
				
				stack.push({"x": i-1, "y":y-1, "z":1})	
				stack.push({"x": i-1, "y":y+1, "z":1})		
				break;
			}
			if (pointExists(i, y+1) == null) stack.push({"x": i, "y":y+1, "z":1})
			if (pointExists(i, y-1) == null) stack.push({"x": i, "y":y-1, "z":1})
			drawPoint(i, y);
		}
	}	
}

//�������, ����������� ����� ����� �� ������� ������ � ������������ ��������� ���������� �
function getXLeft() {
	var minX = 9999;
	for (var i = 0; i < borders.length; i++) {
		var x = borders[i].x;
		if (x < minX) {
			minX = x;
		}
	}
	return minX;
}

//�������, ����������� ����� ����� �� ������� ������ � ������������ ��������� ���������� �
function getXRight() {
	var maxX = -9999;
	for (var i = 0; i < borders.length; i++) {
		var x = borders[i].x;
		if (x > maxX) {
			maxX = x;
		}
	}
	return maxX;
}
