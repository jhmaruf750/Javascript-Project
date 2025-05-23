const addTask=()=> {
    const taskinput=document.getElementById('taskinput')
   const taskinputvalue= taskinput.value.trim();

   if(taskinputvalue!==""){

   const tasklistul= document.getElementById('tasklist');
   const li=document.createElement('li');
   
   li.innerHTML='<input type="checkbox"> ' + taskinputvalue + ' <button  onclick="deletetask(this)">Delete</button>';
   
   tasklistul.appendChild(li);


   
  taskinput.value="";

   }
   else {
     alert("please Add a task");

   }
}


const deletetask=(btn)=> {

const li=btn.parentNode;
li.parentNode.removeChild(li);


}

const deletetaskchecked=()=> {
  const tasklist=document.getElementById('tasklist');
  const checkboxs=document.querySelectorAll('input[type="checkbox"]:checked');

  checkboxs.forEach(checkbox=>{
    const li=checkbox.parentNode;
    li.parentNode.removeChild(li);

  });
}