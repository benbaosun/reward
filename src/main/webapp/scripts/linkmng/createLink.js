var table;
var selected;
var privateVideoTable;
var player;
var createLink = {
    init : function () {
        this.initTalble();
    },
    initTalble: function () {
        $('#uploadFile').filestyle({
            buttonText : ' 上传视频 ',
            'onChange': function (files) {
            }
        });
        var columns = [
            {
                title: '<input type="checkbox" name="select_all" id="select-all">',
                target: 0,
                data: function (item) {
                    return "";
                }
            },{
                title: 'ID',
                target: 1,
                data: function (item) {
                    return item.id;
                }
            },{
                title: '文件大小',
                target: 2,
                data: function (item) {
                    return item.fileSize+"MB";
                }
            },{
                title: '时长',
                target: 3,
                data: function (item) {
                    return item.timeLength;
                }
            }, {
                title: '详情【点击查看视频】',
                target: 4,
                data: function (item) {
                    var result = '<a href="#" onclick="createLink.watchVideo(\'' + item.url + '\',\''+item.title + '\',\''+item.imgName+'\')">' + item.title + '</a>';
                    // var result = '<button type="button" class="btn btn-link" onclick="createLink.watchVideo(\''+item.url+'\')">'+item.title+'</button>';
                    return result;
                }
            }];
        table = $('#videoList').DataTable( {
            "processing": true,
            "serverSide": false,
            "searching": false,//是否开启搜索
            "bLengthChange": true, //改变每页显示数据数量
            "bPaginate": true, //翻页功能,
            "autoWidth": true,
            // "sPaginationType": "full_numbers",
            // "dom": 'f<"top">t<"bottom"irlp><"clear">',
            // responsive: true,
            "dom": 'Bfrt<"bottom"ilp<"clear">>',
            "aLengthMenu" : [10, 20, 50,100],
            select :{
                style : 'muti'
            },
            buttons: [
                'selectAll',
                'selectNone'
            ],
            // "pagingType": "input",
            "ajax": {
                url : smile.baseURL()+"/videomng/getVideoes",
                type: "post",
                data:{
                    videoType : "0"
                }
            },
            columns: columns,
            columnDefs: [{
                "visible": true,
                "targets": 1
            }, {
                orderable: false,
                className: 'select-checkbox',
                targets: 0
            }],
            order: [[ 1, 'asc' ]],
            "language": {
                "url": smile.baseURL()+"/static/data/chinese.json"
            }
        } );
        table.on('draw.dt',function() {
            table.column(1, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                //i 从0开始，所以这里先加1

                i = i+1;
                //服务器模式下获取分页信息，使用 DT 提供的 API 直接获取分页信息

                var page = table.page.info();
                //当前第几页，从0开始

                var pageno = page.page;
                //每页数据

                var length = page.length;
                //行号等于 页数*每页数据长度+行号

                var columnIndex = (i+pageno*length);
                cell.innerHTML = columnIndex;
            });
        });
        privateVideoTable = $('#privateVideoList').DataTable( {
            "processing": true,
            "serverSide": false,
            "searching": false,//是否开启搜索
            "bLengthChange": true, //改变每页显示数据数量
            "bPaginate": true, //翻页功能,
            "autoWidth": true,
            // "sPaginationType": "full_numbers",
            // "dom": 'f<"top">t<"bottom"irlp><"clear">',
            // responsive: true,
            "dom": 'Bfrt<"bottom"ilp<"clear">>',
            "aLengthMenu" : [10, 20, 50,100],
            select :{
                style : 'muti'
            },
            // "pagingType": "input",
            "ajax": {
                url : smile.baseURL()+"/videomng/getVideoes",
                type: "post",
                data:{
                    videoType : "1"
                }
            },
            buttons: [
                'selectAll',
                'selectNone'
            ],
            columns: columns,
            columnDefs: [ {
                "visible": true,
                "targets": 1
            }, {
                orderable: false,
                className: 'select-checkbox',
                targets: 0
            }],
            order: [[ 1, 'asc' ]],
            "language": {
                "url": smile.baseURL()+"/static/data/chinese.json"
            }
        } );

        privateVideoTable.on('draw.dt',function() {
            privateVideoTable.column(1, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function(cell, i) {
                //i 从0开始，所以这里先加1

                i = i+1;
                //服务器模式下获取分页信息，使用 DT 提供的 API 直接获取分页信息

                var page = table.page.info();
                //当前第几页，从0开始

                var pageno = page.page;
                //每页数据

                var length = page.length;
                //行号等于 页数*每页数据长度+行号

                var columnIndex = (i+pageno*length);
                cell.innerHTML = columnIndex;
            });
        });
    },
    watchVideo: function (url,title,imgName) {
        $('#videoModal').modal('show');
        // alert(smile.baseURL()+url);
        player = videojs('videoplay');
        $("#videoplay").attr("poster",smile.baseURL() +"/data/videoImg/"+ imgName);
        $('#videotitle').text(title);
        $(".vjs-poster:first").css("background-image","url("+smile.baseURL() +"/data/videoImg/"+ imgName+")");
        videojs("videoplay").ready(function(){
            var player = this;
            player.width(550);
            player.pause()
            $('#videomp4').attr('src', smile.baseURL() + url);
            player.load();
        });
    },
    clearVideo : function () {
        $('#videoModal').modal('hide');
        // $('#videoPlayer').jPlayer( "clearMedia" );
        player.pause();
    },
    showUploadModal : function () {
        $('#uploadModal').modal("show");
    },
    upload : function () {
        $("#processing").modal("show");
        $('#uploadModal').modal("hide");
        var fileList = $('#uploadFile')[0].files;
        var formdata = new FormData();
        if (isBank(fileList)) {
            toastr.warning('提示', '请选择上传文件！');
            $("#processing").modal("hide");
            return;
        }
        for(var i=0;i<fileList.length;i++){
            formdata.append('files', fileList[i]);
        }
        formdata.append("type","1");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.response);
                if (data != null && data.success == 'true') {
                    if (data.msg.indexOf("失败") > -1) {
                        toastr.warning('', data.msg);
                    } else {
                        toastr.success('', data.msg);
                    }

                    // $('#addModal').modal("hide");
                    privateVideoTable.ajax.reload();
                } else {
                    toastr.error('提示', '上传失败！');
                }
                $("#processing").modal("hide");
                $('#uploadModal').modal("show");
                $("#progress").css("width","0%");
            }
        }
        //侦查当前附件上传情况
        xhr.upload.onprogress = function (evt) {
            //侦查附件上传情况
            //通过事件对象侦查
            //该匿名函数表达式大概0.1秒执行一次
            var loaded = evt.loaded;//已经上传大小情况
            var tot = evt.total;//附件总大小
            var per = Math.floor(100 * loaded / tot);  //已经上传的百分比
            var son = document.getElementById('son');
            son.innerHTML = per + "%";
            $("#progress").css("width",per + "%");
            // son.style.width = per + "%";
        }
        xhr.open("post", smile.baseURL() + "/videomng/uploadVideoes");
        xhr.send(formdata);
        // $.ajax({
        //     type: "post",
        //     url: smile.baseURL() + "/videomng/uploadVideoes",
        //     processData: false,
        //     contentType: false,
        //     cache: false,//上传文件无需缓存
        //     data: formdata,
        //     dataType: "json",
        //     success: function (data) {
        //         if (data != null && data.success == 'true') {
        //             if(data.msg.indexOf("失败")>-1){
        //                 toastr.warning('', data.msg);
        //             }else{
        //                 toastr.success('', data.msg);
        //             }
        //             privateVideoTable.ajax.reload();
        //         } else {
        //             toastr.error('提示', '上传失败！');
        //         }
        //         $("#processing").modal("hide");
        //     }
        // })
    },
    createLinks : function (type) {
        var selectedDatas=[];
        if(type=="0"){
            selectedDatas = table.rows('.selected').data();
        }else{
            selectedDatas = privateVideoTable.rows('.selected').data();
        }
        var ids = [];
        if(selectedDatas.length<1){
            toastr.warning("请至少选择一条记录！");
            return;
        }
        for(var i=0;i<selectedDatas.length;i++){
            var data = selectedDatas[i];
            ids.push(data.id);
        }
        $.ajax({
            type : "post",
            url : smile.baseURL()+"/linkmng/addLinkInfos",
            data : {
                videoIds : ids
            },
            dataType : "json",
            success : function (data) {
                if(data!=null && data.success=='true'){
                    toastr.success('提示', data.msg);
                    // $('#sureModal').modal("hide");
                    table.ajax.reload();
                }else{
                    toastr.error('提示', data.msg);
                }
            },
            failure:function(){
                toastr.success('提示', "abc");
            }
        });
    }

}