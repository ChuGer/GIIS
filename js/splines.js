var l3_points = []; //����������, �������� ������ ��������� �����
var step;
var showInfoTable = true; //����������, ����������� ��������� �� ����� ���������� ����������

/*	������� ��������� ������ ������
	@param isRandom - ��������, ����������� - ��������� ����� ������������� �� ��������� ��� ���������� ������ �����
*/
function drawHermite(isRandom) {
	var showInfoTable=$('input[name="showInfo"]').prop('checked');
    if (isRandom) getRandomPoints(); // ��������� �� ������ ������� ����� �� ���������� ������������
    getPoints(); //��������� ��������� ������� ����� � ������
	
	//����������, �������� ������� ������ M
    var M = [
        [2, -2, 1, 1],
        [-3, 3, -2, -1],
        [0, 0, 1, 0],
        [1, 0, 0, 0]
    ];
	
	//����������, �������� ������� G (������ ������� � ����������� �����)
	var G = l3_points;
	
	step = canvasStep/(halfWidth*4); // ��������� ���� ��������� t
	if (showInfoTable) {
		steps.html(""); //������� ������� ���������� ����������
		appendRow("th", 3, 't', 'x', 'y'); //����� ���������� ����������
	}
	//���� ������ ����� ������
    for (var t = 0; t <= 1; t += step) {
		//������� T
        var T = [
            [t * t * t, t * t, t, 1]
        ];
		//���������� ��������� ����� ����� ������������ ������ T, M � G
        var result = multiplyMatrix(multiplyMatrix(T, M), G);
		var x = Math.round(result[0][0]);
		var y = Math.round(result[0][1]);
		//���������� ����� �� �����
        if (!pointExists(x,y)) {
			addToMap(x, y);
			if (showInfoTable) appendRow("td", 3, Math.round(t*100)/100, x, y); //����� ���������� ����������
		}
    }
	//��������� ���� ����� ������
    drawAllPoints();
}

/*	������� ��������� ������ �����
	@param isRandom - ��������, ����������� - ��������� ����� ������������� �� ��������� ��� ���������� ������ �����
*/
function drawBezier(isRandom) {
	var showInfoTable=$('input[name="showInfo"]').prop('checked');
    if (isRandom) getRandomPoints(); // ��������� �� ������ ������� ����� �� ���������� ������������
    getPoints(); //��������� ��������� ������� ����� � ������
	
	//����������, �������� ������� ����� M
	var M = [
        [-1, 3, -3, 1],
        [3, -6, 3, 0],
        [-3, 3, 0, 0],
        [1, 0, 0, 0]
    ];

	step = canvasStep/(halfWidth*4); // ��������� ���� ��������� t
	if (showInfoTable) {
		steps.html(""); //������� ������� ���������� ����������
		appendRow("th", 3, 't', 'x', 'y'); //����� ���������� ����������
	}
	//����������, �������� ������� G (������ ������� � ����������� �����)
	var G = l3_points;
	//������ ������� � = M*G
    var C = multiplyMatrix(M, G);
	//���� ������ ����� ������
    for (var t = 0; t <= 1; t += step) {
		//������� �
        var T = [
            [t * t * t, t * t, t, 1]
        ];
		//���������� ���������� ����� ������������ ������ � � �
        var result = multiplyMatrix(T, C);
		var x = Math.round(result[0][0]);
		var y = Math.round(result[0][1]);
		//���������� ����� �� �����
		if (!pointExists(x,y)) {
			addToMap(x, y);
			if (showInfoTable) appendRow("td", 3, Math.round(t*100)/100, x, y); //����� ���������� ����������
		}
    }
	//��������� ���� ����� ������
    drawAllPoints();
}

/*	������� ��������� ������ ������
	@param isRandom - ��������, ����������� - ��������� ����� ������������� �� ��������� ��� ���������� ������ �����
*/
function drawBSpline(isRandom) {
	var showInfoTable=$('input[name="showInfo"]').prop('checked');
    step = canvasStep/(halfWidth*4); // ��������� ���� ��������� t
	//������� �
    var M = [
        [-1, 3, -3, 1],
        [3, -6, 3, 0],
        [-3, 0, 3, 0],
        [1, 4, 1, 0]
    ];

    if (isRandom) getRandomPoints(); // ��������� �� ������ ������� ����� �� ���������� ������������
    getPoints(); //��������� ��������� ������� ����� � ������
	
    var count = controlMap.length; //����������, �������� ���������� ����������� ����� ������������� �� ������
	if (showInfoTable) {
		steps.html(""); //������� ������� ���������� ����������
		appendRow("th", 3, 't', 'x', 'y'); //����� ���������� ����������
	}
	//���� ���������� ������
    for (var i = 0; i < count - 3; i++) {
		//��������� ��������� ������� �����
        var px1 = controlMap[i].x,
                py1 = controlMap[i].y,
                px2 = controlMap[i + 1].x,
                py2 = controlMap[i + 1].y,
                px3 = controlMap[i + 2].x,
                py3 = controlMap[i + 2].y,
                px4 = controlMap[i + 3].x,
                py4 = controlMap[i + 3].y;
				
		//����������, �������� ������� G (������ ����������� �����)
        var G = [
            [px1, py1],
            [px2, py2],
            [px3, py3],
            [px4, py4]
        ];
		//����������, �������� ������� � ��� ������������ ������ � � G
        var C = multiplyMatrix(M, G);

        for (var t = 0; t <= 1; t += step) {
			//������� �
            var T = [
                [t * t * t, t * t, t, 1]
            ];
			//������ ���������� ����� ������������ ������ �, � � G
            var result = multiplyMatrix(T, C);
			var x = Math.round(result[0][0] / 6.);
			var y = Math.round(result[0][1] / 6.);
			//���������� ����� �� �����
			if (!pointExists(x,y)) {
				addToMap(x, y);
				if (showInfoTable) appendRow("td", 3, Math.round(t*100)/100, x, y); //����� ���������� ����������
			}
        }
    }
	//��������� ���� �����
    drawAllPoints();
}


