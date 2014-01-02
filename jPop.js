(function($,window,document,undefined){
	
	var _body = $(document.body);
    var _screen;
	var _popList = {};
	var _zIndex = 2;

    //返回最高层级Zindex值
    function zIndexMax(){
    	var a=b=0;
    	var c;
    	for(var i in _popList){
    		if(_popList[i].zIn){
    			if( _popList[i].ja.zIndexs >= b){
    				a = _popList[i].ja.zIndexs;
    				c = i;
    			}else{
    				a = b;
    			}
    		}
    	}
    	if(_popList[c]) _popList[c].show();
    }

	var Pop = function(content,name){
		this.name = name;
		this.ja = content;
		if(!this.ja.zIndexs){
			this.ja.zIndexs = _zIndex;
			_zIndex = _zIndex + 2;
		}
		this.init();
	};

	Pop.prototype = {
		'init':function(){
			if (_screen === undefined) {
                _screen = $('<div class="jdialog-screen"></div>').appendTo(_body).mousedown(function(e) {
                    e.stopPropagation();
                });
                //fuckie6
                if(_screen.css('position') === 'absolute'){
                    _screen.height($(document).height());
                }
            }
			
			return this;
		},
		'reset': function(){
			var _ja = this.ja;
			_ja.oDom.css({
				'margin-left':function(){return (-1 * _ja.oDom.width() / 2 ) + 'px' ;},
				'top':function(){return document.documentElement.scrollTop + (document.documentElement.clientHeight - _ja.oDom.height()) / 2 + 'px' }
			});
			return this;
		},
		'show': function(){
			var _ja = this.ja;
            _screen.show().css('z-index',this.ja.zIndexs + 1);
			this.ja.oDom.show().css('z-index',this.ja.zIndexs + 2);
			this.reset();
            this.zIn = true;
			return this;
		},
		'hide': function(){
            _screen.hide();
            this.ja.oDom.hide();
            this.zIn = false;
            zIndexMax();
            //console.log(this);
            //console.log(_popList);
            return this;
		}
	}

	$.jPop = {
		'create': function(content,name) {
            name = name || 'default';
            var jpop = _popList[name];
            if (jpop === undefined) {
                jpop = _popList[name] = new Pop(content,name);
            }
            return jpop;
        },
		'get': function(name){
			name = name || 'default';
            return _popList[name];
		},
		'fix': function() {
            for (var i in _popList) {
                _popList[i].reset();
            }
        }
	}

	$.fn.jpop = function(name) {
        name = name || 'default';
        return $.jPop(this, name);
    };

})(jQuery,window,document);
