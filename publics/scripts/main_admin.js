let curr_id_user = 0

let curr_id_cat = 0

let curr_id_pro = 0

function update_user(id){
    console.log(id)
    curr_id_user = id 
}

function delete_user(id){
    console.log(id)
    curr_id_user = id 
}

function update_Cat(cat_id){
    curr_id_cat = cat_id
}

function delete_Cat(cat_id){
    curr_id_cat = cat_id
}

function update_Pro(pro_id){
    curr_id_pro = pro_id
}

function delete_Pro(pro_id){
    curr_id_pro = pro_id
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
                                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editForm" onclick="update_user(${user.ID})">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteForm" onclick="delete_user(${user.ID})">
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


$('#updateCatForm').submit( (e) => {
    e.preventDefault();
    console.log("LLLLLL")
    const id = curr_id_cat
    const CatName = $('#updateCatname').val()

    $.ajax({
        url: 'http://localhost:21239/update_cat',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({id: id, name: CatName}),
        success: (res) => {
            console.log(res)
            if (res.flag == true){
                alert("Update success")
                location.reload()
            }
            else{
                alert("Error")
            }
        },
        error: (xhr, status, error) => {
            alert(error)
        }
    })
})

function search_cat(){
    console.log($('#search_category').val())
    $.ajax({
        url: 'http://localhost:21239/search_cat',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({search_cat: $('#search_category').val()}),
        success: (res) => {
            console.log(res)
            $("#main_Cattable tbody").html("")
            console.log("!111")
            res.forEach((cat) => {
                $("#main_Cattable tbody").append(`
                    <tr id="user_{{this.ID}}">
                        <th scope="row">${cat.CatID}</th>
                        <td>${cat.CatName}</td>
                        <td>
                            <div class="row">
                                <div class="col-4">
                                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editCatForm" onclick="update_Cat(${cat.catID})">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteCatForm" onclick="delete_Cat(${cat.catID})">
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


$('.add_cat_form').submit((e) => {
    e.preventDefault();
    console.log("LLLLLL")
    // const email = $('#addEmail').val()
    const catname = $('#addCatName').val()
    $.ajax({
        url: 'http://localhost:21239/add_category',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({catname: catname}),
        success: (res) => {
            console.log(res)
            if (res.flag == true){
                alert("Add category success")
                location.reload()
            }
            else{
                alert("Add category failed")
            }
        },
        error: (xhr, status, error) => {
            alert(error)
        }
    })

})

$('#updateProForm').submit((e) => {
    e.preventDefault()
    const id = curr_id_pro
    const ProName = $('#updateProname').val()
    const Des = $('#updateDesPro').val()
    const Img = $('#updateImg').val()
    const Price = $('#updatePrice').val()
    const CatID = $('#updateCatID').val()
    const UserID = $('#updateUserID').val()


    $.ajax({
        url: 'http://localhost:21239/update_pro',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({id: id, name: ProName, des: Des, img: Img, price: Price, catid: CatID, userid: UserID}),
        success: (res) => {
            console.log(res)
            if (res.flag == true){
                alert("Update success")
                location.reload()
            }
            else{
                alert("Update Error or ID is not valid")
            }
        },
        error: (xhr, status, error) => {
            alert(error)
        }
    })

})

function search_pro(){
    console.log($('#search_product').val())
    $.ajax({
        url: 'http://localhost:21239/search_pro',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({search_pro: $('#search_product').val()}),
        success: (res) => {
            console.log(res)
            $("#main_Protable tbody").html("")
            // console.log("!111")
            res.forEach((pro) => {
                $("#main_Protable tbody").append(`
                    <tr id="user_${pro.ProID}">
                        <th scope="row">${pro.ProID}</th>
                        <td>
                            <img src="/images/products/${pro.Image_Src}" alt="product" style="max-height:100%; max-width:100%;">
                            <div class="text-center">${pro.Image_Src}</div>
                        </td>
                        <td>${pro.ProName}</td>
                        <td>${pro.FullDes}</td>
                        <td>${pro.Price}</td>
                        <td>${pro.CatID}</td>
                        <td>${pro.ID_User}</td>
                        <td>
                            <div class="row">
                                <div class="col-4">
                                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editProForm" onclick="update_Pro(${pro.ProID})">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteProForm" onclick="delete_Pro(${pro.ProID})">
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

$('#confirmCatDeleteBtn').click( (e) => {
    console.log("qqqqqqqqqq")
    console.log(curr_id_user)
    const id = curr_id_cat
    $.ajax({
        url: 'http://localhost:21239/delete_category',
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
                alert("Category not found")
            }
        },
        error: (xhr, status, error) => {
            alert(error)
        }
    })
})

$('#confirmProDeleteBtn').click( (e) => {
    console.log("qqqqqqqqqq")
    console.log(curr_id_user)
    const id = curr_id_pro
    $.ajax({
        url: 'http://localhost:21239/delete_product',
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
                alert("Category not found")
            }
        },
        error: (xhr, status, error) => {
            alert(error)
        }
    })
})

$('#apply_link').click(e => {
    if ($('#apply_link').is(':checked')){
        $("#addLink").prop('disabled', false);
    }
    else{
        $("#addLink").prop('disabled', true);
    }
})

// $('#apply_link').is(':checked'){
//     console.log("HEHEHE")
// }

// if (document.getElementById('remember').checked) {
//     alert("checked");
// } else {
//     alert("You didn't check it! Let me check it for you.");
// }

// $('.add_pro_form').submit((e) => {
//     console.log('qq')
//     e.preventDefault();
//     // console.log("LLLLLL")
//     // const id = curr_id_pro
//     // const ProName = $('#addProname').val()
//     // const Des = $('#addDesPro').val()
//     // const Img = $('#addImg').val()
//     // console.log(Img)
//     // const Price = $('#addPrice').val()
//     // const CatID = $('#addCatID').val()
//     // const UserID = $('#addUserID').val()
//     // // console.log($(this))
//     // const formData = new FormData()
//     // formData.append('id', id)
//     // formData.append('name', ProName)
//     // formData.append('des', Des)
//     // formData.append('file', Img)
//     // formData.append('price', Price)
//     // formData.append('catid', CatID)
//     // formData.append('userid', UserID)

//     // $.ajax({
//     //     url: 'http://localhost:21239/add_pro',
//     //     method:'POST',
//     //     success: (res) => {
//     //         console.log(res)
//     //         if (res.flag == true){
//     //             alert("Add category success")
//     //             location.reload()
//     //         }
//     //         else{
//     //             alert("Add category failed")
//     //         }
//     //     },
//     //     error: (xhr, status, error) => {
//     //         alert(error)
//     //     }
//     // })

// })