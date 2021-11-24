import fetch from 'node-fetch';

console.log('myArgs: ',process.argv.slice(2));



function makeInputs (iurl,l)
{
  let ia = [];
  for (l;l--;l>0)
  {
    ia.push(iurl + l);
  }
  return ia;
}



let re = /json/i;
function PM1 (URL){
return fetch(URL)
.then( (res) => {
  if (!res.ok)
    {
      console.log('NOT OK')
      return null;
    }
    let type = res.headers.get("content-type");
    if (!type.match(re)) {
      console.log('TYPE',type);
      console.log(type.match(re));
      throw new TypeError(`Expected JSON, got ${type}`);
      }

    return res.json()
} )
.then((data) => {
  console.log('DATA RECEIVED')
  if (data) {
    console.log(data);
    return data;
    }
   else {
     console.log('Error occured')
   }
  })
  .catch(e => {
/*      if (e instanceof NetworkError) {
      
      console.log("Check your internet connection.");
    }
    else */  if (e instanceof TypeError)
    {
      console.log("Type error\n")
      console.log(e)
    }
    else {
      console.log ("Unknown Error")
    }
  
    });
  }

    function prSequence (inputs, PM)
    {
        inputs = [...inputs];
        
        function HandleNextInput (outputs)
          {
              if (inputs.length === 0)
                {
                  return outputs;
                }
              else 
                {
                  let nextInput =  inputs.shift();
                  return PM(nextInput)
                                      .then(output => outputs.concat(output))
                                      .then(HandleNextInput);
                }
          }
          return Promise.resolve([]).then(HandleNextInput);
    } 

     prSequence (makeInputs (process.argv[2],process.argv[3]),PM1)
      .then ((d) => {
        console.log('DATAS :',d);
      })
      .catch(console.error); 