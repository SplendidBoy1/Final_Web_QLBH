let curr_id_user = 0

function update_user(id){
    console.log(id)
    curr_id_user = id 
}

function validEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validRole(role){
    let r = parseInt(role)
    console.log(typeof(r))
    if (isNaN(r)){
        return false
    }
    else{
        if (r < 1 || r > 2){
            return false
        }
        else return true
    }
}

function validPassword(password){
    const regex_number = /[0-9]/g;
    const length = password.length
    let flag = true;
    if (!password.match(regex_number)){
        flag = false;
    }
    if (length < 8){
        flag = false;
    }
    return flag;
}

function validPermision(role){
    let r = parseInt(role)
    console.log(typeof(r))
    if (isNaN(r)){
        return false
    }
    else{
        if (r < 0 || r > 1){
            return false
        }
        else return true
    }
}

function delete_user(id){
    console.log(id)
    curr_id_user = id 
}

function search_user() {
    
    console.log($('#search_user').val())
    $.ajax({
        url: 'http://localhost:21239/search_email',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({search_email: $('#search_user').val()}),
        success: (res) => {
            console.log(res)
            $("#main_table tbody").html("")
            console.log("!111")
            res.forEach((user) => {
                $("#main_table tbody").append(`
                    <tr id="user_{{this.ID}}">
                        <th scope="row">${user.ID}</th>
                        <td>${user.Username}</td>
                        <td>${user.Name}</td>
                        <td>${user.Email}</td>
                        <td>${user.Role_ID}</td>
                        <td>
                            <div class="row">
                                <div class="col-4">
                                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editForm" onclick="update(${user.ID})">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn btn-danger">
                                        <i class="fa-solid fa-x"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    `)
            });
        },
        error: (xhr, status, error) => {
            alert(error)
        }
    })
}

function create_user(){

}



$('.update-form-validate').submit( (e) => {
    e.preventDefault();
    console.log("LLLLLL")
    const id = curr_id_user
    const email = $('#updateEmail').val()
    console.log(validEmail(email))
    const username = $('#updateUsername').val()
    const name = $('#updateName').val()
    const role = $('#updateRole').val()
    const permision = $('#updatePermision').val()
    if (!validEmail(email) || !validRole(role) || !validPermision(permision)){
        alert("Input data is not valid")
        return
    }

    $.ajax({
        url: 'http://localhost:21239/update_user',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({id: id, username: username, name: name, email : email, role: parseInt(role), permision: parseInt(permision)}),
        success: (res) => {
            console.log(res)
            if (res.flag == true){
                alert("Update success")
                location.reload()
            }
            else{
                alert("Email has been used")
            }
        },
        error: (xhr, status, error) => {
            alert(error)
        }
    })
})

$('#confirmDeleteBtn').click( (e) => {
    console.log("qqqqqqqqqq")
    console.log(curr_id_user)
    const id = curr_id_user
    $.ajax({
        url: 'http://localhost:21239/delete_user',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({id: id}),
        success: (res) => {
            console.log(res)
            if (res.flag == true){
                alert("Delete success")
                location.reload()
            }
            else{
                alert("User not found")
            }
        },
        error: (xhr, status, error) => {
            alert(error)
        }
    })
})


$('.add_user_form').submit((e) => {
    e.preventDefault();
    console.log("LLLLLL")
    const email = $('#addEmail').val()
    console.log(validEmail(email))
    const password = $('#addPassword').val()
    const username = $('#addUsername').val()
    const name = $('#addName').val()
    const role = $('#addRole').val()
    const permision = $('#addPermision').val()
    if (!validEmail(email) || !validRole(role) || !validPermision(permision) || !validPassword(password)){
        alert("Input data is not valid")
        return
    }
    $.ajax({
        url: 'http://localhost:21239/add_user',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({username: username, name: name, email : email, role: parseInt(role), permision: parseInt(permision), password: password}),
        success: (res) => {
            console.log(res)
            if (res.flag == true){
                alert("Add user success")
                location.reload()
            }
            else{
                alert("Email has been used")
            }
        },
        error: (xhr, status, error) => {
            alert(error)
        }
    })

})