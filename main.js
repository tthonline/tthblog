//TTH QUIZ SYSTEM. Copyright by tuituhoc.com
var tthanswer_array=new Array;
if (document.getElementById('tthkey')!=null)
var tthkey=document.getElementById('tthkey').innerHTML.trim().split(" ");
var tthchoice=0;
var tthtime=0;
var minutes=1;
var seconds=60;
var tthcounter=0;
var tthtthdone=0;
var tthcorrect=0;
	function tthtimestart(minute,second)
	{
	minutes=minute;seconds=second;
	tthcounter=setInterval(tthcountdown,1000);
	}
	function tthcountdown()
	{
			document.getElementById('tthcountdown').innerHTML=minutes+':'+seconds--;
			if (seconds<0&&minutes!=0)
			{minutes--;seconds=60;}
			if (minutes==0&&seconds<0)
			{
				clearInterval(tthcounter);
				alert('Đã hết giờ làm bài');
				tthuncheck_all(0,tthkey.length);
				tthcompleted();
			}
	}
if (document.getElementById('tthzone')!= null)//create zone
{	
var tthmod=document.getElementById('tthzone').innerHTML.split(" ");
var zone1=parseInt(tthmod[0]);
var zone2=parseInt(tthmod[1]);
}
function tthget_timer(id)//get timer
{
	tthtime=parseInt(document.getElementById(id).id);
	document.getElementById('tthbutton-start').innerHTML='Bắt đầu làm bài (thời gian '+tthtime+' phút)';
}

function tth_check(id)//check if click
{
	number=parseInt(id);
	if (zone1!=null&&zone2!=null)
	{
		if (number>tthkey.length-(zone1+zone2+1)&&number<tthkey.length&&tthchoice==0)
		{
			tthnoitice(1);
			return;
		}
	}
	char=id.replace(number,"");
	tthanswer_array[number]=char;	
	document.getElementById(id).style.background="black";
	switch(char)
	{
		case 'A':{
			document.getElementById(number+'B').removeAttribute('style');
			document.getElementById(number+'C').removeAttribute('style');
			document.getElementById(number+'D').removeAttribute('style');
		} break;
		case 'B':{
			document.getElementById(number+'A').removeAttribute('style');
			document.getElementById(number+'C').removeAttribute('style');
			document.getElementById(number+'D').removeAttribute('style');
		} break;
		case 'C': {
			document.getElementById(number+'B').removeAttribute('style');
			document.getElementById(number+'A').removeAttribute('style');
			document.getElementById(number+'D').removeAttribute('style');	
		} break;
		case 'D': {
			document.getElementById(number+'B').removeAttribute('style');
			document.getElementById(number+'C').removeAttribute('style');
			document.getElementById(number+'A').removeAttribute('style');
		} break;
	}
}
function tth_uncheck(id)
{
	if (id=='tthbasic')
	{
	document.getElementById('tthadvance_style').style.display="none";
	document.getElementById('tthbasic_style').removeAttribute('style');
	q_start=tthkey.length-zone2;
	q_end=tthkey.length;
	}
	if (id=='tthadvance')
	{
	document.getElementById('tthbasic_style').style.display="none";
	document.getElementById('tthadvance_style').removeAttribute('style');
	q_start=tthkey.length-(zone1+zone2);
	q_end=tthkey.length-zone2;
	}
	for (var i=q_start;i<q_end;i++)
	{
			document.getElementById(i+'B').removeAttribute('style');
			document.getElementById(i+'C').removeAttribute('style');
			document.getElementById(i+'A').removeAttribute('style');
			document.getElementById(i+'D').removeAttribute('style');
	}
	tthchoice=id;
}
function tthuncheck_all(q_start,q_end)
{
	if (zone1!=null&&zone2!=null)
	{
		document.getElementById('tthbasic_style').removeAttribute('style');
			document.getElementById('tthadvance_style').removeAttribute('style');
	}
	for (var i=q_start;i<q_end;i++)
	{
			if (document.getElementById(i+tthkey[i])!=null)
			document.getElementById(i+tthkey[i]).style.background="red";
			document.getElementById(i+'B').removeAttribute('onClick');
			document.getElementById(i+'C').removeAttribute('onClick');
			document.getElementById(i+'A').removeAttribute('onClick');
			document.getElementById(i+'D').removeAttribute('onClick');
	}
}
function tthnoitice(number) //alert a noitice
{
			switch(number)
			{
				case 1:document.getElementById('tthnoitice').innerHTML='<marquee>Bạn cần phải chọn một trong 2 phần nâng cao hoặc cơ bản</marquee>';break;
				case 2:document.getElementById('tthnoitice').innerHTML='<marquee>Đánh lụi hết rồi mới nộp bài, đừng bỏ cuộc</marquee>';break;
			}
			setTimeout(function(){document.getElementById('tthnoitice').innerHTML='Thông báo từ hệ thống';},15000);
}
function tthmark_point(mode)//mode 1: have zone; 0: no zone return tthcorrect
{	
	if (mode==1)
	{
	if (tthchoice=='tthbasic')
	{
		for (var i=0;i<tthkey.length-(zone1+zone2);i++)
			if (tthanswer_array[i]==tthkey[i])
			tthcorrect++;
		for (var i=tthkey.length-(zone1+zone2);i<tthkey.length-zone2;i++)
			if (tthanswer_array[i]==tthkey[i])
			tthcorrect++;
	}
	else if (tthchoice=='tthadvance')
	{
		for (var i=0;i<tthkey.length-(zone1+zone2);i++)
			if (tthanswer_array[i]==tthkey[i])
			tthcorrect++;	
		for (var i=tthkey.length-zone2;i<tthkey.length;i++)
			if (tthanswer_array[i]==tthkey[i])
			tthcorrect++;
	}
	}
	else if (mode==0)
	{
		for (var i=0;i<tthkey.length;i++)
		if (tthanswer_array[i]==tthkey[i])
		tthcorrect++;
	}
	return tthcorrect;
}
function tthcheck_done(mode)//mode 1:have zone ; 0: no zone return 1//done return 0//haven't done
{
	if (mode==1)
	{
	if (tthchoice=='tthbasic')
	{
		for (var i=0;i<tthkey.length-(zone1+zone2);i++)
			if (typeof tthanswer_array[i]==="undefined")
			return 0;
		for (var i=tthkey.length-(zone1+zone2);i<tthkey.length-zone2;i++)
			if (typeof tthanswer_array[i]==="undefined"||tthanswer_array.length==0)
			return 0;
			return 1;
	}
	else if (tthchoice=='tthadvance')
	{
		for (var i=0;i<tthkey.length-(zone1+zone2);i++)
				if (typeof tthanswer_array[i]==="undefined"||tthanswer_array.length==0)
				return 0;
		for (var i=tthkey.length-zone2;i<tthkey.length;i++)
			if (typeof tthanswer_array[i]==="undefined"||tthanswer_array.length==0)
			return 0;
			return 1;
	}
	}
	else if (mode==0)
	{
		for (var i=0;i<tthkey.length;i++)
		if (typeof tthanswer_array[i]==="undefined")
		return 0;
		return 1;	
	}
}
function tthcomment(point,num_true,total){
	if (point<3)
	document.getElementById('tthfeedback').innerHTML='Gì mà làm được có '+num_true+' trên '+total+' câu hà, bạn cần cố gắng nhìu nhìu hơn';
	else if (point<5)
	document.getElementById('tthfeedback').innerHTML='Bạn chỉ làm đúng '+num_true+' trên '+total+' câu thui, cố lấy thêm điểm nhé';
	else if (point<7)
	document.getElementById('tthfeedback').innerHTML='Bạn làm đúng '+num_true+' trên '+total+' câu, có cơ hội thi đỗ rồi :)';
	else if (point<9)
	document.getElementById('tthfeedback').innerHTML='Xin chúc mừng bạn đã làm đúng '+num_true+' trên '+total+' câu, có thể thi vào các trường top rùi đó :)';
	else
	document.getElementById('tthfeedback').innerHTML='Thật toẹt vời bạn làm đúng '+num_true+' trên '+total+' câu, thánh rùi :)';
}
function tthcompleted()
{
	
	var curr_url=location.href;
	var uri=curr_url.match('#(.*)');
	curr_url=curr_url.replace(uri[0],'');
if (zone1!=null&&zone2!=null)
	{
	total=tthkey.length-zone1;
	var tthmark=tthmark_point(1);
	point=tthmark/total*10;
	num=tthcorrect;
	total_num=total;
	document.getElementById('tthpoint').innerHTML=point.toPrecision(2);
	document.getElementById('tthsharefb').innerHTML='Điểm <a href="https://www.facebook.com/dialog/feed?app_id=514773821944626%20&display=popup&caption=Kết quả thi thử tại www.tuituhoc.com. Điểm số đạt được: '+point.toPrecision(2)+' điểm với thời gian '+tthtime+' phút. Cùng vào thi thử tại tuituhoc.com nhé&picture=https://lh3.googleusercontent.com/-xcwjauphIcI/UzA_Wi4ITLI/AAAAAAAAAro/XoH29Tc6QeY/s1600/postertrialpass.jpg&link='+curr_url+'&redirect_uri='+curr_url+'"><img src="http://i.imgur.com/ohPy5dP.png" alt="chia se ket qua thi len facebook"/></a>';
	tthcomment(point,num,total_num);
	$("#tthpanelresult" ).toggle("slide",{direction:"up"},500);
	tthcorrect=0;
	document.getElementById('tthbasic').removeAttribute('onClick');
	document.getElementById('tthadvance').removeAttribute('onClick');
	clearInterval(tthcounter);
	}
	else
	{
	total=tthkey.length;
	var tthmark=tthmark_point(0);
	point=tthmark/total*10;
	num=tthcorrect;
	total_num=total;
	document.getElementById('tthpoint').innerHTML=point.toPrecision(2);
	document.getElementById('tthsharefb').innerHTML='Điểm <a href="https://www.facebook.com/dialog/feed?app_id=514773821944626%20&display=popup&caption=Kết quả thi thử tại www.tuituhoc.com. Điểm số đạt được: '+point.toPrecision(2)+' điểm với thời gian '+tthtime+' phút. Cùng vào thi thử tại tuituhoc.com nhé&picture=https://lh3.googleusercontent.com/-xcwjauphIcI/UzA_Wi4ITLI/AAAAAAAAAro/XoH29Tc6QeY/s1600/postertrialpass.jpg&link='+curr_url+'&redirect_uri='+curr_url+'"><img src="http://i.imgur.com/ohPy5dP.png" alt="chia se ket qua thi len facebook"/></a>';
	tthcomment(point,num,total_num);
	$("#tthpanelresult" ).toggle("slide",{direction:"up"},500);
	tthcorrect=0;
	clearInterval(tthcounter);
	}	
}

function tthshow_result() //show result
{
	if (zone1!=null&&zone2!=null)
	{
	if (tthchoice==0)
	tthnoitice(2);
	else if (tthcheck_done(1)==0)
	tthnoitice(2);
	else
	{
		tthuncheck_all(0,tthkey.length);
		tthcompleted();		
	}
	}
	else{
		if (tthcheck_done(0)==0)
		tthnoitice(2);
		else{
		tthuncheck_all(0,tthkey.length);
		tthcompleted();			
		}
	}
}
function core_zone(q_start,q_end,id)

{
for (var i=q_start;i<q_end;i++)
{
	j=i<9?'&nbsp;':'';
	hr=(i+1)%5==0?'<hr/>':'';
	curr=document.getElementById(id).innerHTML;
	document.getElementById(id).innerHTML=curr+'<div id="Cau'+(i+1)+'" class="tthq" style="display:inline-block;padding-right:5px;">Câu '+j+(i+1)+'</div>'+j+'<div id="'+i+'A" class="tth-answer" onClick="tth_check(this.id)">A</div>'+'<div id="'+i+'B" class="tth-answer" onClick="tth_check(this.id)">B</div>'+'<div id="'+i+'C" class="tth-answer" onClick="tth_check(this.id)">C</div>'+'<div id="'+i+'D" class="tth-answer" onClick="tth_check(this.id)">D</div><br>'+hr;
}
}
function print_answer(){
	if (zone1!=null&&zone2!=null)
	{
	z1=tthkey.length; //total question;
	z2=tthkey.length-(zone1+zone2);//question core
	z3=tthkey.length-zone1;//question in zone
	core_zone(0,z2,'question');
	cache=document.getElementById('question').innerHTML;
	document.getElementById('question').innerHTML=cache+'<div id="tthbasic_style"></div><div id="tthadvance_style"></div>';
	core_zone(z2,z3,'tthbasic_style');
	core_zone(z3,z1,'tthadvance_style');
	}
	else
	{
	core_zone(0,tthkey.length,'question');
	}
}