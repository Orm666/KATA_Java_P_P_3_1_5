let tableBody = document.getElementById("id_body");
let formElementsEdit = new Map();
let formElementsDelete = new Map();
let formElementsAdd = new Map();
let roles = [];
let tempUser = {};
let loading = false;
let divAddUserParent = document.getElementById("addNewUserForm")
let divCardViewer = document.getElementById("idCard")
let emptyUser = {firstName : "", lastName : "", age : "", email : "", password : ""};
let user_choose_id = document.getElementById("user_choose")
let admin_choose_id = document.getElementById("admin_choose")
let header_text_id = document.getElementById("header_text")
let header_nav_id = document.getElementById("header_nav")
let header_card_id = document.getElementById("header_card")
let nav_innerHtml = header_nav_id.innerHTML
let trElement = document.getElementById("id_tr")


function getForm (form_popup, disableId = false, disableEver = false) {
    let lock_id = ""
    let lock_ever = ""
    let lock_select = ""

    if (disableId) {
        lock_id = "readonly";
    }

    if (disableEver) {
        lock_ever = "readonly"
        lock_select = "disabled"
    }

    return `<form class="needs-validation" id=${form_popup}>
                        <div class="form-group font-weight-bold">ID
                            <input type="number" class="form-control form-control-sm id" ${lock_id}>
                        </div>
                        <div class="form-group font-weight-bold">First name
                            <input type="text" class="form-control form-control-sm firstName" ${lock_ever}>
                        </div>
                        <div class="form-group font-weight-bold">Last name
                            <input type="text" class="form-control form-control-sm lastName" ${lock_ever}>
                        </div>
                        <div class="form-group font-weight-bold">Age
                            <input type="number" class="form-control form-control-sm age" ${lock_ever}>
                        </div>
                        <div class="form-group font-weight-bold">Email
                            <input type="email" class="form-control form-control-sm email" ${lock_ever}>
                        </div>
                        <div class="form-group font-weight-bold">Password
                            <input type="password" class="form-control form-control-sm password" ${lock_ever}>
                        </div>
                        <div class="form-group font-weight-bold">Role
                            <select class="custom-select roles" multiple size="2" ${lock_select}>
                                <option>role</option>
                            </select>
                        </div>
                    </form>`;
}

function save (user) {
    tempUser = user;
    formElementsAdd["id"].value = user.id;
    formElementsAdd["id"].addEventListener("change", e => {
        tempUser.id = e.target.value;
    })
    formElementsAdd["firstName"].value = user.firstName;
    formElementsAdd["firstName"].addEventListener("change", e => {
        tempUser.firstName = e.target.value;
    })
    formElementsAdd["lastName"].value = user.lastName;
    formElementsAdd["lastName"].addEventListener("change", e => {
        tempUser.lastName = e.target.value;
    })
    formElementsAdd["age"].value = user.age;
    formElementsAdd["age"].addEventListener("change", e => {
        tempUser.age = e.target.value;
    })
    formElementsAdd["email"].value = user.email;
    formElementsAdd["email"].addEventListener("change", e => {
        tempUser.email = e.target.value;
    })
    formElementsAdd["password"].value = user.password;
    formElementsAdd["password"].addEventListener("change", e => {
        tempUser.password = e.target.value;
    })
    formElementsAdd["roles"].replaceChildren();
    formElementsAdd["roles"].addEventListener("change", e => {
        tempUser.roles = [];
        for(let i = 0; i < e.target.options.length; i++) {
            if (e.target.options[i].selected) {
                for(let j = 0; j < roles.length; j++) {
                    if (roles[j].id === Number(e.target.options[i].value)) {
                        tempUser.roles.push(roles[j]);
                        break;
                    }
                }
            }
        }
    })
    roles.forEach(role => {
        let element = document.createElement("option");
        element.value = role.id;
        element.innerHTML = role.name.substring(5);
        formElementsAdd["roles"].appendChild(element);
    });
    formElementsAdd["button"].addEventListener("submit", (e) => {


        if (loading || !formElementsAdd["button"].checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        loading = true;
        fetch("http://localhost:8080/api/users", {
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tempUser)
        }).then((res) => {
            if (res.ok) {
                getAllRoles().then(res => {})
                getAllUsers().then(res => {
                    loading = false
                    navViewAllUsers()
                })
            } else {
                loading = false;
            }
        }).catch(error => {
            console.error(error)
            loading = false;
        })
    })
}


function edit (user) {
    tempUser = user;
    formElementsEdit["id"].value = user.id;
    formElementsEdit["id"].addEventListener("change", e => {
        tempUser.id = e.target.value;
    })
    formElementsEdit["firstName"].value = user.firstName;
    formElementsEdit["firstName"].addEventListener("change", e => {
        tempUser.firstName = e.target.value;
    })
    formElementsEdit["lastName"].value = user.lastName;
    formElementsEdit["lastName"].addEventListener("change", e => {
        tempUser.lastName = e.target.value;
    })
    formElementsEdit["age"].value = user.age;
    formElementsEdit["age"].addEventListener("change", e => {
        tempUser.age = e.target.value;
    })
    formElementsEdit["email"].value = user.email;
    formElementsEdit["email"].addEventListener("change", e => {
        tempUser.email = e.target.value;
    })
    formElementsEdit["password"].value = user.password;
    formElementsEdit["password"].addEventListener("change", e => {
        tempUser.password = e.target.value;
    })
    formElementsEdit["roles"].replaceChildren();
    formElementsEdit["roles"].addEventListener("change", e => {
        tempUser.roles = [];
        for(let i = 0; i < e.target.options.length; i++) {
            if (e.target.options[i].selected) {
                for(let j = 0; j < roles.length; j++) {
                    if (roles[j].id === Number(e.target.options[i].value)) {
                        tempUser.roles.push(roles[j]);
                        break;
                    }
                }
            }
        }
    })
    roles.forEach(role => {
        let element = document.createElement("option");
        element.value = role.id;
        element.innerHTML = role.name.substring(5);
        formElementsEdit["roles"].appendChild(element);
    });


    formElementsEdit["button"].addEventListener("submit", (e) => {
        if (loading || !formElementsEdit["button"].checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        loading = true;
        fetch("http://localhost:8080/api/users", {
            method:'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tempUser)
        }).then((res) => {
            if (res.ok) {
                getAllRoles().then(res => {})
                getAllUsers().then(res => {
                    loading = false
                    $('#editModal').modal('hide')
                })
            } else {
                loading = false;
            }
        }).catch(error => {
            console.error(error)
            loading = false;
        })
    })
}

function del (user) {
    formElementsDelete["id"].value = user.id;
    formElementsDelete["firstName"].value = user.firstName;
    formElementsDelete["lastName"].value = user.lastName;
    formElementsDelete["age"].value = user.age;
    formElementsDelete["email"].value = user.email;
    formElementsDelete["password"].value = user.password;
    formElementsDelete["roles"].replaceChildren();
    user.roles.forEach(role => {
        let element = document.createElement("option");
        element.value = role.id;
        element.innerHTML = role.name.substring(5);
        formElementsDelete["roles"].appendChild(element);
    });
    formElementsDelete["button"].addEventListener("click", (e) => {
        if (loading) {
            return;
        }
        loading = true;
        fetch(`http://localhost:8080/api/users/${user.id}`, {
            method:'DELETE'
        }).then((res) => {
            if (res.ok) {
                getAllRoles().then(res => {})
                getAllUsers().then(res => {loading = false})
            } else {
                loading = false;
            }
        }).catch(error => {
            console.error(error)
            loading = false;
        })
    })

}

function addUserToTable (user, isAdminPage = true) {
    let userRoles = '';
    let entry = document.createElement("tr");
    user.roles.forEach(role => (userRoles += role.name.substring(5) + " "));
    entry.innerHTML = `<td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>
                            <span>${userRoles}</span>
                        </td>
                        `;
    if (isAdminPage) {
        entry.innerHTML += `
                        <td>
                            <a class="btn btn-info" role="button" data-toggle="modal"
                               data-target="#editModal">Edit</a>

                        </td>
                        <td>
                            <a class="btn btn-danger" role="button" data-toggle="modal"
                               data-target="#deleteModal">Delete</a>
                        </td>`;
        let editButton = entry.getElementsByClassName("btn-info");
        editButton[0].addEventListener("click", (e) => {edit(user)});
        let delButton = entry.getElementsByClassName("btn-danger");
        delButton[0].addEventListener("click", (e) => {del(user)});
    }



    tableBody.appendChild(entry);
}


function createSaveUser () {

    divAddUserParent.innerHTML = `
            <div class="card-header font-weight-bold">
                Add new user
            </div>
            <div class="card-body text-center">


                <div class="container d-flex justify-content-center small">
                    <form class="needs-validation">
        <input type="hidden" class="form-control form-control-sm id">

    <div class="form-group font-weight-bold">First name
        <input type="text" class="form-control form-control-sm firstName">
    </div>
    <div class="form-group font-weight-bold">Last name
        <input type="text" class="form-control form-control-sm lastName">
    </div>
    <div class="form-group font-weight-bold">Age
        <input type="number" class="form-control form-control-sm age">
    </div>
    <div class="form-group font-weight-bold">Email
        <input type="email" class="form-control form-control-sm email">
    </div>
    <div class="form-group font-weight-bold">Password
        <input type="password" class="form-control form-control-sm password">
    </div>
    <div class="form-group font-weight-bold">Role
        <select class="custom-select roles" multiple size="2">
            <option>role</option>
        </select>
    </div>

                    <button class="btn btn-success" type="submit">Add new user</button>
                    </form>
                </div>


            </div>`;

    formElementsAdd["id"] = divAddUserParent.getElementsByClassName("id")[0];
    formElementsAdd["firstName"] = divAddUserParent.getElementsByClassName("firstName")[0];
    formElementsAdd["lastName"] = divAddUserParent.getElementsByClassName("lastName")[0];
    formElementsAdd["age"] = divAddUserParent.getElementsByClassName("age")[0];
    formElementsAdd["email"] = divAddUserParent.getElementsByClassName("email")[0];
    formElementsAdd["password"] = divAddUserParent.getElementsByClassName("password")[0];
    formElementsAdd["roles"] = divAddUserParent.getElementsByClassName("roles")[0];
    formElementsAdd["button"] = divAddUserParent.getElementsByClassName("needs-validation")[0];

}

function createEditModal () {
    let divBody = document.createElement("div");
    divBody.className = "modal fade";
    divBody.tabIndex = -1;
    divBody.role="dialog";
    divBody.aria_hidden="true";
    divBody.id="editModal";

    divBody.innerHTML = `
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Edit user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="container d-flex justify-content-center small text-center">

                <div class="modal-body">
                    
                    ${getForm("edit_popup", true)}
                    
                </div>

        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" form="edit_popup">Edit</button>
        </div>
        
    </div>
</div>`;


    document.body.appendChild(divBody);

    formElementsEdit["id"] = divBody.getElementsByClassName("id")[0];
    formElementsEdit["firstName"] = divBody.getElementsByClassName("firstName")[0];
    formElementsEdit["lastName"] = divBody.getElementsByClassName("lastName")[0];
    formElementsEdit["age"] = divBody.getElementsByClassName("age")[0];
    formElementsEdit["email"] = divBody.getElementsByClassName("email")[0];
    formElementsEdit["password"] = divBody.getElementsByClassName("password")[0];
    formElementsEdit["roles"] = divBody.getElementsByClassName("roles")[0];
    formElementsEdit["button"] = document.getElementById("edit_popup")

}


function createDeleteModal () {
    let divBody = document.createElement("div");
    divBody.className = "modal fade";
    divBody.tabIndex = -1;
    divBody.role="dialog";
    divBody.aria_hidden="true";
    divBody.id="deleteModal";

    divBody.innerHTML = `
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Delete user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="container d-flex justify-content-center small text-center">

                <div class="modal-body">
                    
                    ${getForm("delete_popup", true, true)}

                    
                </div>

        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-dismiss="modal">Delete</button>
        </div>
        
    </div>
</div>`;

    document.body.appendChild(divBody);

    formElementsDelete["id"] = divBody.getElementsByClassName("id")[0];
    formElementsDelete["firstName"] = divBody.getElementsByClassName("firstName")[0];
    formElementsDelete["lastName"] = divBody.getElementsByClassName("lastName")[0];
    formElementsDelete["age"] = divBody.getElementsByClassName("age")[0];
    formElementsDelete["email"] = divBody.getElementsByClassName("email")[0];
    formElementsDelete["password"] = divBody.getElementsByClassName("password")[0];
    formElementsDelete["roles"] = divBody.getElementsByClassName("roles")[0];
    formElementsDelete["button"] = divBody.getElementsByClassName("btn-primary")[0];

}


function navSaveUser () {
    document.getElementById("navSaveUser_id").classList.add("active", "disabled")
    document.getElementById("navViewAllUsers_id").classList.remove("active", "disabled")
    divAddUserParent.hidden = false
    divCardViewer.hidden = true

    save(emptyUser);
}

function navViewAllUsers () {
    document.getElementById("navViewAllUsers_id").classList.add("active", "disabled")
    document.getElementById("navSaveUser_id").classList.remove("active", "disabled")
    divAddUserParent.hidden = true
    divCardViewer.hidden = false
}

function navChooseUser () {
    user_choose_id.classList.add("active", "disabled")
    admin_choose_id.classList.remove("active", "disabled")
    getUserAuth().then(res=> {});
    header_text_id.textContent = "User information-page"
    header_nav_id.innerHTML = ""
    header_card_id.textContent = "About user"
    trElement.innerHTML = `<th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>`;
}

function navChooseAdmin () {
    user_choose_id.classList.remove("active", "disabled")
    admin_choose_id.classList.add("active", "disabled")
    getAllUsers().then(res => {})
    header_text_id.textContent = "Admin panel"
    header_nav_id.innerHTML = nav_innerHtml
    header_card_id.textContent = "All users"
    trElement.innerHTML = `<th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>`;
    navViewAllUsers()
}



async function getAllUsers () {
    tableBody.replaceChildren()
    let response = await fetch("http://localhost:8080/api/users");
    let jsonData = await response.json();
    jsonData.forEach(user => {addUserToTable(user)})
}

async function getAllRoles () {
    let response = await fetch("http://localhost:8080/api/roles");
    let jsonData = await response.json();
    jsonData.forEach(role => {roles.push(role)})
}

async function getUserAuth () {
    tableBody.replaceChildren()
    let response = await fetch(`http://localhost:8080/api/userAuth`);
    let jsonData = await response.json();
    addUserToTable(jsonData, false)
}

async function getUserAuthRole () {
    let response = await fetch(`http://localhost:8080/api/userAuth`);
    let jsonData = await response.json();
    return jsonData.roles
}


async function setDefaultState () {
    let roles = await getUserAuthRole()
    let isAdmin = false
    roles.forEach(role => {
        if (role.name === "ROLE_ADMIN") {
            isAdmin = true
        }
    })
    if (isAdmin) {
        navChooseAdmin()
    } else {
        navChooseUser()
        admin_choose_id.hidden = true
    }
    await getAllRoles()
}


createSaveUser();
createDeleteModal();
createEditModal();


setDefaultState().then(res=> {});