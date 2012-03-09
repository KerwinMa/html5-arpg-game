function Player() {

	this.id = 0;
	//��ҵĵ�ǰ����
	this.pos = {
		x: 5,
		y: 5
	};
	
	// ��ҵ�����
	this.direction = Direction.DOWN;
	// ״̬
	this.state = PlayerState.STOP;
	// �ٶ�
	this.speed = 200;	// ÿ������������ʱ��(ms)
	// �ƶ�·��
	this.movePath = new Array();
	
	this.imageIndex = 0;
}

/* 
 * ***************
 * ��Ա��������
 * ***************
 */

// ������ҵ��ƶ�·��
Player.prototype.calcMovePath = function(dx, dy) {
	// ���ԭ�ȵ�·��
	this.movePath = new Array();
	var x = this.pos.x;
	var y = this.pos.y;
	while(x < dx){
		this.movePath.push(Direction.RIGHT);
		x ++;
	}
	while(x > dx){
		this.movePath.push(Direction.LEFT);
		x --;
	}
	while(y < dy){
		this.movePath.push(Direction.DOWN);
		y ++;
	}
	while(y > dy){
		this.movePath.push(Direction.UP);
		y --;
	}
		
}
// ������ҵ���һ������
Player.prototype.nextAction = function() {
	switch(this.state){
		case PlayerState.MOVE:
			if(this.movePath.length == 0)
			{
				this.state = PlayerState.STOP;
				this.imageIndex = 0;
			}
			else
				this.direction = this.movePath.shift();
			break;
		case PlayerState.STOP:
			if(this.movePath.length != 0){
				this.state = PlayerState.MOVE;
				this.direction = this.movePath.shift();
				this.imageIndex = 0;
			}
			break;
		}
		// �����ƶ�·���޸�����
		this._nextPos();
		this._nextImageIndex();
}

/*
 * ˽�к���
 */
 
Player.prototype._nextImageIndex = function() {
	var indexMax = 0;
	this.imageIndex ++;
	switch(this.state) {
		case PlayerState.DIE: 
			indexMax = 4;
			break;
		default :
			indexMax = 6;
	}
	if(this.imageIndex == indexMax)
		this.imageIndex = 0;
}

Player.prototype._nextPos = function() {
	if(this.state == PlayerState.MOVE) {
		switch(this.direction){
			case Direction.DOWN :
				this.pos.y += 1;
				break;
			case Direction.UP :
				this.pos.y -= 1;
				break;
			case Direction.LEFT :
				this.pos.x -= 1;
				break;
			case Direction.RIGHT :
				this.pos.x += 1;
				break;
		}
	}
}
