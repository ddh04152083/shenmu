

    var btn= document.getElementsByClassName("to")[0].getElementsByTagName("button")[0];

    btn.onclick=function (ev) {
        alert(1);
        $.ajax({
            url: "/shenmu_war_exploded/renyuan/logout",
            type: "get",
            success: function (data) {
                alert("安全退出成功！");
                console.log("aaaa");
                window,location.href="../../login.html";

            },
            error: function (data) {
                alert("安全退出成功！");
                console.log("aaaa");
                window,location.href="../../login.html";

            }

        });
    };


    //信息加载
    function add0(m){return m<10?'0'+m:m }
    function format(shijianchuo)
    {

        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }

    function addMsg(data){

        var html=`<ul class="xueXiList">`;
        for(var i=0;i<data.length;i++){

            html+=`<li class="lilisi">
                <span class="titleList">
                <a class="${data[i].id}"> ${data[i].fabushijian}&nbsp;&nbsp;&nbsp;${data[i].wenjianmingcheng} </a>
                </span>
                <span class="authorList">

                </span>
                <span class="timeList">
                ${data[i].fabushijian}
                </span>
                </li>`;
        }
        $('#updatefileview').html(html);

    }
    function banqiangetMsg(suoshuleibie){

        var fenzu=getQueryString("fenzu");
        var data={
                "fenzu":fenzu,
                "suoshufenlei":suoshuleibie
        }
        console.log(data);
        data=JSON.stringify(data);
        console.log(data);
        $.ajax({
            url:"/shenmu_war_exploded/wenjian/getListWenjianBySuoshuAndFenzu",
            type:"post",
            dataType: 'JSON',
            data:data,
            contentType: 'application/json;charset=UTF-8',
            success:function(data){
                console.log(data);
                addMsg(data)
            },
            error:function(data){
                console.log(data);
                addMsg(data);
            }
        });
    }

    //关闭的敞口
    $(document).on('click', '.inform .close', function() {
        this.parentNode.style.display='none';
        document.getElementsByClassName("xueXiList")[0].style.display="block";
        var thisNode=document.getElementById("updatefileview").getElementsByClassName("inform")[0];

        $('#updatefileview')[0].removeNode(thisNode);
    })
    //点击列表显示对于的html文件与下载
    $(document).on('click', '.lilisi a', function() {
        document.getElementsByClassName("xueXiList")[0].style.display="none";
        var id=this.getAttribute("class");
        console.log(id);
        var fenzu=getQueryString("fenzu");

        $.ajax({
            url:"/shenmu_war_exploded/wenjian/getWenjianToHtmlById/"+id,
            type:"get",

            success:function(data){
                console.log(data);
                show_loadfile(data)
            },
            error:function(data){
                console.log(data);
                show_loadfile(data);
            }
        });

    })
    //显示html文件
    function show_loadfile(data){


        var htm=``;


        htm+=`<div class="inform" style="display:none">
        <div  class="btn close">关闭</div>
        <p id="headtitle">${data[1]} ${data[0]}</p> 
        
        <center><p>${data[1]} <a href="http://localhost:8080/shenmu_war_exploded/${data[2]}" download>下载</a></p></center>
        <object type="text/html" data="http://localhost:8080/shenmu_war_exploded/${data[3]}" width="100%" height="100%" style="height: 800px"></object>
        </div>`;

        $('#updatefileview').append(htm);
        document.getElementsByClassName("inform")[0].style.display="block";
    }







