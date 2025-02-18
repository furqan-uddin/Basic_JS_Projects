document.addEventListener("DOMContentLoaded",function(){
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseListDisplay = document.getElementById("expense-list");
    const totalPrice = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = calculateTotal();

    renderExpenses();
    updateTotal();

    expenseForm.addEventListener("submit",function(e){
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());
        // console.log(typeof amount);

        if(name !== "" &&  !isNaN(amount) && amount > 0){
            const newExpense = {
                name : name,
                amount : amount,
                id : Date.now(),
            }
            expenses.push(newExpense);
            saveExpensesTolocal();
            // console.log(newExpense);
            renderExpenses();
            updateTotal();

            expenseNameInput.value = "";
            expenseAmountInput.value = "";

            
        }
    })
    function calculateTotal(){
        return expenses.reduce((sum,current) => sum + current.amount,0);    
    }
    function saveExpensesTolocal(){
        localStorage.setItem("expenses",JSON.stringify(expenses));
    }
    function renderExpenses(){
        expenseListDisplay.innerHTML="";
        // console.log(expenseListDisplay);
        expenses.forEach((expense) =>{
            const li = document.createElement("li");
            li.innerHTML = `
            <span>${expense.name} - $${expense.amount}</span>
            <button data-id="${expense.id}">delete</button>
            `
        expenseListDisplay.appendChild(li);
        })
    }

    function updateTotal(){
        totalAmount = calculateTotal();
        totalPrice.textContent = totalAmount;
    }

    expenseListDisplay.addEventListener("click",function(e){
        if(e.target.tagName === "BUTTON"){
            console.log("clicked");
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter((expense) => expense.id !== expenseId);

            saveExpensesTolocal();
            renderExpenses();
            updateTotal();
        }
    });
});