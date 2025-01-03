@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: #EEF6F9;
}

/*===== NAVBAR =====*/

.navbar-wrap{
    background-color: #4D77FF;
}

.navbar-brand{
    font-size: 2rem;
    font-weight: 800;
    color: #FFFFFF;
    transition: all 0.4s;
}

.navbar-brand:hover{
    color:#052B40;
    transition: all 0.4s;
}

.nav-item-space{
    margin: 0 10px;
}

.nav-link{
    font-size: 0.825rem;
    font-weight: 600;
    color: #FFFFFF;
    transition: all 0.4s;
}

.nav-link:hover{
    color:#052B40;
    transition: all 0.4s;
}

.log-in-btn{
    padding: 5px 20px;
    border: 0;
    border-radius: 20px;
    font-weight: 600;
}

/*===== MAIN CONTENTS =====*/

.tool-bar-wrap{
    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0px 0px 30px rgba(5, 43, 64, 0.1);
}

.content-wrap{
    background-color: #FFFFFF;
    border-radius: 20px;
    box-shadow: 0px 0px 30px rgba(5, 43, 64, 0.1);
}

.overview-wrap{
    background-color: #FFCC33;
    border-radius: 20px;
}

.main h1{
    font-weight: 700;
    font-size: 128px;
    color:#052B40;
    margin: 0;
}

.main h2{
    font-weight: 700;
    font-size: 48px;
    color:#052B40;
    margin: 0;
}

.main h3{
    font-weight: 600;
    font-size: 16px;
    color:#052B40;
    margin: 0;
}

.main h4{
    font-weight: 400;
    font-size: 16px;
    color:#052B40;
    margin: 0;
}

.main h5{
    font-weight: 400;
    font-size: 16px;
    color: #5C6B73;
    margin: 0;
}

.main p{
    font-weight: 400;
    font-size: 16px;
    color:#052B40;
    margin: 0;
}

.tool-btn{
    border: 0;
    background-color: transparent;
    margin: 0px 15px;
}

.tool-bar h4{
    font-weight: 600;
    font-size: 16px;
    color: #FFFFFF;
    margin: 0;
}

#addForm h3{
    font-weight: 600;
    font-size: 32px;
    color: #052B40;
    margin: 0;
}

#updateForm h3{
    font-weight: 600;
    font-size: 32px;
    color: #052B40;
    margin: 0;
}

#deletePrompt h3{
    font-weight: 600;
    font-size: 32px;
    color: #052B40;
    margin: 0;
}

.select-wrap{
    width: 150px;
}

.select-wrap select{
    background-color: transparent;
    border-width: 3px;
    border-color: #4D77FF;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    color:#052B40;
}

.add-btn{
    border: 0;
    background-color: #4D77FF;
    color: #FFFFFF;
    border-radius: 20px;
}

.cancle-btn{
    width: 100px;
    border-color: #4D77FF;
    border-width: 2px;
    background-color: transparent;
    border-radius: 20px;
    font-weight: 600;
    font-size: 16px;
    color:#052B40;
}

.confirm-btn{
    width: 100px;
    border: 0;
    background-color: #4D77FF;
    border-radius: 20px;
    font-weight: 600;
    font-size: 16px;
    color:#FFFFFF;
}

.circle-btn{
    height: 50px;
    width: 50px;
    border: 0;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #FFFFFF;
}

.dropdown-item{
    font-size: 1rem;
    color: #052B40;
    font-weight: 600;
}

.category {
    background-color: antiquewhite;
    padding: 20px;
}

.category-container {        
    display: flex;
    flex-direction: row;    
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    gap: 100px;
    row-gap: 10px;
}

.category-item {
    width: 10%;    
    text-align: center;  
}

.category-item img {
    width: 100%;
    background-color: #FFFFFF;  
    text-align: center;  
}

.suggestion {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    padding: 10px;
    gap: 10px;
    row-gap: 10px;
    flex-wrap: wrap;
}

.suggestion .card {
    width: 30%;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 30px rgba(5, 43, 64, 0.1);
}

.suggestion-title {
    text-align: center;
    padding: 20px;
}