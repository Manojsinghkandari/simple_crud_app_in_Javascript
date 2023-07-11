/* start for control coding */
var registerForm = document.querySelector("#register-form");
var allInput = registerForm.querySelectorAll("INPUT");
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function(){
    modal.classList.add("active");
}
closeBtn.addEventListener("click",()=>{
    modal.classList.remove("active");
    var i;
    for(i=0;i<allInput.length;i++){
        allInput[i].value = "";
    }
})

/* start all global variable */
var userData = [];
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
var idEl = document.getElementById("id");
var nameEl = document.querySelector("#name");
var l_nameEl = document.getElementById("l-name");
var emailEl = document.querySelector("#email");
var officeEl = document.querySelector("#office-code");
var jobTitleEl = document.querySelector("#job-title");
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");
var registerForm = document.querySelector("#register-form");
var imgUrl;
/* end all global variable */

/* start register coding */

registerBtn.onclick = function(e){
    e.preventDefault();
    regitrationData();
    getDataFromLocal();
    registerForm.reset('');
    closeBtn.click();
}
if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}


function regitrationData(){
    userData.push({
        id : idEl.value,
        name : nameEl.value,
        l_name : l_nameEl.value,
        email : emailEl.value,
        officeCode : officeEl.value,
        jobTitle : jobTitleEl.value,
        profilePic : imgUrl == undefined ? "/R.png" : imgUrl
    });
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
    swal("Good job!", "Registration Success!", "success");
}

// start returning data on page from localstorage
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
        tableData.innerHTML +=  `
        <tr index='${index}'>
            <td>${index+1}</td>
            <td><img src="${data.profilePic}" width="40"></td>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.l_name}</td>
            <td>${data.email}</td>
            <td>${data.officeCode}</td>
            <td>${data.jobTitle}</td>
            <td>
                <button class="edit-btn"><i class="fa fa-eye"></i></button>
                <button class="del-btn" style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
        `;
    });

    /* start delete coding */
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn")
    for(i=0;i<allDelBtn.length;i++){
        allDelBtn[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    userData.splice(id,1);
                    localStorage.setItem("userData",JSON.stringify(userData));
                    tr.remove();
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
        }
    }

    // start update coding
    var allEdit = document.querySelectorAll(".edit-btn");
    for(i=0;i<allEdit.length;i++){
        allEdit[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");
            var imgTag = td[1].getElementsByTagName("IMG");
            var profilePic = imgTag[0].src;
            var id = td[2].innerHTML;
            var name = td[3].innerHTML;
            var l_name = td[4].innerHTML;
            var email = td[5].innerHTML;
            var officeCode = td[6].innerHTML;
            var jobTitle = td[7].innerHTML;
            addBtn.click();
            registerBtn.disabled = true;
            updateBtn.disabled = false;
            idEl.value = id;
            nameEl.value = name;
            l_nameEl.value = l_name;
            emailEl.value = email;
            officeEl.value = officeCode;
            jobTitleEl.value = jobTitle;
            profile_pic.src = profilePic;
            updateBtn.onclick = function(e){
                userData[index] = {
                    id : idEl.value,
                    name : nameEl.value,
                    l_name : l_nameEl.value,
                    email : emailEl.value,
                    officeCode : officeEl.value,
                    jobTitle : jobTitleEl.value,
                    profilePic : uploadPic.value == "" ? profile_pic.src : imgUrl
                }
                localStorage.setItem("userData",JSON.stringify(userData));
            }
        }
    }


}
getDataFromLocal();

// image procesing
uploadPic.onchange = function(){
    if(uploadPic.files[0].size < 1000000){

        var fReader = new FileReader();
        fReader.onload = function(e){
            imgUrl = e.target.result;
            profile_pic.src = imgUrl;
            console.log(imgUrl);
        }
        fReader.readAsDataURL(uploadPic.files[0]);

    }else{
        alert("File Size Is To Long");
    }
}

// start search coding

var searchEl = document.querySelector("#empId");
searchEl.oninput = function(){
    searchFuc();
}

function searchFuc(){
    var tr = tableData.querySelectorAll("TR");
    var filter = searchEl.value.toLowerCase();
    var i;
    for(i=0;i<tr.length;i++){
        var id = tr[i].getElementsByTagName("TD")[2].innerHTML;
        var name = tr[i].getElementsByTagName("TD")[3].innerHTML;
        var l_name = tr[i].getElementsByTagName("TD")[4].innerHTML;
        var email = tr[i].getElementsByTagName("TD")[5].innerHTML;
        if(id.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(l_name.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(name.toLowerCase().indexOf(filter) > -1){
                tr[i].style.display = "";
        }
        else if(email.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
}

// start clear all data

var delAllBtn = document.querySelector("#del-all-btn");
var allDelBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener('click',()=>{
    if(allDelBox.checked == true){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("userData");
                window.location = location.href;
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }
    else{
        swal("Check The Box", "Please check the box to delete data", "warning");
    }
})
