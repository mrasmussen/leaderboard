/****************************** Hole Data ********************************************/
      function getHoleYardageData()
      {
        var whereCourseData =  '{"Course": "' + courseid + '"}';
        var data = {
          where: whereCourseData,
          response_json_depth: 1,
          limit: 1000
        };
        sdk.sendRequest('objects/holes/query.json', 'GET', data, holesCallback);
      }
      
      function holesCallback(data) {
        if(data) {
          var myJSONText = JSON.stringify(data);
          //console.log(myJSONText);
          if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'queryCustomObjects') {
              for (var i in data.response.holes)
              {
                delete data.response.holes[i].id;
                delete data.response.holes[i].created_at;
                delete data.response.holes[i].updated_at;
                delete data.response.holes[i].Course;
              }
              var myJSONText2 = JSON.stringify(data.response.holes);
              //console.log(myJSONText2);
              //storeHolesData(data.response.holedata);
              storeHolesDataInCourse(data.response.holes);
            }
          }
        }
      }
      
      /****************************** Store Hole Data *************************************/
      function storeHolesData(holeData)
      {
        //UOCa9r785zth4gyMfdmmKGBfgDniXcpA
        var sdk = new Cocoafish('UOCa9r785zth4gyMfdmmKGBfgDniXcpA');  // app key
        var myJSONText = JSON.stringify(holeData);
        var data = {
          fields: '{"courseholedata":' + myJSONText + '}'
        };
        //console.log(data.fields);
        sdk.sendRequest('objects/holedata/create.json', 'POST', data, storeHolesDataCallback);
      }  
      //SDK Callback:
      function storeHolesDataCallback(data) {
        if(data) {
          var myJSONText = JSON.stringify(data);
          console.log(myJSONText);
          if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createObject') {
              console.log('Who is your Daddy');
            }
          }
        }
      }
      
      /****************************** Store Hole Data in Course *************************************/
      function storeHolesDataInCourse(holeData)
      {
        //UOCa9r785zth4gyMfdmmKGBfgDniXcpA
        var sdk = new Cocoafish('UOCa9r785zth4gyMfdmmKGBfgDniXcpA');  // app key
        var myJSONText = JSON.stringify(holeData);
        var data = {
          id: '5148bd0dacab5e15fa06a0f0',
          fields: '{"holes":' + myJSONText + '}'
        };
        console.log(data.fields);
        sdk.sendRequest('objects/courses/update.json', 'POST', data, storeHolesDataInCourseCallback);
      }  
      //SDK Callback:
      function storeHolesDataInCourseCallback(data) {
        if(data) {
          var myJSONText = JSON.stringify(data);
          console.log(myJSONText);
          if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createObject') {
              console.log('Who is your Daddy');
            }
          }
        }
      }