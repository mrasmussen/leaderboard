/**
 * Created by mrasmussen on 8/19/14.
 */

function isCourseCreated(location) {
    $.ajax({
        type: "GET",
        url: "http://10.0.33.34/course/coordinates:1234",
        dataType: "json",
        success: function (data) {
            alert("success " + JSON.stringify(data));
            if(data.meta) {
                var meta = data.meta;
                if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'queryCustomObjects') {
                    alert(JSON.stringify(data.golfclub));
                    //createCourseData(data.response.courses)
                }
            }
        },
        error: function(xhr, status, error) {
            alert(xhr);
            alert(status);
            alert(error);
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function isCourseCreated2()
{
    var whereCourseData =  '{"coordinates":{"$nearSphere":[-111.6632,40.2711], "$maxDistance" : 0.00002525}}';
    var selData = '{"all":["ClubName","[CUSTOM_course]course_id","id"]}';
    //alert(whereCourseData);
    var dataCourse = {
        where: whereCourseData,
        sel: selData,
        limit: 1,
        response_json_depth: 2
    };
    alert(dataCourse);
    sdk.sendRequest('objects/golfclub/query.json', 'GET', dataCourse, courseCallback);
}

function getHoleData()
{
    var whereCourseData =  '{"Course": "' + courseid + '"}';
    //alert(whereCourseData);
    var data = {
        where: whereCourseData,
        response_json_depth: 1,
        limit: 1000
    };
    //alert(data.where);
    sdk.sendRequest('objects/holedata/query.json', 'GET', data, holeCallback);
}

function courseCallback(data) {
    if(data) {
        var myJSONText = JSON.stringify(data);
        console.log(myJSONText);
        //alert(myJSONText);
        if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'showObjects') {
                alert(data.response);
                //createCourseData(data.response.courses)
            }
        }
    }
}
