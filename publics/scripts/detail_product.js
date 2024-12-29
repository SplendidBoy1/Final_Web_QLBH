$('#checkout_product').click(e => {
    e.preventDefault();
    //console.log("LLLLLL")
    $.ajax({
        url: 'http://localhost:21239/checkout',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({products: [$('#checkout_product').val()], amounts: [1]}),
        success: (res) => {
            console.log(res)
            
        },
        error: (xhr, status, error) => {
            console.error('Error:', error);
        }
    })
})

$('#add_cart').click(e => {
    console.log("HHHHHHH")
})