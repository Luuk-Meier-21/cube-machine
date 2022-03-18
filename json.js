    let json = `{
  "fields" : [
    {
      "id" : 0,
      "data" : {
        "field" : {
          "_0" : {
            "value" : {
              "raw" : {
                "size" : {
                  "_0" : {
                    "w" : 400,
                    "h" : 200
                  }
                }
              },
              "size" : {
                "w" : 400,
                "h" : 200
              }
            },
            "label" : "Window Size",
            "id" : 0,
            "key" : "windowSize"
          }
        }
      }
    },
    {
      "id" : 1,
      "data" : {
        "field" : {
          "_0" : {
            "value" : {
              "raw" : {
                "string" : {
                  "_0" : "test"
                }
              },
              "string" : "test"
            },
            "label" : "Test 1",
            "id" : 0,
            "key" : "test"
          }
        }
      }
    },
    {
      "id" : 2,
      "data" : {
        "divider" : {

        }
      }
    },
    {
      "id" : 3,
      "data" : {
        "field" : {
          "_0" : {
            "value" : {
              "raw" : {
                "float" : {
                  "_0" : 1
                }
              },
              "float" : 1
            },
            "label" : "Test 2",
            "id" : 0,
            "key" : "test2"
          }
        }
      }
    }
  ]
}`;
    let object = JSON.parse(json);
    const jsonToObject = (items) => {
        let data = {};
        for(let item of items) {
            if (item.data.hasOwnProperty('field')) {
                const field = item.data.field._0;
                data[field.key] = field.value;
            }
            
        }
        return data;
    }
    const data = jsonToObject(object.fields);