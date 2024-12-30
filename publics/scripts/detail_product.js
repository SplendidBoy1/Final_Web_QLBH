$('#checkout_product').click(e => {
    e.preventDefault();
    //console.log("LLLLLL")
    $.ajax({
        url: 'http://localhost:21239/checkout',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({products: [$('#checkout_product').val()], amounts: [1]}),
        success: (res) => {
            alert("Buy product success");
            console.log(res)
            
        },
        error: (xhr, status, error) => {
            console.error('Error:', error);
        }
    })
})

$("#add-cart").click(function() {
    $.ajax({
        url: $(this).attr("href"),
        type: "POST",
        success: function(response) {
            alert(response);
        }
    });
});