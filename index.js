const input =document.querySelector('.inputAssignment');
const divToDo=document.querySelector('.ToDoDiv');
const container=document.querySelector('.container');
const buttonDiv=document.querySelector('.showDoneButton');
const showRemove=document.querySelector('.showRemoveButton');
const divSwitchMode=document.querySelector('.buttonSwichtColor');
const switchMode=document.querySelector('.swichColor');

let counterToDo=0;
let toggle=true;
let toggleColor=false;
let toggleRemove=true;
const ToDoArray=[];
let removeArray=[];


input.addEventListener('click',()=>{

    input.placeholder='';

})

input.addEventListener('keypress',(e)=>{


    if(e.charCode===13){

        if(input.value){

    //console.log(e);
    let newTodo=document.createElement('div');
    let newTodoParagraf=document.createElement('div');
    let newTodoButtons=document.createElement('div');

    let newButtonRemove=document.createElement('button');
    let newButtonDone=document.createElement('button');
    let newParagrafe=document.createElement('p');


    newButtonDone.id=`${counterToDo}`;
    newButtonRemove.id=`${counterToDo}`;
    newTodo.className="ToDo";
    newTodoParagraf.className='toDoParagraf';
    newTodoButtons.className='toDoButtons';
    newButtonRemove.className="buttonRemove";
    newButtonDone.className="buttonDone";

    newButtonDone.innerText='Done';
    newButtonRemove.innerHTML=` <i class="icon-remove" id=${counterToDo}></i> `;

    newTodoButtons.appendChild(newButtonDone);
    newTodoButtons.appendChild(newButtonRemove);
    newTodoParagraf.appendChild(newParagrafe)
    newTodo.appendChild(newTodoParagraf);
    newTodo.appendChild(newTodoButtons);

    newButtonDone.addEventListener('click',(e)=>{

        let tmpObj;

        input.placeholder='please enter a new assingment...';

        ToDoArray.forEach(item=>{
        
            if(item.index==e.target.id){
                tmpObj=item;
            }

        })


       // console.log(tmpObj);

        if(!tmpObj.done){
            
            newButtonDone.innerText="undone";
            newParagrafe.style.textDecoration="line-through";

            tmpObj.done=1

        }else{
             
            newButtonDone.innerText="done";

            newParagrafe.style.textDecoration="none";
               tmpObj.done=0;
        }
      
    });

    newButtonRemove.addEventListener('click',(e)=>{
    
        input.placeholder='please enter a new assingment...';

        console.log(e);
        newButtonDone.parentElement.parentElement.remove();
        //function that remove a node at place id and remove only one
        
        ToDoArray.forEach((item,index)=>{

            if(item.index==e.target.id){
               
                removeArray.push(item);
                item.element.lastChild.remove();
                ToDoArray.splice(index,1);
            }

        })
    });

    divToDo.appendChild(newTodo);
    newParagrafe.innerText=input.value;

    input.value='';

    checkeIfoverTodo(counterToDo,divToDo);
    
    ToDoArray.push({

        index:counterToDo,
        element:newTodo,
        done:0

    });

    counterToDo++;

    console.log(ToDoArray);
    }
}

})

buttonDiv.addEventListener('click',()=>{

    let result;
    let sizeArray;
    let i;

    console.log(ToDoArray);
    if(toggle){

        buttonDiv.innerText='show all asingment';

        //function that filter my array
        //in a copy for every itme that is true 
        //cheking with isDone function every oject in array
        result=ToDoArray.filter(isDone);

        sizeArray=result.length;
        divToDo.innerHTML=" ";
        for(i=0;i<sizeArray;i++){

            divToDo.appendChild(result[i].element);
        }

        toggle=false;

    }else{

        sizeArray=ToDoArray.length;
        divToDo.innerHTML=" ";
        for(i=0;i<sizeArray;i++){

            divToDo.appendChild(ToDoArray[i].element);
        }
     
    buttonDiv.innerText='show done asingment';
    toggle=true;
    }

})


switchMode.addEventListener('click',()=>{


    if(toggleColor){

    document.body.style.backgroundColor="rgb(151, 149, 149)";
    container.style.backgroundColor="white"
    toggleColor=false;
    }
    else{

        document.body.style.backgroundColor="white";
        container.style.backgroundColor="rgb(151, 149, 149)";
        document.body.style.color="black";
        toggleColor=true;
    }

})

showRemove.addEventListener('click',(e)=>{

    let sizeArray;
    let i;

    console.log(removeArray);

    if(toggleRemove){

        showRemove.innerText='show all asingment';
        sizeArray=removeArray.length;
        divToDo.innerHTML=" ";

        for(i=0;i<sizeArray;i++){

            divToDo.appendChild(removeArray[i].element);
        }

        const newButtonClear=document.createElement('button');
        newButtonClear.innerText='clear ';
        divSwitchMode.appendChild(newButtonClear);

        newButtonClear.addEventListener('click',()=>{

            removeArray=[];
            divToDo.innerHTML=" ";

        });

        toggleRemove=false;

    }else{

        showRemove.innerText='show Remove assignment';
        sizeArray=ToDoArray.length;
        divToDo.innerHTML=" ";
        for(i=0;i<sizeArray;i++){

            divToDo.appendChild(ToDoArray[i].element);
        }
        
        divSwitchMode.lastChild.remove();
        toggleRemove=true;
    }


});


function checkeIfoverTodo(counterToDo,div){

    if(counterToDo>3){

        div.style.overflowY = "visible";

    }
}


function isDone(obj){

    if(obj.done!=0){
        return true;
    }
}